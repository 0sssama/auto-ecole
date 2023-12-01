"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

export default function NprogressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <>
      <ProgressBar
        height="2px"
        color={theme === "dark" ? "#fff" : "#000"}
        options={{ showSpinner: true }}
        shallowRouting
      />
      {children}
    </>
  );
}
