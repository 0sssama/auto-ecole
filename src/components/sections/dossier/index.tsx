import { FolderNotFound } from "@/components/pages";
import { getStudentFolder } from "@/server/utils/getStudentFolder";
import InfoImageRow from "./info-image-row";

export default async function Dossier({ studentId }: { studentId: number }) {
  const student = await getStudentFolder(studentId);

  if (!student) return <FolderNotFound />;

  return (
    <div className="flex flex-col">
      <InfoImageRow student={student} />
    </div>
  );
}
