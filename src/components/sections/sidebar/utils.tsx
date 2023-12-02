import {
  Banknote,
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
import type { TranslationFunction } from "@/types";
import type { MembershipRole } from "@clerk/types";

import type { SidebarLinkGroupProps } from "./types";

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
          name: t("payments"),
          href: "/dash/admin/payments",
          icon: <Banknote {...sidebarIconProps} />,
        },
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
