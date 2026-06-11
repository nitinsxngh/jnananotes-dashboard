import { getFirestore } from 'firebase-admin/firestore';

import '@/lib/firebase/admin'; // Ensures Firebase Admin app is initialized

function getFirestoreAdmin() {
  return getFirestore();
}

export { getFirestoreAdmin };
