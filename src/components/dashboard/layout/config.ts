import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'exams', title: 'Exams', href: paths.dashboard.exams, icon: 'notebook' },
  { key: 'customers', title: 'Users', href: paths.dashboard.customers, icon: 'users' },
  { key: 'login-history', title: 'Login History', href: paths.dashboard.loginHistory, icon: 'clock-counter-clockwise' },
] satisfies NavItemConfig[];
