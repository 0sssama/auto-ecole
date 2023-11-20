import { getLicenseFile } from "@/server/utils/license-files/getLicenseFile";
import { LicenseFile } from "@/components/sections/license-files";
import LicenseFilesPage from "./_components/license-files";
import LicenseFileNotFound from "./_components/not-found";

export default async function LicenseFiles({
  searchParams: { licenseFileId },
}: {
  searchParams: {
    licenseFileId: string | undefined;
  };
}) {
  if (licenseFileId === undefined) return <LicenseFilesPage />;

  const id = Number(licenseFileId);

  if (isNaN(id) || id <= 0) return <LicenseFileNotFound />;

  const licenseFile = await getLicenseFile(id);

  if (!licenseFile) return <LicenseFileNotFound />;

  return <LicenseFile licenseFile={licenseFile} />;
}
