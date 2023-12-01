import { useTranslations } from "next-intl";

export default function LessonNotFound() {
  const t = useTranslations("Dashboard.Files.Exams.NotFound");

  return (
    <main className="flex items-center justify-center min-h-[400px] gap-4 p-12 md:p-24">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-4xl font-semibold text-center">{t("title")}</h1>
        <p className="text-sm font-semibold text-center text-slate-500">
          {t("subtitle")}
        </p>
      </div>
    </main>
  );
}
