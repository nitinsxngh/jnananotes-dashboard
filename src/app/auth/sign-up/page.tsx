import * as React from 'react';
import RouterLink from 'next/link';
import type { Metadata } from 'next';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { paths } from '@/paths';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';

export const metadata = { title: `Sign up | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Sign up</Typography>
            <Typography color="text.secondary" variant="body2">
              New registrations are disabled. This dashboard supports a single admin account.
            </Typography>
          </Stack>
          <Alert color="info">
            Use the admin credentials on the sign-in page to access the dashboard.
          </Alert>
          <Button component={RouterLink} href={paths.auth.signIn} variant="contained">
            Go to sign in
          </Button>
        </Stack>
      </GuestGuard>
    </Layout>
  );
}
