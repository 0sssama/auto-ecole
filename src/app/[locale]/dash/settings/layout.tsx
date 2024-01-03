import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { enforceAdmin } from '@/base/utils/server/auth/enforce-admin';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const allowed = await enforceAdmin();

  if (!allowed) notFound();

  return <>{children}</>;
}
