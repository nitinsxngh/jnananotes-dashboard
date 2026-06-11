import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

type Params = { majorId: string };

export async function GET(_: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId } = await params;
  await connectToDB();
  const major = await MajorExamModel.findById(majorId).lean();

  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  return NextResponse.json(major);
}

export async function PATCH(request: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId } = await params;
  await connectToDB();
  const body = (await request.json()) as { name?: string; code?: string; logoUrl?: string };

  const major = await MajorExamModel.findById(majorId);
  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  if (body.name !== undefined) {
    major.name = body.name;
  }
  if (body.code !== undefined) {
    major.code = body.code;
  }
  if (body.logoUrl !== undefined) {
    major.logoUrl = body.logoUrl;
  }

  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json(major);
}

export async function DELETE(_: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId } = await params;
  await connectToDB();
  const major = await MajorExamModel.findByIdAndDelete(majorId);

  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  await syncExamsToFirestoreSafe();
  return NextResponse.json({ success: true });
}
