"use client";

import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function PageFallback() {
  const t = useTranslations("Dashboard.Error");

  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen gap-4 p-12 md:p-24">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-4xl font-semibold text-center">{t("sorry")}</h1>
        <p className="text-sm font-semibold text-center text-slate-500">
          {t("description")}
        </p>

        <SignOutButton signOutCallback={() => router.push("/")}>
          <Button variant="destructive">{t("logout")}</Button>
        </SignOutButton>
      </div>
    </main>
  );
}
