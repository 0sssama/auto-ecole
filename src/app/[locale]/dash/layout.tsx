import type { ReactNode } from 'react';

import { enforceAuthenticated } from '@/base/utils/server/auth/enforce-authenticated';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await enforceAuthenticated();

  /* Clerk will handle redirection in the case of an unauthenticated user */
  if (isAuthenticated) return <DashboardLayout>{children}</DashboardLayout>;
}
