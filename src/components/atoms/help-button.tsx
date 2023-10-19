"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useMedia } from "@/lib/hooks/useMedia";
import { getLgMedia } from "@/lib/media";
import { LifeBuoy } from "lucide-react";
import React from "react";

export default function HelpButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const isDesktop = useMedia(getLgMedia());

  return (
    <Button
      variant={isDesktop ? "outline" : "link"}
      className={cn(className, !isDesktop && "!p-0")}
    >
      <LifeBuoy size={isDesktop ? 20 : 26} />
      <span className="hidden ml-2 lg:block">{children}</span>
    </Button>
  );
}
