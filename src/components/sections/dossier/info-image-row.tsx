import DossierInfo from "@/components/molecules/dossier-info";
import ProfileImageColumn from "./profile-image-column";

import type { InfoImageRowProps } from "./types";

export default function InfoImageRow({ student }: InfoImageRowProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
      <ProfileImageColumn
        profilePictureUrl={student.profilePictureUrl}
        studentName={student.info.nameFr}
      />
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
  );
}
