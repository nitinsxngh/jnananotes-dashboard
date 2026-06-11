import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { ExamManagement } from '@/components/dashboard/exams/exam-management';

export const metadata = { title: `Exams | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Exam Management</Typography>
        <Typography color="text.secondary" variant="body2">
          Manage exam categories, exams, and syllabus structure.
        </Typography>
      </Stack>
      <ExamManagement />
    </Stack>
  );
}
