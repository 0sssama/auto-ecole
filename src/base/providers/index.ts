import dynamic from 'next/dynamic';

export const NprogressProvider = dynamic(() => import('@/base/providers/nprogress-provider'), { ssr: false });

export { default as ThemeProvider } from '@/base/providers/theme-provider';
export { default as RecoilProvider } from '@/base/providers/recoil-provider';
export { default as ToastProvider } from '@/base/providers/sonner-provider';
export { default as TRPCProvider } from '@/base/providers/trpc-provider';
export { default as DateFnsProvider } from '@/base/providers/datefns-provider';
