import { FolderNotFound } from "@/components/pages";
import { getStudentFolder } from "@/server/utils/getStudentFolder";

export default async function Dossier({ studentId }: { studentId: number }) {
  const student = await getStudentFolder(studentId);

  if (!student) return <FolderNotFound />;

  return <div className="w-full">{student.name}</div>;
}
