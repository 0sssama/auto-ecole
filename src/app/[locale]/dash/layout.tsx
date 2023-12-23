import type { ReactNode } from "react";

import { DashPageUILayout } from "@/components/pages";
import { enforceAuthenticated } from "@/server/utils/auth/enforceAuthenticated";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = await enforceAuthenticated();

  console.log("isAuthenticated", isAuthenticated);

  /* Clerk will handle redirection in the case of an unauthenticated user */
  if (isAuthenticated) return <DashPageUILayout>{children}</DashPageUILayout>;
}
