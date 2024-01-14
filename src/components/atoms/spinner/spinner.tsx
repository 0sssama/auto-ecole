import { cn } from '@/base/utils/client/cn';

import { colors, sizes } from './spinner.helpers';
import type { SpinnerColor, SpinnerComponentType, SpinnerSize } from './spinner.types';

const Spinner: SpinnerComponentType = ({ size = 'md', color = 'foreground', className }) => (
  <div
    aria-label="Loading..."
    className={cn(
      'animate-spin rounded-full border-solid !border-t-transparent',
      className,
      colors[color as SpinnerColor],
      sizes[size as SpinnerSize],
    )}
  ></div>
);

export default Spinner;
