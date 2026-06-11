import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { listFirebaseUsers } from '@/lib/firebase/users';
import { UsersTable } from '@/components/dashboard/users/users-table';

export const metadata = { title: `Users | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {
  const users = await listFirebaseUsers();

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Users</Typography>
        <Typography color="text.secondary" variant="body2">
          All registered users from Firebase Authentication.
        </Typography>
      </Stack>
      <UsersTable rows={users} />
    </Stack>
  );
}
