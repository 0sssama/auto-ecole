"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChartBig,
  BedDouble,
  CarFront,
  Contrast,
  Files,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/lib/hooks/useScroll";
import { useMedia } from "@/lib/hooks/useMedia";
import { getLgMedia, getMdMedia } from "@/lib/media";
import { useMenu } from "@/lib/hooks/useMenu";

export type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen } = useMenu();

  const isTablet = useMedia(getMdMedia());
  const isDesktop = useMedia(getLgMedia());

  const { scrolled } = useScroll({ threshold: 50 });

  if (!isOpen && !isDesktop) return null;

  return (
    <div
      className={cn(
        className,
        isTablet || (isOpen && "absolute inset-0 z-[9] bg-white"),
      )}
    >
      <div
        className={cn(
          "sticky top-6 pt-[var(--header-height)] transition-all",
          scrolled && "top-0",
          isOpen && "fixed w-full h-full overflow-scroll pb-12",
        )}
      >
        {sidebarLinksData.map((group, i) => (
          <SidebarLinkGroup key={i} {...group} />
        ))}
      </div>
    </div>
  );
}

type SidebarLinkGroupProps = {
  title: string;
  links: SidebarLinkProps[];
  className?: string;
};

function SidebarLinkGroup({ title, links, className }: SidebarLinkGroupProps) {
  if (!links.length) return null;

  return (
    <div className={cn("px-3 py-2", className)}>
      <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="flex flex-col gap-y-1">
        {links.map((link, i) => (
          <SidebarLink key={i} {...link} />
        ))}
      </div>
    </div>
  );
}

type SidebarLinkProps = {
  name: string;
  href: string;
  // should be `keyof typeof icons` (icons object from lucide icons)
  // for more precision. but the object is too big so I avoided it for now
  icon: ReactNode;
};

function SidebarLink({ name, href, icon }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <Button
        variant={pathname?.startsWith(href) ? "secondary" : "ghost"}
        className="justify-start w-full"
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
}

const sidebarIconProps = {
  size: 16,
  className: "mr-2",
};

const sidebarLinksData: SidebarLinkGroupProps[] = [
  {
    title: "Discover",
    links: [
      {
        name: "Listen Now",
        href: "/dash",
        icon: <BarChartBig {...sidebarIconProps} />,
      },
      {
        name: "Browse",
        href: "/dash/analytics",
        icon: <BedDouble {...sidebarIconProps} />,
      },
      {
        name: "Radio",
        href: "/dash/settings",
        icon: <CarFront {...sidebarIconProps} />,
      },
    ],
  },
  {
    title: "Library",
    links: [
      {
        name: "Playlists",
        href: "/dash/playlists",
        icon: <Contrast {...sidebarIconProps} />,
      },
      {
        name: "Made For You",
        href: "/dash/analytics",
        icon: <Fingerprint {...sidebarIconProps} />,
      },
      {
        name: "Artists",
        href: "/dash/settings",
        icon: <Files {...sidebarIconProps} />,
      },
      {
        name: "Albums",
        href: "/dash/settings",
        icon: <Fingerprint {...sidebarIconProps} />,
      },
    ],
  },
  {
    title: "Playlists",
    links: [
      {
        name: "Recently Played",
        href: "/dash/test",
        icon: <CarFront {...sidebarIconProps} />,
      },
      {
        name: "On Repeat",
        href: "/dash/analytics",
        icon: <BedDouble {...sidebarIconProps} />,
      },
    ],
  },
];
