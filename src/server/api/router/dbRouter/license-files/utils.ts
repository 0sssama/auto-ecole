import { TableFilters } from "@/components/organisms/data-table/types";
import { Prisma } from "@prisma/client";

export const getWhereObjFromFilters = (
  filters: TableFilters["get"],
): Prisma.LicenseFileWhereInput => {
  void filters;

  let output: Prisma.LicenseFileWhereInput["OR"] = [];

  // if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
