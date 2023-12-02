import type { FC } from "react";

import { concatText } from "@/utils/concatText";
import Tooltip from "@/components/atoms/tooltip";

export type TooltipConcatProps = {
  text: string;
  className?: string;
  maxLength?: number;
};

const TooltipConcat: FC<TooltipConcatProps> = ({
  text,
  className,
  maxLength = 10,
}) => {
  return (
    <Tooltip content={text}>
      <p className={className}>{concatText(text, maxLength)}</p>
    </Tooltip>
  );
};

export default TooltipConcat;
