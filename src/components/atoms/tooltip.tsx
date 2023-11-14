import { ReactNode } from "react";

import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type TooltipProps = {
  children: ReactNode;
  content: string;
};

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <ShadcnTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
}
