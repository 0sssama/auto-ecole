'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';

import { getSidebarLinks } from '@/components/sections/sidebar/utils';

export default function DashboardHome() {
  const { membership } = useOrganization();
  const { push } = useRouter();

  useEffect(() => {
    if (!membership) return;

    push(getSidebarLinks()?.[membership.role]?.[0]?.links?.[0]?.href);
  }, [membership, push]);
}
