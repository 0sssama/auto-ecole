"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export default function ToastProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <Toaster
        closeButton
        richColors
        expand={false}
        theme={theme === "dark" ? "dark" : "light"}
        position="bottom-right"
      />
      {children}
    </>
  );
}
