import { getInstructor } from "@/server/utils/instructors/getInstructor";
import { InstructorFile } from "@/components/sections/instructors";
import InstructorsPage from "./_components/instructors";
import InstructorNotFound from "./_components/not-found";

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

  return <InstructorFile instructor={instructor} />;
}
