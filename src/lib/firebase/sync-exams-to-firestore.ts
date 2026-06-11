import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { getFirestoreAdmin } from '@/lib/firebase/firestore';

const APP_CONFIG_COLLECTION = 'appConfig';
const EXAMS_DOC_ID = 'exams';
const EXAMS_SYLLABI_COLLECTION = 'exams_syllabi';

function byteLengthJson(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), 'utf8');
}

/** Mobile app category shape */
type MobileExam = {
  id: string;
  name: string;
  templates: { shortSummary: boolean; detailedNotes: boolean; keyPoints: boolean; mcqs: boolean };
};

type MobileCategory = {
  id: string;
  name: string;
  icon: string;
  logoUrl?: string;
  exams: MobileExam[];
};

/** Mobile app syllabus: subject > sections > subsections > chapters */
type MobileChapter = { id: string; name: string };
type MobileSubsection = { id: string; name: string; chapters: MobileChapter[] };
type MobileSection = { id: string; name: string; subsections: MobileSubsection[] };
type MobileSubject = { id: string; name: string; icon: string; sections: MobileSection[] };
type MobileSyllabus = { subjects: MobileSubject[] };

type SyllabusMap = Record<string, MobileSyllabus>;

type LeanChapter = { _id: unknown; name: string; sections?: { _id: unknown; name: string }[] };
type LeanSubject = { _id: unknown; name: string; chapters?: LeanChapter[] };
type LeanExam = { _id: unknown; name: string; code?: string | null; syllabus?: { subjects?: LeanSubject[] } };

type MobileExamConfig = {
  categories: MobileCategory[];
  syllabi: SyllabusMap;
  updatedAt: string;
  dashboardBaseUrl: string;
};

const DEFAULT_TEMPLATES = {
  shortSummary: true,
  detailedNotes: true,
  keyPoints: true,
  mcqs: true,
};

function getDashboardPublicUrl(): string {
  const fromEnv =
    process.env.DASHBOARD_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  return (fromEnv || 'https://jnananotes-dashboard.vercel.app').replace(/\/$/, '');
}

function toAbsoluteLogoUrl(logoUrl: string | undefined | null, baseUrl: string): string | null {
  if (!logoUrl?.trim()) return null;

  const value = logoUrl.trim();
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${baseUrl}${value}`;
  }

  return `${baseUrl}/${value}`;
}

/** Map dashboard subject (subjects with chapters[].sections[]) to mobile syllabus (subjects with sections[].subsections[].chapters[]) */
function mapSubjectToMobile(subject: {
  _id: unknown;
  name: string;
  chapters: Array<{ _id: unknown; name: string; sections: Array<{ _id: unknown; name: string }> }>;
}): MobileSubject {
  return {
    id: String(subject._id),
    name: subject.name,
    icon: '📚',
    sections: (subject.chapters || []).map((ch) => ({
      id: String(ch._id),
      name: ch.name,
      subsections: [
        {
          id: String(ch._id),
          name: ch.name,
          chapters: (ch.sections || []).map((s) => ({ id: String(s._id), name: s.name })),
        },
      ],
    })),
  };
}

/** Build mobile app config from MongoDB major exams */
export async function syncExamsToFirestore(): Promise<{ categories: number; withLogo: number; syllabi: number }> {
  await connectToDB();
  const majors = await MajorExamModel.find().lean();
  const baseUrl = getDashboardPublicUrl();

  const categories: MobileCategory[] = [];
  const syllabi: SyllabusMap = {};

  for (const major of majors) {
    const majorId = String(major._id);
    const icon = (major.code || major.name?.slice(0, 2) || 'EX').toUpperCase();
    const logoUrl = toAbsoluteLogoUrl(major.logoUrl, baseUrl);

    const majorExams = (major.exams || []) as LeanExam[];
    const exams: MobileExam[] = majorExams.map((exam) => {
      const examId = String(exam._id);
      const syllabus = exam.syllabus;
      if (syllabus?.subjects?.length) {
        const subjects = syllabus.subjects as LeanSubject[];
        syllabi[examId] = {
          subjects: subjects.map((sub) =>
            mapSubjectToMobile({
              _id: sub._id,
              name: sub.name,
              chapters: (sub.chapters || []).map((ch) => ({
                _id: ch._id,
                name: ch.name,
                sections: (ch.sections || []).map((s) => ({ _id: s._id, name: s.name })),
              })),
            })
          ),
        };
      }
      return {
        id: examId,
        name: exam.name || '',
        templates: DEFAULT_TEMPLATES,
      };
    });

    categories.push({
      id: majorId,
      name: major.name || '',
      icon,
      ...(logoUrl ? { logoUrl } : {}),
      exams,
    });
  }

  const payload: MobileExamConfig = {
    categories,
    syllabi,
    updatedAt: new Date().toISOString(),
    dashboardBaseUrl: baseUrl,
  };

  const firestore = getFirestoreAdmin();

  // Firestore has a strict 1MB per-document limit. Since syllabus content can grow large,
  // we shard syllabi by examId into a separate collection and only keep categories in the main doc.
  // If the full payload is small enough, we still write it for backward compatibility.
  const fullPayloadBytes = byteLengthJson(payload);
  const maxDocBytes = 1_048_576;

  // Always write the sharded syllabi (best-effort) so the source-of-truth exists in Firestore.
  // This is intentionally not in a batch to avoid exceeding batch write size limits.
  for (const [examId, examSyllabus] of Object.entries(syllabi)) {
    await firestore
      .collection(APP_CONFIG_COLLECTION)
      .doc(EXAMS_DOC_ID)
      .collection(EXAMS_SYLLABI_COLLECTION)
      .doc(examId)
      .set(
        {
          examId,
          syllabus: examSyllabus,
          updatedAt: payload.updatedAt,
        },
        { merge: true }
      );
  }

  if (fullPayloadBytes < maxDocBytes) {
    await firestore.collection(APP_CONFIG_COLLECTION).doc(EXAMS_DOC_ID).set(payload, { merge: true });
    return {
      categories: categories.length,
      withLogo: categories.filter((c) => c.logoUrl).length,
      syllabi: Object.keys(syllabi).length,
    };
  }

  console.warn(
    `Firestore exams payload too large (${fullPayloadBytes} bytes). Writing categories only to appConfig/${EXAMS_DOC_ID} and sharding syllabi under appConfig/${EXAMS_DOC_ID}/${EXAMS_SYLLABI_COLLECTION}/.`
  );
  await firestore.collection(APP_CONFIG_COLLECTION).doc(EXAMS_DOC_ID).set(
    {
      categories: payload.categories,
      updatedAt: payload.updatedAt,
      dashboardBaseUrl: payload.dashboardBaseUrl,
      syllabi: {},
      syllabiStorage: 'subcollection',
      syllabiSubcollection: EXAMS_SYLLABI_COLLECTION,
    },
    { merge: true }
  );

  return {
    categories: categories.length,
    withLogo: categories.filter((c) => c.logoUrl).length,
    syllabi: Object.keys(syllabi).length,
  };
}

/** Call after any exam/major mutation. Catches and logs errors so API response is not failed. */
export async function syncExamsToFirestoreSafe(): Promise<void> {
  try {
    await syncExamsToFirestore();
  } catch (error) {
    console.error('Firestore exam sync failed:', error);
  }
}
