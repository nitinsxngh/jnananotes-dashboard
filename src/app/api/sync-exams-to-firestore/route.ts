import { NextResponse } from 'next/server';

import { syncExamsToFirestore } from '@/lib/firebase/sync-exams-to-firestore';

/**
 * POST /api/sync-exams-to-firestore
 * Syncs all major exams from MongoDB to Firestore so the mobile app can read them.
 * Call this once after seeding MongoDB or to force a full re-sync.
 */
export async function POST(): Promise<NextResponse> {
  try {
    await syncExamsToFirestore();
    return NextResponse.json({ success: true, message: 'Synced to Firestore' });
  } catch (error) {
    console.error('Sync to Firestore failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Sync failed' },
      { status: 500 }
    );
  }
}
