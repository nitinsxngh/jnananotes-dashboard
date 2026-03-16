import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { getFirestoreAdmin } from '@/lib/firebase/firestore';

const APP_CONFIG_COLLECTION = 'appConfig';
const EXAMS_DOC_ID = 'exams';

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
};

const DEFAULT_TEMPLATES = {
  shortSummary: true,
  detailedNotes: true,
  keyPoints: true,
  mcqs: true,
};

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
export async function syncExamsToFirestore(): Promise<void> {
  await connectToDB();
  const majors = await MajorExamModel.find().lean();

  const categories: MobileCategory[] = [];
  const syllabi: SyllabusMap = {};

  for (const major of majors) {
    const majorId = String(major._id);
    const icon = (major.code || major.name?.slice(0, 2) || 'EX').toUpperCase();

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
      exams,
    });
  }

  const payload: MobileExamConfig = {
    categories,
    syllabi,
    updatedAt: new Date().toISOString(),
  };

  const firestore = getFirestoreAdmin();
  await firestore.collection(APP_CONFIG_COLLECTION).doc(EXAMS_DOC_ID).set(payload, { merge: true });
}

/** Call after any exam/major mutation. Catches and logs errors so API response is not failed. */
export async function syncExamsToFirestoreSafe(): Promise<void> {
  try {
    await syncExamsToFirestore();
  } catch (err) {
    console.error('Firestore exam sync failed:', err);
  }
}
