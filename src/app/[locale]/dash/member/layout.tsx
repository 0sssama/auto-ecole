"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

export default function MemberProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { membership } = useOrganization();

  if (
    !membership ||
    (membership.role !== "admin" && membership.role !== "basic_member")
  ) {
    redirect("/dash");
    return null;
  }

  return <>{children}</>;
}
