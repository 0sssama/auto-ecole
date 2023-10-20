"use client";

import { cn } from "@/lib/cn";
import { useMenu } from "@/lib/hooks/useMenu";

export type HambugerButtonProps = {
  className?: string;
};

export default function HamburgerButton({ className }: HambugerButtonProps) {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <button
      type="button"
      className={cn(
        "w-[26px] h-[20px] flex items-center justify-center",
        className,
      )}
      onClick={toggleMenu}
    >
      <div
        className={cn(
          "after:block before:block", // display
          "w-[26px] after:w-[26px] before:w-[26px]", // dimensions
          "bg-gray-800 before:bg-gray-800 after:bg-gray-800", // colors
          "h-px before:h-px after:h-px", // stroke width
          "duration-200 before:transform before:translate-y-[-10px] after:transform after:translate-y-[9px]", // animation
          isOpen &&
            "rotate-45 before:translate-y-0 before:-rotate-90 after:translate-y-0 after:opacity-0",
        )}
      />
    </button>
  );
}
