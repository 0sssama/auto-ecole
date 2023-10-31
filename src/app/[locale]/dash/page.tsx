"use client";

import { redirect } from "next/navigation";
import { Spinner } from "@/components/atoms";
import { useOrganization } from "@clerk/nextjs";
import { getSidebarLinks } from "@/components/sections/sidebar";

export default function Home() {
  const { membership } = useOrganization();

  const { [membership!.role]: sidebarLinks } = getSidebarLinks(() => "");

  const { href } = sidebarLinks[0].links[0];

  redirect(href);

  return (
    <main className="w-full h-full min-h-[300px]">
      <div className="flex items-center justify-center w-full h-full">
        <Spinner size="md" />
      </div>
    </main>
  );
}
