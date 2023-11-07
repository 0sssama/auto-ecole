import { LicenseFileStatus } from "@prisma/client";

export const getUserStatusFromLicenseFiles = (
  licenseFiles: { status: LicenseFileStatus }[],
): "active" | "rejected" | "finished" | "not-started" => {
  const statuses = licenseFiles.map((licenseFile) => licenseFile.status);

  if (statuses.includes("ONGOING")) return "active";

  if (statuses.includes("VALIDATED")) return "finished";

  if (statuses.includes("REJECTED")) return "rejected";

  return "not-started";
};
