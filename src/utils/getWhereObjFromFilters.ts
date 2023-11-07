import { TableFilters } from "@/components/organisms/data-table/types";
import { Prisma } from "@prisma/client";

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
