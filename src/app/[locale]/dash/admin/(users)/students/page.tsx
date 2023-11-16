import { getStudentFolder } from "@/server/utils/getStudentFolder";
import { StudentFile } from "@/components/sections";

import StudentsPage from "./_components/students";
import StudentNotFound from "./_components/not-found";

export default async function Students({
  searchParams: { studentId },
}: {
  searchParams: {
    studentId: string | undefined;
  };
}) {
  if (studentId === undefined) return <StudentsPage />;

  const id = Number(studentId);

  if (isNaN(id) || id <= 0) return <StudentNotFound />;

  const student = await getStudentFolder(id);

  if (!student) return <StudentNotFound />;

  return <StudentFile student={student} />;
}