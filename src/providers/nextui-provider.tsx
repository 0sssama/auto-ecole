"use client";

import { NextUIProvider as NextUINativeProvider } from "@nextui-org/system";
import type { ReactNode } from "react";

export default function NextUIProvider({ children }: { children: ReactNode }) {
  return <NextUINativeProvider>{children}</NextUINativeProvider>;
}
