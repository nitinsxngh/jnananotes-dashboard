import { firebaseAdminAuth } from '@/lib/firebase/admin';

export type FirebaseUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  createdAt?: string | null;
  lastLoginAt?: string | null;
  photoURL?: string | null;
  disabled: boolean;
};

export async function listFirebaseUsers(limit = 1000): Promise<FirebaseUser[]> {
  const result = await firebaseAdminAuth.listUsers(limit);

  return result.users.map((user) => ({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    createdAt: user.metadata?.creationTime ?? null,
    lastLoginAt: user.metadata?.lastSignInTime ?? null,
    photoURL: user.photoURL ?? null,
    disabled: user.disabled,
  }));
}

export type UserStats = {
  totalUsers: number;
  monthlyCounts: number[];
  monthLabels: string[];
};

export async function getUserStats(): Promise<UserStats> {
  const users = await listFirebaseUsers();
  const totalUsers = users.length;

  const now = new Date();
  const months: { key: string; label: string }[] = [];
  for (let i = 11; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = date.toLocaleString('default', { month: 'short' });
    months.push({ key, label });
  }

  const counts = new Map<string, number>(months.map((month) => [month.key, 0]));

  for (const user of users) {
    if (!user.createdAt) continue;
    const created = new Date(user.createdAt);
    const key = `${created.getFullYear()}-${created.getMonth()}`;
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return {
    totalUsers,
    monthlyCounts: months.map((month) => counts.get(month.key) ?? 0),
    monthLabels: months.map((month) => month.label),
  };
}
