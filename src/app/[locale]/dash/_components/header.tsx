"use client";

import { useTranslations } from "next-intl";
import { HelpButton, Logo, UserOrgAvatar } from "@/components/atoms";
import { cn } from "@/lib/cn";
import { useScroll } from "@/lib/hooks/useScroll";
import { useMenu } from "@/lib/hooks/useMenu";
import { UserNav } from "./user-nav";
import HamburgerButton from "./hamburger-button";

export default function Header() {
  const t = useTranslations("Dashboard.Header");

  const { isOpen } = useMenu();

  const { scrolled } = useScroll({ threshold: 50 });

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-[10] w-full flex items-center justify-center backdrop-blur backdrop-saturate-150 transition-all border-b px-8 py-8 bg-white/70",
        scrolled && "py-5",
        isOpen && "border-transparent",
      )}
    >
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <div className="flex items-center gap-3 lg:gap-5">
          <Logo size={scrolled ? "sm" : "md"} />
          <span className="text-2xl font-thin leading-none text-gray-800">
            /
          </span>
          <UserOrgAvatar />
        </div>
        <div className="flex items-center justify-end gap-3 lg:gap-5">
          <HelpButton>{t("help")}</HelpButton>
          <UserNav />
          <HamburgerButton className="lg:hidden" />
        </div>
      </div>
    </div>
  );
}
