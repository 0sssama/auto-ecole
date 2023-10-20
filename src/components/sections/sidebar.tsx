"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useOrganization } from "@clerk/nextjs";
import { MembershipRole } from "@clerk/types";
import {
  Building,
  CarFront,
  Folder,
  LogOut,
  Settings,
  User2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/lib/hooks/useScroll";
import { useMedia } from "@/lib/hooks/useMedia";
import { getLgMedia, getMdMedia } from "@/lib/media";
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

  const isTablet = useMedia(getMdMedia());
  const isDesktop = useMedia(getLgMedia());

  const { scrolled } = useScroll({ threshold: 50 });

  const sidebarLinks = getSidebarLinks(t, membership?.role);

  if ((!isOpen && !isDesktop) || !membership || !isLoaded) return null;

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
  const pathname = usePathname();

  console.log(cleanPathname(pathname));

  if (cleanPathname(pathname).startsWith(href))
    return (
      <Button variant={"default"} className="justify-start w-full">
        {icon}
        {name}
      </Button>
    );

  return (
    <Link href={href}>
      <Button variant={"ghost"} className="justify-start w-full">
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

export const getSidebarLinks = (
  t: TranslationFunction,
  role: MembershipRole | undefined,
): SidebarLinkGroupProps[] => {
  switch (role) {
    // add check to see if user is super admin (check admin in planetscale database)
    case "admin": // admin
      return sidebarLinks_admin(t);
    case "basic_member": // student
      return sidebarLinks_student(t);
    default:
      return [];
  }
};

const sidebarLinks_admin = (
  t: TranslationFunction,
): SidebarLinkGroupProps[] => [
  {
    title: t("users"),
    links: [
      {
        name: t("clients"),
        href: "/dash/clients",
        icon: <User2 {...sidebarIconProps} />,
      },
      {
        name: t("monitors"),
        href: "/dash/monitors",
        icon: <Users2 {...sidebarIconProps} />,
      },
      {
        name: t("editors"),
        href: "/dash/editors",
        icon: <Building {...sidebarIconProps} />,
      },
    ],
  },
  {
    title: t("entities"),
    links: [
      {
        name: t("cars"),
        href: "/dash/cars",
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
];

const sidebarLinks_student = (
  t: TranslationFunction,
): SidebarLinkGroupProps[] => [
  {
    title: t("account"),
    links: [
      {
        name: t("folder"),
        href: "/dash/folder",
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
];
