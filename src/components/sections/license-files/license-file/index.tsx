import { Separator } from "@/components/ui/separator";
import { FetchedLicenseFile } from "./types";
import LicenseFileExamsTable from "./exams-table";

export default function LicenseFile({
  licenseFile,
}: {
  licenseFile: FetchedLicenseFile;
}) {
  return (
    <div className="flex flex-col">
      {/* <InfoFile data={licenseFile} type="licenseFile" /> */}
      <Separator className="mb-6 mt-14" />
      <LicenseFileExamsTable licenseFileId={licenseFile.id} />
      {/* <Separator className="mb-6 mt-14" />
      <LicenseFileLessonsTable licenseFileId={licenseFile.id} />
      <Separator className="mb-6 mt-14" />
      <LicenseFilePaymentsTable licenseFileId={licenseFile.id} /> */}
    </div>
  );
}
