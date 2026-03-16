import { NextResponse } from 'next/server';

import { listFirebaseUsers } from '@/lib/firebase/users';

export async function GET(): Promise<NextResponse> {
  const users = await listFirebaseUsers();
  return NextResponse.json({ users });
}
