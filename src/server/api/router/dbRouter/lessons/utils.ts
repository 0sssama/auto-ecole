import { TableFilters } from "@/components/organisms/data-table/types";
import { Prisma } from "@prisma/client";

export const getWhereObjFromFilters = (
  filters: TableFilters["get"],
): Prisma.LessonWhereInput => {
  void filters;

  let output: Prisma.LessonWhereInput["OR"] = [];

  // if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};