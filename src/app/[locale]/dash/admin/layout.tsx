"use client";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = useOrganization();

  if (!membership || membership.role !== "admin") redirect("/dash");

  return <>{children}</>;
}
