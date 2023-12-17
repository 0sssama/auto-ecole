"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export default function LogOutPage() {
  const { signOut } = useClerk();

  useEffect(() => {
    signOut(() => window.location.replace("/"));
  }, [signOut]);

  return <span>Logging out...</span>;
}
