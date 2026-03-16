'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { NoSsr } from '@/components/core/no-ssr';
import { config } from '@/config';

const HEIGHT = 60;
const WIDTH = 60;

export interface LogoProps {
  height?: number;
  width?: number;
}

export function Logo({ height = HEIGHT }: LogoProps): React.JSX.Element {
  const size = height;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Box alt="logo" component="img" height={size} src="/logo.png" width={size} />
      <Typography
        sx={{
          color: 'inherit',
          fontSize: '1.05rem',
          fontWeight: 700,
          letterSpacing: '0.3px',
          textTransform: 'none',
        }}
        variant="subtitle1"
      >
        {config.site.name}
      </Typography>
    </Stack>
  );
}

export interface DynamicLogoProps {
  height?: number;
  width?: number;
}

export function DynamicLogo({
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo height={height} width={width} {...props} />
    </NoSsr>
  );
}
