import { concatText } from "@/utils/concatText";
import Tooltip from "@/components/atoms/tooltip";

export type TooltipConcatProps = {
  text: string;
  className?: string;
};

export default function TooltipConcat({ text, className }: TooltipConcatProps) {
  return (
    <Tooltip content={text}>
      <p className={className}>{concatText(text)}</p>
    </Tooltip>
  );
}
