import dynamic from "next/dynamic";

export const NprogressProvider = dynamic(
  () => import("@/providers/nprogress-provider"),
  { ssr: false },
);

export { default as ThemeProvider } from "@/providers/theme-provider";
export { default as RecoilProvider } from "@/providers/recoil-provider";
export { default as ToastProvider } from "@/providers/sonner-provider";
export { default as TRPCProvider } from "@/providers/trpc-provider";
export { default as NextUIProvider } from "@/providers/nextui-provider";
export { default as MomentProvider } from "@/providers/moment-provider";
