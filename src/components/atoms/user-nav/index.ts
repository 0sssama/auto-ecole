import dynamic from 'next/dynamic';

export const UserNav = dynamic(() => import('./user-nav'), { ssr: false });
export type { UserNavProps, UserNavComponentType } from './user-nav.types';
