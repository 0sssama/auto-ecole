import type { FC } from 'react';

import type { colors, sizes } from './spinner.helpers';

export type SpinnerSize = keyof typeof sizes;
export type SpinnerColor = keyof typeof colors;

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
};

export type SpinnerComponentType = FC<SpinnerProps>;
