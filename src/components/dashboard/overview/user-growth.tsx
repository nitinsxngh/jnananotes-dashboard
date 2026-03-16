'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface UserGrowthProps {
  chartSeries: { name: string; data: number[] }[];
  chartLabels: string[];
  sx?: SxProps;
}

export function UserGrowth({ chartSeries, chartLabels, sx }: UserGrowthProps): React.JSX.Element {
  const chartOptions = useChartOptions(chartLabels);
  const hasData = chartSeries.some((series) => series.data.some((value) => value > 0));

  return (
    <Card sx={sx}>
      <CardHeader title="User Growth" />
      <CardContent>
        {hasData ? (
          <Chart height={320} options={chartOptions} series={chartSeries} type="line" width="100%" />
        ) : (
          <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
            <Typography color="text.secondary" variant="body2">
              No user data available yet.
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', toolbar: { show: false } },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.4, opacityTo: 0 },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    stroke: { curve: 'smooth', width: 3 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: labels,
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${Math.round(value)}`,
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      y: { formatter: (value) => `${value} users` },
    },
  };
}
