// import { getStudentFolder } from "@/server/utils/getStudentFolder";
// import { StudentFile } from "@/components/sections";

import LicenseFilesPage from "./_components/license-files";
import LicenseFileNotFound from "./_components/not-found";

// import StudentsPage from "./_components/students";
// import StudentNotFound from "./_components/not-found";

export default async function Students({
  searchParams: { licenseFileId },
}: {
  searchParams: {
    licenseFileId: string | undefined;
  };
}) {
  if (licenseFileId === undefined) return <LicenseFilesPage />;

  const id = Number(licenseFileId);

  if (isNaN(id) || id <= 0) return <LicenseFileNotFound />;

  //   const licenseFile = await getLicenseFile(id);

  //   if (!licenseFile) return <LicenseFileNotFound />;

  //   return <LicenseFilePage licenseFile={licenseFile} />;
}
