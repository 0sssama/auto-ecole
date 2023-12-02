"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Landing");

  return (
    <main className="relative flex items-center justify-center min-h-screen gap-2 p-8 lg:gap-4 lg:p-24">
      <Link className="absolute inset-0 z-[3]" href="/dash" />
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-3xl font-bold text-center lg:text-4xl">
          {t("title")}
        </h1>
        <p className="text-sm font-semibold text-center lg:text-sm text-slate-500">
          {t("subtitle")}
        </p>
      </div>
    </main>
  );
}
