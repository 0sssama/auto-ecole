import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { enforceSuperAdmin } from "@/server/utils/auth/enforceSuperAdmin";

export default async function FinancialOverviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  const allowed = await enforceSuperAdmin();

  if (!allowed) notFound();

  return <>{children}</>;
}