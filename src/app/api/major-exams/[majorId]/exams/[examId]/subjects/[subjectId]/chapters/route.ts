import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

type Params = { majorId: string; examId: string; subjectId: string };

export async function POST(request: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId, examId, subjectId } = await params;
  await connectToDB();
  const body = (await request.json()) as { name?: string };

  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const major = await MajorExamModel.findById(majorId);
  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  const exam = major.exams.id(examId);
  if (!exam) {
    return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
  }

  const subject = exam.syllabus.subjects.id(subjectId);
  if (!subject) {
    return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
  }

  subject.chapters.push({ name: body.name, sections: [] });
  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json(major);
}
