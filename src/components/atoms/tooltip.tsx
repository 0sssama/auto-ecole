import type { FC, ReactNode } from 'react';

import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type TooltipProps = {
  children: ReactNode;
  content: string;
};

const Tooltip: FC<TooltipProps> = ({ children, content }) => (
  <TooltipProvider delayDuration={300}>
    <ShadcnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </ShadcnTooltip>
  </TooltipProvider>
);

export default Tooltip;
