import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Box
            component={RouterLink}
            href={paths.home}
            sx={{
              color: 'var(--mui-palette-text-primary)',
              display: 'inline-block',
              fontSize: 0,
              textDecoration: 'none',
            }}
          >
            <DynamicLogo height={32} width={122} />
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography color="inherit" sx={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
              Welcome to{' '}
              <Box component="span" sx={{ color: '#15b79e' }}>
                Jnana Management System
              </Box>
            </Typography>
            <Typography align="center" variant="subtitle1">
              Manage exams and syllabus content in a structured hierarchy.
            </Typography>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              height: 320,
              width: 320,
              mx: 'auto',
              '@keyframes pulseGlow': {
                '0%': { transform: 'scale(1)', opacity: 0.6 },
                '50%': { transform: 'scale(1.08)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 0.6 },
              },
              '@keyframes floatNode': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(0px)' },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(21, 183, 158, 0.35), rgba(21, 183, 158, 0))',
                filter: 'blur(2px)',
                animation: 'pulseGlow 3s ease-in-out infinite',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 36,
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.18)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 80,
                borderRadius: '50%',
                border: '1px solid rgba(21, 183, 158, 0.5)',
              }}
            />
            {[
              { top: 40, left: 60, size: 14, delay: '0s' },
              { top: 110, right: 40, size: 10, delay: '0.4s' },
              { bottom: 60, left: 90, size: 12, delay: '0.8s' },
              { bottom: 40, right: 70, size: 16, delay: '1.2s' },
            ].map((node) => (
              <Box
                key={`${node.top ?? 'b'}-${node.left ?? 'r'}-${node.size}`}
                sx={{
                  position: 'absolute',
                  top: node.top,
                  left: node.left,
                  right: node.right,
                  bottom: node.bottom,
                  height: node.size,
                  width: node.size,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(21, 183, 158, 0.9)',
                  boxShadow: '0 0 12px rgba(21, 183, 158, 0.7)',
                  animation: 'floatNode 4s ease-in-out infinite',
                  animationDelay: node.delay,
                }}
            />
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
