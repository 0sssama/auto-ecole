"use client";

import React from "react";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import { useUser } from "@clerk/nextjs";
import DashPageError from "./_components/dash-page-error";
import DashPageLoading from "./_components/dash-page-loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { organization } = user?.organizationMemberships[0] ?? {};

  if (!isLoaded || !isSignedIn) return <DashPageLoading />;

  if (!user || !organization) return <DashPageError />;

  return (
    <div className="grid w-full max-w-screen-xl mx-auto lg:grid-cols-5">
      <Header />
      <Sidebar />
      <div className="w-full h-full col-span-3 p-6 pt-10 lg:col-span-4 lg:border-l mt-[var(--header-height)]">
        {children}
      </div>
    </div>
  );
}
