"use client";

import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import type { ReactNode } from "react";

export default function MemberProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = useOrganization();

  if (
    !membership ||
    (membership.role !== "admin" && membership.role !== "basic_member")
  )
    redirect("/dash");

  return <>{children}</>;
}
