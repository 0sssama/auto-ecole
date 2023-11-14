import { concatText } from "@/utils/concatText";
import Tooltip from "@/components/atoms/tooltip";

export type TooltipConcatProps = {
  text: string;
};

export default function TooltipConcat({ text }: TooltipConcatProps) {
  return <Tooltip content={text}>{concatText(text)}</Tooltip>;
}
