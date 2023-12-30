import type { ReactNode } from 'react';

import { DashPageUILayout } from '@/components/pages';
import { enforceAuthenticated } from '@/server/utils/auth/enforce-authenticated';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await enforceAuthenticated();

  /* Clerk will handle redirection in the case of an unauthenticated user */
  if (isAuthenticated) return <DashPageUILayout>{children}</DashPageUILayout>;
}
