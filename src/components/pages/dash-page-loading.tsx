'use client';

import { useEffect } from 'react';

import { Logo, Spinner } from '@/components/atoms';

export default function DashboardPageLoading() {
  useEffect(() => {
    // if page takes more than 3 seconds to load, refresh
    const timeout = setTimeout(() => {
      location.reload();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <Spinner size="md" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:bottom-12">
        <Logo size="sm" />
      </div>
    </main>
  );
}
