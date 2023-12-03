import { getTranslations } from "next-intl/server";

import { getLicenseFile } from "@/server/utils/license-files/getLicenseFile";
import { LicenseFile } from "@/components/sections/license-files";
import type { Locale } from "@/lib/locales";

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

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) {
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.Files.LicenseFiles.Header",
  });

  return {
    title: `${t("title")} / Dashboard`,
  };
}
