"use client";

import React from "react";
import { NextUIProvider as NextUINativeProvider } from "@nextui-org/system";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUINativeProvider>{children}</NextUINativeProvider>;
}
