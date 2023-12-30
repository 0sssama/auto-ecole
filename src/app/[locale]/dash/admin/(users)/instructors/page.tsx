import { getTranslations } from 'next-intl/server';

import { getInstructor } from '@/server/utils/instructors/get-instructor';
import { InstructorFile } from '@/components/sections/instructors';
import type { Locale } from '@/lib/locales';

import InstructorsPage from './_components/instructors';
import InstructorNotFound from './_components/not-found';

export default async function Instructors({
  searchParams: { instructorId },
}: {
  searchParams: {
    instructorId: string | undefined;
  };
}) {
  if (instructorId === undefined) return <InstructorsPage />;

  const id = Number(instructorId);

  if (Number.isNaN(id) || id <= 0) return <InstructorNotFound />;

  const instructor = await getInstructor(id);

  if (!instructor) return <InstructorNotFound />;

  return <InstructorFile instructor={instructor} />;
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
    namespace: 'Dashboard.Users.Instructors.Header',
  });

  return {
    title: `${t('title')} / Dashboard`,
  };
}
