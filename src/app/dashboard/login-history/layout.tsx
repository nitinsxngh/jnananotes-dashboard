import type { Metadata } from 'next';

import { config } from '@/config';

export const metadata = { title: `Login History | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Layout({ children }: { children: React.ReactNode }): React.ReactNode {
  return children;
}
