import type { FC } from 'react';

import type { sizes } from './logo.helpers';

export type LogoSize = keyof typeof sizes;

export interface LogoProps {
  size?: LogoSize;
  className?: string;
}

export type LogoComponentType = FC<LogoProps>;
