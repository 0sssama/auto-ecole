import { Tooltip } from '@/components/atoms/tooltip';
import { concatText } from '@/base/utils/client/concat-text';

import type { TooltipConcatComponentType } from './tooltip-concat.types';

const TooltipConcat: TooltipConcatComponentType = ({ text, className, maxLength = 10 }) => (
  <Tooltip content={text}>
    <p className={className}>{concatText(text, maxLength)}</p>
  </Tooltip>
);

export default TooltipConcat;
