'use client';

import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

import { Header, Sidebar } from '@/components/sections';
import { useSetActiveOrganization } from '@/base/hooks/use-set-active-organization';

import { DashboardLoading } from '../loading';
import { DashboardError } from '../error';

export default function DashPageUILayout({ children }: { children: ReactNode }) {
  const { loading, noOrgFound } = useSetActiveOrganization();

  const searchParams = useSearchParams();

  if (searchParams.get('licenseFileId') && searchParams.get('renderContract') === 'true') return <>{children}</>;

  if (loading) return <DashboardLoading />;

  if (noOrgFound) return <DashboardError />;

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
