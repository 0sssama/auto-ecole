"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = useOrganization();
  const { push } = useRouter();

  useEffect(() => {
    if (!membership || membership.role !== "admin") push("/dash");
  }, [membership, push]);

  return <>{children}</>;
}
