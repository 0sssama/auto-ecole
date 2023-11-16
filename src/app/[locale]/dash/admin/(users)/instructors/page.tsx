import { getInstructor } from "@/server/utils/getInstructor";
import InstructorsPage from "./_components/instructors";
import InstructorNotFound from "./_components/not-found";
import Instructor from "@/components/sections/instructor-file";

export default async function Instructors({
  searchParams: { instructorId },
}: {
  searchParams: {
    instructorId: string | undefined;
  };
}) {
  if (instructorId === undefined) return <InstructorsPage />;

  const id = Number(instructorId);

  if (isNaN(id) || id <= 0) return <InstructorNotFound />;

  const instructor = await getInstructor(id);

  if (!instructor) return <InstructorNotFound />;

  return <Instructor instructor={instructor} />;
}
