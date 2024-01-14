import type { FC, ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  content: string;
}

export type TooltipComponentType = FC<TooltipProps>;
