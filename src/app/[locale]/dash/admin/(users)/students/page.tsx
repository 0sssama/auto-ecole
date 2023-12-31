import { getStudentFolder } from '@/base/utils/server/students/get-student-folder';
import { StudentFile } from '@/components/sections/students';

import StudentsPage from './_components/students';
import StudentNotFound from './_components/not-found';

export default async function Students({
  searchParams: { studentId },
}: {
  searchParams: {
    studentId: string | undefined;
  };
}) {
  if (studentId === undefined) return <StudentsPage />;

  const id = Number(studentId);

  if (Number.isNaN(id) || id <= 0) return <StudentNotFound />;

  const student = await getStudentFolder(id);

  if (!student) return <StudentNotFound />;

  return <StudentFile student={student} />;
}
