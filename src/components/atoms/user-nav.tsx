"use client";

import Image from "next/image";
import Link from "next/link";
import Cookie from "js-cookie";
import { MoonStar, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { SignOutButton, useOrganization, useUser } from "@clerk/nextjs";
import type { MembershipRole } from "@clerk/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { locales, type Locale } from "@/lib/locales";
import type { TranslationFunction } from "@/types";

import frIcon from "@/assets/fr-icon.png";
import enIcon from "@/assets/en-icon.png";

const UserNavLinks = (t: TranslationFunction) => [
  {
    name: t("profile"),
    href: "#",
  },
  {
    name: t("billing"),
    href: "#",
  },
  {
    name: t("settings"),
    href: "#",
  },
];

export const parseRoleToClient = (
  role: MembershipRole,
  t: TranslationFunction,
) => {
  switch (role) {
    case "admin":
      return t("admin");
    case "basic_member":
      return t("student");
    default:
      return t("unknown");
  }
};

export default function UserNav() {
  const t = useTranslations("Dashboard.Header.UserNav");

  const router = useRouter();

  const { user } = useUser();
  const { membership } = useOrganization();

  const { theme: currentTheme, setTheme } = useTheme();

  const currentLocale = useLocale() as Locale;

  if (!user || !membership) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName ?? ""} />
            <AvatarFallback>
              {`${user.firstName?.[0] ?? ""}${
                user.lastName?.[0] ?? ""
              }`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {parseRoleToClient(membership.role, t)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mt-2 ml-1 mb-1 text-[10px] text-muted-foreground uppercase font-bold">
            {t("profile")}
          </p>
          {UserNavLinks(t).map((link, i) => (
            <DropdownMenuItem key={i} className="!p-0">
              <Link href={link.href} className="w-full h-full px-2 py-1.5">
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mt-2 ml-1 mb-1 text-[10px] text-muted-foreground uppercase font-bold">
            {t("Theme.title")}
          </p>
          {["light", "dark"].map((theme, i) => {
            const isCurrentTheme = theme === currentTheme;

            return (
              <DropdownMenuItem key={i} className="!p-0 overflow-hidden">
                <div
                  className={cn(
                    "cursor-pointer flex items-center gap-2 w-full h-full px-2 py-1.5",
                    {
                      "bg-accent": isCurrentTheme,
                    },
                  )}
                  onClick={() => {
                    if (isCurrentTheme) return;

                    setTheme(theme);
                  }}
                >
                  {theme === "dark" ? (
                    <MoonStar size={16} />
                  ) : (
                    <Sun size={16} />
                  )}
                  {t(`Theme.${theme}`)}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <p className="mt-2 ml-1 mb-1 text-[10px] uppercase font-bold text-muted-foreground">
            {t("Langs.title")}
          </p>
          {locales.map((locale, i) => {
            const isCurrentLocale = locale === currentLocale;

            const icons = {
              fr: frIcon,
              en: enIcon,
            };

            const visibleName = t(`Langs.${locale}`);

            return (
              <DropdownMenuItem key={i} className="!p-0 overflow-hidden">
                <div
                  className={cn(
                    "cursor-pointer flex items-center gap-2 w-full h-full px-2 py-1.5",
                    {
                      "bg-accent": isCurrentLocale,
                    },
                  )}
                  onClick={() => {
                    if (isCurrentLocale) return;

                    Cookie.set("NEXT_LOCALE", locale);
                    setTimeout(() => {
                      router.refresh();
                    }, 100);
                  }}
                >
                  <Image
                    src={icons[locale as keyof typeof icons]}
                    alt={visibleName}
                    height={18}
                    width={18}
                    loading="lazy"
                  />
                  {visibleName}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton signOutCallback={() => router.push("/")}>
          <DropdownMenuItem className="font-semibold cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/20 focus:text-destructive focus:bg-destructive/20">
            {t("logout")}
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
