import type { FC } from 'react';

import { Tooltip } from '@/components/atoms';
import { concatText } from '@/utils/concat-text';

export type TooltipConcatProps = {
  text: string;
  className?: string;
  maxLength?: number;
};

const TooltipConcat: FC<TooltipConcatProps> = ({ text, className, maxLength = 10 }) => (
  <Tooltip content={text}>
    <p className={className}>{concatText(text, maxLength)}</p>
  </Tooltip>
);

export default TooltipConcat;
