import DossierInfo from "@/components/molecules/dossier-info";

import type { InfoFileProps } from "./types";
import { ProfileImageColumn } from "@/components/molecules";

const translatePrefix = (type: InfoFileProps["type"]) => {
  switch (type) {
    case "instructor":
      return "Instructor";
    case "student":
      return "Student";
    default:
      return "";
  }
};

export default function InfoFile({ data, type }: InfoFileProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
      <ProfileImageColumn
        profilePictureUrl={data.profilePictureUrl}
        fullName={data.info.fullName}
        type={type}
      />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {Object.keys(data.info).map((key) => (
          <DossierInfo
            key={key}
            labelId={key}
            translatePrefix={translatePrefix(type)}
            value={data.info[key as keyof typeof data.info]}
          />
        ))}
      </div>
    </div>
  );
}
