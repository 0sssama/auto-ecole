import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getSidebarLinks } from "@/components/sections/sidebar/utils";

export default async function DashboardHome() {
  const { orgRole } = auth();

  if (!orgRole) return redirect("/");

  redirect(getSidebarLinks()?.[orgRole]?.[0]?.links?.[0]?.href);
}
