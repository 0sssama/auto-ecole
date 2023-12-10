import type { Prisma, LicenseFileStatus, Category } from "@prisma/client";

import type { TableFilters } from "@/components/organisms/data-table/types";
import type { Student } from "@/components/sections/students/list-table/schema";

const searchFilters = (
  search: TableFilters["get"]["search"],
): Prisma.StudentWhereInput[] => {
  const searchableFields: (keyof Prisma.StudentWhereInput)[] = [
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
): Prisma.StudentWhereInput => {
  let output: Prisma.StudentWhereInput["OR"] = [];

  if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};

export const getStudentStatusFromLicenseFiles = (
  licenseFiles: { status: LicenseFileStatus }[],
): Student["status"] => {
  if (licenseFiles.length === 0) return "not-started";

  const statuses = licenseFiles.map((licenseFile) => licenseFile.status);

  if (statuses.includes("ONGOING")) return "active";

  if (statuses.includes("VALIDATED")) return "finished";

  if (statuses.includes("REJECTED")) return "rejected";

  return "not-started";
};

export const getStudentCategoryFromLicenseFiles = (
  licenseFiles: { status: LicenseFileStatus; category: Category }[],
): Student["category"] => {
  if (licenseFiles.length === 0) return undefined;

  const onGoingLicenseFile = licenseFiles.find(
    (licenseFile) => licenseFile.status === "ONGOING",
  );

  if (onGoingLicenseFile) return onGoingLicenseFile.category;

  const validatedLicenseFile = licenseFiles.find(
    (licenseFile) => licenseFile.status === "VALIDATED",
  );

  if (validatedLicenseFile) return validatedLicenseFile.category;

  return undefined;
};
