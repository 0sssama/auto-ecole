import type { FC, ReactNode } from 'react';

interface SidebarProps {
  className?: string;
}

interface SidebarLinkProps {
  name: string;
  href: string;
  // should be `keyof typeof icons` (icons object from lucide icons)
  // for more type safety. but the object is too big so I avoided it for now
  icon: ReactNode;
  isSignOut?: boolean;
}

export interface SidebarLinkGroupProps {
  title: string;
  links: SidebarLinkProps[];
  className?: string;
}

export type SidebarLinkComponentType = FC<SidebarLinkProps>;

export type SidebarLinkGroupComponentType = FC<SidebarLinkGroupProps>;

export type SidebarComponentType = FC<SidebarProps>;
