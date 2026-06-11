'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';

// Bump key to reset older saved preference and apply new default (collapsed).
const SIDE_NAV_COLLAPSED_KEY = 'jnana-side-nav-collapsed-v2';

function readInitialCollapsed(): boolean {
  if (globalThis.window === undefined) return false;
  try {
    const stored = localStorage.getItem(SIDE_NAV_COLLAPSED_KEY);
    // Default to collapsed for first-time users (no stored preference yet).
    if (stored === null) return true;
    return stored === '1';
  } catch {
    return true;
  }
}

export function DashboardShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [collapsed, setCollapsed] = React.useState<boolean>(readInitialCollapsed);

  React.useEffect(() => {
    try {
      localStorage.setItem(SIDE_NAV_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      // ignore
    }
  }, [collapsed]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': collapsed ? '88px' : '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav sideNavCollapsed={collapsed} onToggleSideNav={() => setCollapsed((prev) => !prev)} />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </React.Fragment>
  );
}

