import DossierInfo from "@/components/molecules/dossier-info";
import { FolderNotFound } from "@/components/pages";
import { getStudentFolder } from "@/server/utils/getStudentFolder";

export default async function Dossier({ studentId }: { studentId: number }) {
  const student = await getStudentFolder(studentId);

  if (!student) return <FolderNotFound />;

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
      {Object.keys(student).map((key) => (
        <DossierInfo
          key={key}
          labelId={key}
          value={student[key as keyof typeof student]}
        />
      ))}
    </div>
  );
}
