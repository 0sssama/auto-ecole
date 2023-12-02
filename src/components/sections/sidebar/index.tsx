"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useScroll } from "@/lib/hooks/useScroll";
import { useMedia } from "@/lib/hooks/useMedia";
import { getLgMedia } from "@/lib/media";
import { useMenu } from "@/lib/hooks/useMenu";
import { cleanPathname } from "@/utils/cleanPathname";

import { getSidebarLinks } from "./utils";
import type {
  SidebarComponentType,
  SidebarLinkComponentType,
  SidebarLinkGroupComponentType,
} from "./types";

const Sidebar: SidebarComponentType = ({ className }) => {
  const t = useTranslations("Dashboard.Sidebar");

  const { membership, isLoaded } = useOrganization();

  const { isOpen } = useMenu();

  const isDesktop = useMedia(getLgMedia());

  const { scrolled } = useScroll({ threshold: 50 });

  const { [membership!.role]: sidebarLinks } = getSidebarLinks(t);

  if ((!isOpen && !isDesktop) || !membership || !isLoaded) return null;

  return (
    <div
      className={cn(
        className,
        !isDesktop && isOpen && "fixed inset-0 z-[9] bg-background",
      )}
    >
      <div
        className={cn(
          "sticky top-6 pt-[var(--header-height)] transition-all lg:mt-10",
          scrolled && "top-0",
          !isDesktop && isOpen && "fixed w-full h-full overflow-scroll pb-20",
        )}
      >
        {sidebarLinks.map((group, i) => (
          <SidebarLinkGroup key={i} {...group} />
        ))}
      </div>
    </div>
  );
};

const SidebarLinkGroup: SidebarLinkGroupComponentType = ({
  title,
  links,
  className,
}) => {
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
};

const SidebarLink: SidebarLinkComponentType = ({ name, href, icon }) => {
  const { closeMenu } = useMenu();
  const pathname = usePathname();

  return (
    <Link href={href}>
      <Button
        variant={cleanPathname(pathname).startsWith(href) ? "default" : "ghost"}
        className="justify-start w-full"
        onClick={closeMenu}
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
};

export default Sidebar;
