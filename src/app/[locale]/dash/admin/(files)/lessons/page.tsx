// import { getLesson } from "@/server/utils/lessons/getLesson";
// import { Lesson } from "@/components/sections/lessons";
import LessonsPage from "./_components/lessons";
import LessonNotFound from "./_components/not-found";

export default async function Lessons({
  searchParams: { lessonId },
}: {
  searchParams: {
    lessonId: string | undefined;
  };
}) {
  if (lessonId === undefined) return <LessonsPage />;

  const id = Number(lessonId);

  if (isNaN(id) || id <= 0) return <LessonNotFound />;

  //   const lesson = await getLesson(id);

  //   if (!lesson) return <LicenseFileNotFound />;

  //   return <LicenseFile lesson={lesson} />;
}