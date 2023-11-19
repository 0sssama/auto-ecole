"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useOrganization } from "@clerk/nextjs";
import { MembershipRole } from "@clerk/types";
import {
  BookOpenCheck,
  Building,
  CarFront,
  CircleDollarSign,
  Folder,
  Folders,
  GraduationCap,
  LogOut,
  Settings,
  User2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/lib/hooks/useScroll";
import { useMedia } from "@/lib/hooks/useMedia";
import { getLgMedia } from "@/lib/media";
import { useMenu } from "@/lib/hooks/useMenu";
import type { TranslationFunction } from "@/types";
import { cleanPathname } from "@/utils/cleanPathname";

export type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
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
        !isDesktop && isOpen && "fixed inset-0 z-[9] bg-white",
      )}
    >
      <div
        className={cn(
          "sticky top-6 pt-[var(--header-height)] transition-all mt-10",
          scrolled && "top-0",
          !isDesktop && isOpen && "fixed w-full h-full overflow-scroll pb-12",
        )}
      >
        {sidebarLinks.map((group, i) => (
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
  isSignOut?: boolean;
};

function SidebarLink({ name, href, icon }: SidebarLinkProps) {
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
}

const sidebarIconProps = {
  size: 18,
  className: "mr-3",
};

export const getSidebarLinks = (
  t: TranslationFunction,
): {
  [_ in MembershipRole]: SidebarLinkGroupProps[];
} => ({
  admin: [
    {
      title: t("users"),
      links: [
        {
          name: t("clients"),
          href: "/dash/admin/students",
          icon: <User2 {...sidebarIconProps} />,
        },
        {
          name: t("monitors"),
          href: "/dash/admin/instructors",
          icon: <Users2 {...sidebarIconProps} />,
        },
        {
          name: t("editors"),
          href: "/dash/admin/editors",
          icon: <Building {...sidebarIconProps} />,
        },
      ],
    },
    {
      title: t("folders"),
      links: [
        {
          name: t("license-files"),
          href: "/dash/admin/license-files",
          icon: <Folders {...sidebarIconProps} />,
        },
        {
          name: t("lessons"),
          href: "/dash/admin/lessons",
          icon: <BookOpenCheck {...sidebarIconProps} />,
        },
        {
          name: t("exams"),
          href: "/dash/admin/exams",
          icon: <GraduationCap {...sidebarIconProps} />,
        },
      ],
    },
    {
      title: t("payment"),
      links: [
        {
          name: t("financial-overview"),
          href: "/dash/admin/financial-overview",
          icon: <CircleDollarSign {...sidebarIconProps} />,
        },
      ],
    },
    {
      title: t("entities"),
      links: [
        {
          name: t("cars"),
          href: "/dash/admin/cars",
          icon: <CarFront {...sidebarIconProps} />,
        },
      ],
    },
    {
      title: t("account"),
      links: [
        {
          name: t("settings"),
          href: "/dash/settings",
          icon: <Settings {...sidebarIconProps} />,
        },
        {
          name: t("logout"),
          href: "/dash/logout",
          icon: <LogOut {...sidebarIconProps} />,
          isSignOut: true,
        },
      ],
    },
  ],
  basic_member: [
    {
      title: t("account"),
      links: [
        {
          name: t("folder"),
          href: "/dash/member/folder",
          icon: <Folder {...sidebarIconProps} />,
        },
        {
          name: t("settings"),
          href: "/dash/settings",
          icon: <Settings {...sidebarIconProps} />,
        },
        {
          name: t("logout"),
          href: "/dash/logout",
          icon: <LogOut {...sidebarIconProps} />,
          isSignOut: true,
        },
      ],
    },
  ],
  guest_member: [
    {
      title: t("account"),
      links: [
        {
          name: t("logout"),
          href: "/dash/logout",
          icon: <LogOut {...sidebarIconProps} />,
          isSignOut: true,
        },
      ],
    },
  ],
});
