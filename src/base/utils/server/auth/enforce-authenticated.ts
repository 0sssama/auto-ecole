import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';

export const enforceAuthenticated = async () => {
  const { userId } = auth();

  if (!userId) notFound();

  return true;
};
