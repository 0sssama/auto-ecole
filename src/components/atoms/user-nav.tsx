"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { OrganizationMembershipRole } from "@clerk/nextjs/dist/types/server";

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
import type { TranslationFunction } from "@/types";

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
  role: OrganizationMembershipRole,
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
  const t = useTranslations("Dashboard.UserNav");

  const router = useRouter();

  const { user } = useUser();

  if (!user) return null;

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
              {parseRoleToClient(user.organizationMemberships?.[0]?.role, t)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {UserNavLinks(t).map((link, i) => (
            <DropdownMenuItem key={i} className="!p-0">
              <Link href={link.href} className="w-full h-full px-2 py-1.5">
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton signOutCallback={() => router.push("/")}>
          <DropdownMenuItem className="font-semibold cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/20 focus:text-destructive focus:bg-destructive/20">
            Log out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
