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

export default function Loading({
  size = "md",
  color,
  className,
}: LoadingProps) {
  return (
    <div
      aria-label="Spinner"
      style={{
        ...variants[size],
        borderColor: color ? color : "#000",
      }}
      className={cn(
        "border-solid rounded-full border-currentColor !border-t-transparent animate-spin",
        className,
      )}
    ></div>
  );
}
