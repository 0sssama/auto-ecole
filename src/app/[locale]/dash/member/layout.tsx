"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

export default function MemberProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { membership } = useOrganization();
  const { push } = useRouter();

  useEffect(() => {
    if (
      !membership ||
      (membership.role !== "admin" && membership.role !== "basic_member")
    )
      push("/dash");
  }, [membership, push]);

  return <>{children}</>;
}
