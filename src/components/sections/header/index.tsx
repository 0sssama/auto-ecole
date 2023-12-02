"use client";

import { useTranslations } from "next-intl";

import {
  HamburgerButton,
  HelpButton,
  Logo,
  UserNav,
  UserOrgAvatar,
} from "@/components/atoms";
import { cn } from "@/lib/cn";
import { useScroll } from "@/lib/hooks/useScroll";

const Header = () => {
  const t = useTranslations("Dashboard.Header");

  const { scrolled } = useScroll({ threshold: 50 });

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-[10] w-full flex items-center justify-center backdrop-blur backdrop-saturate-150 transition-all border-b px-8 py-6 bg-background/70",
        scrolled && "py-3 lg:py-5",
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
};

export default Header;
