"use client";

import { useEffect, type ReactNode } from "react";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";

import { DashPageError, DashPageLoading } from "@/components/pages";
import { Header, Sidebar } from "@/components/sections";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoaded: isLoaded1, isSignedIn } = useUser();
  const { setActive, isLoaded: isLoaded2 } = useOrganizationList();
  const { organization } = useOrganization();

  const isLoaded = isLoaded1 && isLoaded2;

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || !setActive || organization) return;

    const { organization: userOrg } = user.organizationMemberships[0] ?? {};

    if (!userOrg) return;

    setActive({ organization: userOrg.id });
  }, [user, isSignedIn, setActive, isLoaded, organization]);

  if (!isLoaded || !isSignedIn) return <DashPageLoading />;

  if (!user || !organization) return <DashPageError />;

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
