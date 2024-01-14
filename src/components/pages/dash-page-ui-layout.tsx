'use client';

import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

import { Header, Sidebar } from '@/components/sections';
import { useSetActiveOrganization } from '@/base/hooks/use-set-active-organization';
import { DashPageError, DashPageLoading } from '@/components/pages';

export default function DashPageUILayout({ children }: { children: ReactNode }) {
  const { loading, noOrgFound } = useSetActiveOrganization();

  const searchParams = useSearchParams();

  if (searchParams.get('licenseFileId') && searchParams.get('renderContract') === 'true') return <>{children}</>;

  if (loading) return <DashPageLoading />;

  if (noOrgFound) return <DashPageError />;

  return (
    <div className="mx-auto grid h-full min-h-screen w-full max-w-screen-xl bg-background lg:grid-cols-5">
      <Header />
      <Sidebar />
      <main className="col-span-3 mt-[var(--header-height)] h-full w-full bg-background p-6 pt-10 lg:col-span-4 lg:border-l">
        {children}
      </main>
    </div>
  );
}
