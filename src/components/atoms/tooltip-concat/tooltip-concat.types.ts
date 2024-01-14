import type { FC } from 'react';

export interface TooltipConcatProps {
  text: string;
  className?: string;
  maxLength?: number;
}

export type TooltipConcatComponentType = FC<TooltipConcatProps>;
