import type { Prisma } from "@prisma/client";

import type { TableFilters } from "@/components/organisms/data-table/types";

export const getWhereObjFromFilters = (
  filters: TableFilters["get"],
): Prisma.ExamWhereInput => {
  void filters;

  let output: Prisma.ExamWhereInput["OR"] = [];

  // if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
