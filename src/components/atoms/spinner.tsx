import type { FC } from 'react';

import { cn } from '@/base/utils/client/cn';

export type LoadingProps = {
  size?: keyof typeof variants;
  color?: keyof typeof colors;
  className?: string;
};

const variants = {
  xs: {
    width: 14,
    height: 14,
    borderWidth: 1,
  },
  sm: {
    width: 26,
    height: 26,
    borderWidth: 1,
  },
  md: {
    width: 36,
    height: 36,
    borderWidth: 2,
  },
  lg: {
    width: 48,
    height: 48,
    borderWidth: 3,
  },
  xl: {
    width: 64,
    height: 64,
    borderWidth: 4,
  },
};

const colors = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  success: 'border-success',
  destructive: 'border-destructive',
  warning: 'border-warning',
  info: 'border-info',
  light: 'border-light',
  dark: 'border-dark',
  foreground: 'border-foreground',
  background: 'border-background',
};

const Loading: FC<LoadingProps> = ({ size = 'md', color = 'foreground', className }) => (
  <div
    aria-label="Spinner"
    style={{
      ...variants[size],
    }}
    className={cn('animate-spin rounded-full border-solid !border-t-transparent', className, color && colors[color])}
  ></div>
);

export default Loading;
