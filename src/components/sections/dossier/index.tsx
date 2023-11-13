import { FolderNotFound } from "@/components/pages";
import { getStudentFolder } from "@/server/utils/getStudentFolder";
import InfoImageRow from "./info-image-row";
import StudentLicenseFilesTable from "./license-file-table";
import { Separator } from "@/components/ui/separator";

export default async function Dossier({ studentId }: { studentId: number }) {
  const student = await getStudentFolder(studentId);

  if (!student) return <FolderNotFound />;

  return (
    <div className="flex flex-col">
      <InfoImageRow student={student} />
      <Separator className="mb-6 mt-14" />
      <StudentLicenseFilesTable studentId={student.id} />
      <Separator className="mb-6 mt-14" />
      {/* <StudentLessonsTable /> */}
      {/* <StudentPaymentsTable /> */}
    </div>
  );
}
