"use client";

import { redirect } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { getSidebarLinks } from "@/components/sections/sidebar/utils";

export default function DashboardHome() {
  const { membership } = useOrganization();

  const { [membership!.role]: sidebarLinks } = getSidebarLinks(() => "");

  const { href } = sidebarLinks[0].links[0];

  redirect(href);
}
