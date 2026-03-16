import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { ClipboardTextIcon } from '@phosphor-icons/react/dist/ssr/ClipboardText';
import { ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { NotebookIcon } from '@phosphor-icons/react/dist/ssr/Notebook';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { config } from '@/config';
import { MetricCard } from '@/components/dashboard/overview/metric-card';
import { UserGrowth } from '@/components/dashboard/overview/user-growth';
import { getExamStats } from '@/lib/db/exam-stats';
import { getUserStats } from '@/lib/firebase/users';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {
  const examStats = await getExamStats();
  const userStats = await getUserStats();
  const metrics = [
    {
      label: 'Number of Users',
      value: userStats.totalUsers,
      icon: <UsersIcon fontSize="var(--icon-fontSize-lg)" />,
      avatarColor: 'var(--mui-palette-primary-main)',
    },
    {
      label: 'Number of Exams',
      value: examStats.examCount,
      icon: <ClipboardTextIcon fontSize="var(--icon-fontSize-lg)" />,
      avatarColor: 'var(--mui-palette-success-main)',
    },
    {
      label: 'Number of Chapters',
      value: examStats.chapterCount,
      icon: <NotebookIcon fontSize="var(--icon-fontSize-lg)" />,
      avatarColor: 'var(--mui-palette-warning-main)',
    },
    {
      label: 'Number of Sections',
      value: examStats.sectionCount,
      icon: <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />,
      avatarColor: 'var(--mui-palette-info-main)',
    },
  ];
  const userGrowthSeries = [{ name: 'Users', data: userStats.monthlyCounts }];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
      <Grid
          key={metric.label}
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
          <MetricCard
            avatarColor={metric.avatarColor}
            icon={metric.icon}
            label={metric.label}
          sx={{ height: '100%' }}
            value={metric.value}
        />
      </Grid>
      ))}
      <Grid
        size={{
          lg: 12,
          xs: 12,
        }}
      >
        <UserGrowth chartLabels={userStats.monthLabels} chartSeries={userGrowthSeries} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
