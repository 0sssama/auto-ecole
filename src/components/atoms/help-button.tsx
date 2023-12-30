'use client';

import { LifeBuoy } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useMedia } from '@/lib/hooks/use-media';
import { getLgMedia } from '@/lib/media';

export default function HelpButton({ children, className }: { children?: ReactNode; className?: string }) {
  const isDesktop = useMedia(getLgMedia());

  return (
    <Button variant={isDesktop ? 'outline' : 'link'} className={cn(className, !isDesktop && '!p-0')}>
      <LifeBuoy size={isDesktop ? 20 : 26} />
      <span className="ml-2 hidden lg:block">{children}</span>
    </Button>
  );
}
