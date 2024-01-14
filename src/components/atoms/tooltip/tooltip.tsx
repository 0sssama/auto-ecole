import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { TooltipComponentType } from './tooltip.types';

const TOOLTIP_DELAY_DURATION = 300;

const Tooltip: TooltipComponentType = ({ children, content }) => (
  <TooltipProvider delayDuration={TOOLTIP_DELAY_DURATION}>
    <ShadcnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </ShadcnTooltip>
  </TooltipProvider>
);

export default Tooltip;
