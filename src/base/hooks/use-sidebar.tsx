'use client';

import { useOrganization } from '@clerk/nextjs';

import { getFallbackSidebarLinks, getSidebarLinks } from '@/components/sections/sidebar/utils';
import { useUserIsSuperAdmin } from '@/base/hooks/auth/use-user-is-super-admin';
import type { TranslationFunction } from '@/base/types';

export const useSidebar = (t: TranslationFunction = () => '') => {
  const { membership, isLoaded } = useOrganization();
  const { isSuperAdmin } = useUserIsSuperAdmin();

  if (!membership || !membership.role || !isLoaded) return getFallbackSidebarLinks(t);

  if (isSuperAdmin) return getSidebarLinks(t).super_admin;

  return getSidebarLinks(t)[membership.role];
};
