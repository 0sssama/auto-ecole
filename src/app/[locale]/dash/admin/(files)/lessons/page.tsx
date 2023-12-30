import { getTranslations } from 'next-intl/server';

// import { getLesson } from "@/server/utils/lessons/getLesson";
// import { Lesson } from "@/components/sections/lessons";
import type { Locale } from '@/lib/locales';

import LessonsPage from './_components/lessons';
import LessonNotFound from './_components/not-found';

export default async function Lessons({
  searchParams: { lessonId },
}: {
  searchParams: {
    lessonId: string | undefined;
  };
}) {
  if (lessonId === undefined) return <LessonsPage />;

  const id = Number(lessonId);

  if (Number.isNaN(id) || id <= 0) return <LessonNotFound />;

  //   const lesson = await getLesson(id);

  //   if (!lesson) return <LicenseFileNotFound />;

  //   return <LicenseFile lesson={lesson} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) {
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard.Files.Lessons.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
