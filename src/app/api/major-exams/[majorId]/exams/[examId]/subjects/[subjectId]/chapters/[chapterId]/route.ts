import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

type Params = { majorId: string; examId: string; subjectId: string; chapterId: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId, examId, subjectId, chapterId } = await params;
  await connectToDB();
  const body = (await request.json()) as { name?: string };

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

  const chapter = subject.chapters.id(chapterId);
  if (!chapter) {
    return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
  }

  if (body.name !== undefined) {
    chapter.name = body.name;
  }

  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json(major);
}

export async function DELETE(_: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId, examId, subjectId, chapterId } = await params;
  await connectToDB();
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

  const chapter = subject.chapters.id(chapterId);
  if (!chapter) {
    return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
  }

  chapter.deleteOne();
  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json({ success: true });
}
