"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { membership } = useOrganization();

  if (!membership || membership.role !== "admin") {
    redirect("/dash");
    return null;
  }

  return <>{children}</>;
}
