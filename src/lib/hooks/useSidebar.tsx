"use client";

import { useOrganization } from "@clerk/nextjs";

import { getSidebarLinks } from "@/components/sections/sidebar/utils";
import type { TranslationFunction } from "@/types";

export const useSidebar = (t: TranslationFunction = () => "") => {
  const { membership, isLoaded } = useOrganization();

  if (!membership || !membership.role || !isLoaded) return [];

  return getSidebarLinks(t)[membership.role];
};
