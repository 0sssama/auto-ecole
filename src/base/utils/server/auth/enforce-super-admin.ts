import { notFound } from 'next/navigation';

import { userIsSuperAdmin } from './user-is-super-admin';

export const enforceSuperAdmin = async () => {
  const isSuperAdmin = await userIsSuperAdmin();

  if (!isSuperAdmin) notFound();

  return true;
};
