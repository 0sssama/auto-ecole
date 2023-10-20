"use client";

import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function Home() {
  const t = useTranslations("Dashboard");

  redirect("/dash/clients");
  return (
    <main>
      <div className="w-full">
        <p>{t("redirecting")}</p>
      </div>
    </main>
  );
}
