"use client";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Dashboard.404");

  return (
    <main className="flex items-center justify-center min-h-[400px] gap-4 p-12 md:p-24">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-3xl font-bold text-center lg:text-4xl">404</h1>
        <p className="text-sm font-semibold text-center lg:text-sm text-muted-foreground">
          {t("page-not-found")}
        </p>
      </div>
    </main>
  );
}
