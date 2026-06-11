import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

export async function GET(): Promise<NextResponse> {
  await connectToDB();
  const majors = await MajorExamModel.find().lean();
  return NextResponse.json(majors);
}

export async function POST(request: Request): Promise<NextResponse> {
  await connectToDB();
  const body = (await request.json()) as { name?: string; code?: string };

  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const major = await MajorExamModel.create({ name: body.name, code: body.code });
  await syncExamsToFirestoreSafe();
  return NextResponse.json(major, { status: 201 });
}
