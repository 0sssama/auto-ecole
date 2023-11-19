"use client";

import { Separator } from "@/components/ui/separator";
import { InfoFile } from "@/components/organisms";

import LicenseFileExamsTable from "./exams-table";
import LicenseFileLessonsTable from "./lessons-table";

import type { FetchedLicenseFile } from "./types";

export default function LicenseFile({
  licenseFile,
}: {
  licenseFile: FetchedLicenseFile;
}) {
  const { id, ...licenseFileNoId } = licenseFile;

  return (
    <div className="flex flex-col">
      <InfoFile
        data={{
          id,
          profilePictureUrl: null,

          info: licenseFileNoId,
        }}
        type="licenseFile"
      />
      <Separator className="mb-6 mt-14" />
      <LicenseFileExamsTable licenseFileId={licenseFile.id} />
      <Separator className="mb-6 mt-14" />
      <LicenseFileLessonsTable licenseFileId={licenseFile.id} />
      {/* <Separator className="mb-6 mt-14" /> */}
      {/* <LicenseFilePaymentsTable licenseFileId={licenseFile.id} /> */}
    </div>
  );
}
