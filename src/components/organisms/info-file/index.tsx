import DossierInfo from "@/components/molecules/dossier-info";

import type { InfoFileProps } from "./types";
import { ProfileImageColumn } from "@/components/molecules";
import { cn } from "@/lib/cn";

const translatePrefix = (type: InfoFileProps["type"]) => {
  switch (type) {
    case "instructor":
      return "Instructor";
    case "student":
      return "Student";
    case "licenseFile":
      return "LicenseFile";
    default:
      return "";
  }
};

export default function InfoFile({ data, type }: InfoFileProps) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 gap-8",
        type !== "licenseFile" ? "md:grid-cols-[200px_1fr]" : "md:grid-cols-1",
      )}
    >
      {type !== "licenseFile" && (
        <ProfileImageColumn
          profilePictureUrl={data.profilePictureUrl}
          fullName={data.info.fullName}
          type={type}
        />
      )}
      <div
        className={cn(
          "grid w-full grid-cols-1 gap-6",
          type === "licenseFile" ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
        style={{
          gridTemplateRows: "auto 1fr",
        }}
      >
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
