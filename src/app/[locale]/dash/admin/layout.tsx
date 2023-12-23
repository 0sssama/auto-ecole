import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { enforceAdmin } from "@/server/utils/auth/enforceAdmin";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAdmin = await enforceAdmin();

  if (!isAdmin) notFound();

  return <>{children}</>;
}
