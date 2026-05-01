export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    customers: '/dashboard/customers',
    exams: '/dashboard/exams',
    loginHistory: '/dashboard/login-history',
  },
} as const;
