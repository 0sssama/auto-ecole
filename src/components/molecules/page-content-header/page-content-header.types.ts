import type { FC, ReactNode } from 'react';

export interface PageContentHeaderProps {
  title: ReactNode;
  children?: ReactNode;
}

export type PageContentHeaderComponentType = FC<PageContentHeaderProps>;
