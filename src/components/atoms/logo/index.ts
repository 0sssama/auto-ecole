import dynamic from 'next/dynamic';

export const Logo = dynamic(() => import('./logo'), { ssr: false });
export type { LogoSize, LogoProps, LogoComponentType } from './logo.types';
