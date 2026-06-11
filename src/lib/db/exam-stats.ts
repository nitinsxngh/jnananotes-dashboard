import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';

export type ExamStats = {
  examCount: number;
  chapterCount: number;
  sectionCount: number;
};

export async function getExamStats(): Promise<ExamStats> {
  await connectToDB();

  const majors = await MajorExamModel.find({}, { exams: 1 }).lean();

  let examCount = 0;
  let chapterCount = 0;
  let sectionCount = 0;

  for (const major of majors) {
    examCount += major.exams.length;
    for (const exam of major.exams) {
      if (exam.syllabus?.subjects) {
        for (const subject of exam.syllabus.subjects) {
          chapterCount += subject.chapters.length;
          for (const chapter of subject.chapters) {
            sectionCount += chapter.sections.length;
          }
        }
      }
    }
  }

  return { examCount, chapterCount, sectionCount };
}
