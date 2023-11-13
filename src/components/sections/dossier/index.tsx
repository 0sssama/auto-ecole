import DossierInfo from "@/components/molecules/dossier-info";
import { FolderNotFound } from "@/components/pages";
import { Button } from "@/components/ui/button";
import { getStudentFolder } from "@/server/utils/getStudentFolder";
import { UploadCloud, UserCircle2 } from "lucide-react";
import Image from "next/image";

export default async function Dossier({ studentId }: { studentId: number }) {
  const student = await getStudentFolder(studentId);

  if (!student) return <FolderNotFound />;

  return (
    <div className="">
      <div className="w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-full aspect-square">
            {student.profilePictureUrl ? (
              <Image
                src={student.profilePictureUrl}
                alt={student.info.nameFr}
              />
            ) : (
              <UserCircle2
                className="text-gray-400"
                size={32}
                fontWeight={200}
              />
            )}
          </div>
          <Button className="w-full" variant="outline">
            <UploadCloud size={16} className="mr-2" />
            Upload New Picture
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {Object.keys(student.info).map((key) => (
            <DossierInfo
              key={key}
              labelId={key}
              value={student.info[key as keyof typeof student.info]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
