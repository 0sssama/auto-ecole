'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export default function PageFallback() {
  const t = useTranslations('Dashboard.Error');

  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-12 md:p-24">
      <div className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl font-semibold">{t('sorry')}</h1>
        <p className="text-center text-sm font-semibold text-slate-500">{t('description')}</p>

        <SignOutButton signOutCallback={() => router.push('/')}>
          <Button variant="destructive">{t('logout')}</Button>
        </SignOutButton>
      </div>
    </main>
  );
}
