import type { FC } from "react";

import { concatText } from "@/utils/concatText";
import Tooltip from "@/components/atoms/tooltip";

export type TooltipConcatProps = {
  text: string;
  className?: string;
};

const TooltipConcat: FC<TooltipConcatProps> = ({ text, className }) => {
  return (
    <Tooltip content={text}>
      <p className={className}>{concatText(text)}</p>
    </Tooltip>
  );
};

export default TooltipConcat;
