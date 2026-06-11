import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

type Params = { majorId: string };

export async function POST(request: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId } = await params;
  await connectToDB();
  const body = (await request.json()) as { name?: string; code?: string };

  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const major = await MajorExamModel.findById(majorId);
  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  major.exams.push({ name: body.name, code: body.code, syllabus: { subjects: [] } });
  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json(major);
}
