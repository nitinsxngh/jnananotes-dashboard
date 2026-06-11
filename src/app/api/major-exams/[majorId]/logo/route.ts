import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';

import { connectToDB } from '@/lib/db/mongoose';
import { MajorExamModel } from '@/lib/db/models/major-exam';
import { syncExamsToFirestoreSafe } from '@/lib/firebase/sync-exams-to-firestore';

type Params = { majorId: string };

export async function POST(request: Request, { params }: { params: Promise<Params> }): Promise<NextResponse> {
  const { majorId } = await params;
  await connectToDB();

  const major = await MajorExamModel.findById(majorId);
  if (!major) {
    return NextResponse.json({ error: 'Major exam not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = (file.name || '').split('.').pop() || 'png';

  // Upload to Cloudinary (exam logos folder), using CLOUDINARY_URL env for config
  const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'exam-logos',
        public_id: crypto.randomUUID(),
        resource_type: 'image',
        format: ext.toLowerCase(),
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed'));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });

  major.logoUrl = uploadResult.secure_url;
  await major.save();
  await syncExamsToFirestoreSafe();
  return NextResponse.json({ logoUrl: major.logoUrl });
}
