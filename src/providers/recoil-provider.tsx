"use client";

import { RecoilRoot } from "recoil";
import type { ReactNode } from "react";

export default function RecoilProvider({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
