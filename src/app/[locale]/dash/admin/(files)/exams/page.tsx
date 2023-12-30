import { getTranslations } from 'next-intl/server';

// import { getExam } from "@/server/utils/exams/getExam";
// import { Lesson } from "@/components/sections/exams";
import type { Locale } from '@/base/data/locales';

import ExamsPage from './_components/exams';
import ExamNotFound from './_components/not-found';

export default async function Exams({
  searchParams: { examId },
}: {
  searchParams: {
    examId: string | undefined;
  };
}) {
  if (examId === undefined) return <ExamsPage />;

  const id = Number(examId);

  if (Number.isNaN(id) || id <= 0) return <ExamNotFound />;

  //   const exam = await getExam(id);

  //   if (!exam) return <ExamNotFound />;

  //   return <Exam exam={exam} />;
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
    namespace: 'Dashboard.Files.Exams.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
