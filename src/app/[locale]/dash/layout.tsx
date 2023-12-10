"use client";

import type { ReactNode } from "react";

import { Header, Sidebar } from "@/components/sections";
import { useSetActiveOrganization } from "@/lib/hooks/useSetActiveOrganization";
import { DashPageError, DashPageLoading } from "@/components/pages";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading, noOrgFound } = useSetActiveOrganization();

  if (loading) return <DashPageLoading />;

  if (noOrgFound) return <DashPageError />;

  return (
    <div className="grid w-full h-full max-w-screen-xl min-h-screen mx-auto lg:grid-cols-5 bg-background">
      <Header />
      <Sidebar />
      <div className="w-full h-full col-span-3 p-6 pt-10 lg:col-span-4 lg:border-l mt-[var(--header-height)] bg-background">
        {children}
      </div>
    </div>
  );
}
