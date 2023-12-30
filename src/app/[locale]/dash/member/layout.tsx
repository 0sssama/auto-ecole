import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { enforceAuthenticated } from '@/base/utils/server/auth/enforce-authenticated';

export default async function MemberProtectedLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await enforceAuthenticated();

  if (!isAuthenticated) notFound();

  return <>{children}</>;
}
