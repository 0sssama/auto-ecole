import type { FC } from "react";

import { cn } from "@/lib/cn";

export type LoadingProps = {
  size?: keyof typeof variants;
  color?: string;
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

const Loading: FC<LoadingProps> = ({ size = "md", color, className }) => {
  return (
    <div
      aria-label="Spinner"
      style={{
        ...variants[size],
      }}
      className={cn(
        "border-solid rounded-full border-foreground !border-t-transparent animate-spin",
        className,
        color && `!border-${color}`,
      )}
    ></div>
  );
};

export default Loading;
