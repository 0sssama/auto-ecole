import { Prisma, LicenseFileStatus } from "@prisma/client";

import { TableFilters } from "@/components/organisms/data-table/types";

const searchFilters = (
  search: TableFilters["get"]["search"],
): Prisma.CustomerWhereInput[] => {
  const searchableFields: (keyof Prisma.CustomerWhereInput)[] = [
    "firstNameAr",
    "firstNameFr",
    "lastNameAr",
    "lastNameFr",
    "email",
    "phone",
    "cin",
    "professionAr",
    "professionFr",
    "addressAr",
    "addressFr",
  ];

  return searchableFields.map((field) => ({
    [field]: { contains: search },
  }));
};

export const getWhereObjFromFilters = (
  filters: TableFilters["get"],
): Prisma.CustomerWhereInput => {
  let output: Prisma.CustomerWhereInput["OR"] = [];

  if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};

export const getUserStatusFromLicenseFiles = (
  licenseFiles: { status: LicenseFileStatus }[],
): "active" | "rejected" | "finished" | "not-started" => {
  const statuses = licenseFiles.map((licenseFile) => licenseFile.status);

  if (statuses.includes("ONGOING")) return "active";

  if (statuses.includes("VALIDATED")) return "finished";

  if (statuses.includes("REJECTED")) return "rejected";

  return "not-started";
};
