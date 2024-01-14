'use client';

import { cn } from '@/base/utils/client/cn';
import { useMenu } from '@/base/hooks/use-menu';

import type { HamburgerButtonComponentType } from './hamburger-button.types';

const HamburgerButton: HamburgerButtonComponentType = ({ className }) => {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <button
      type="button"
      className={cn('flex h-[20px] w-[26px] items-center justify-center', className)}
      onClick={toggleMenu}
    >
      <div
        className={cn(
          'before:block after:block', // display
          'w-[26px] before:w-[26px] after:w-[26px]', // dimensions
          'bg-foreground before:bg-foreground after:bg-foreground', // colors
          'h-px before:h-px after:h-px', // stroke width
          'duration-200 before:translate-y-[-10px] before:transform after:translate-y-[9px] after:transform', // animation
          isOpen && 'rotate-45 before:translate-y-0 before:-rotate-90 after:translate-y-0 after:opacity-0', // open state
        )}
      />
    </button>
  );
};

export default HamburgerButton;
