import { Prisma } from "@prisma/client";

import { TableFilters } from "@/components/organisms/data-table/types";

export const getWhereObjFromFilters = (
  filters: TableFilters["get"],
): Prisma.PaymentWhereInput => {
  void filters;

  let output: Prisma.PaymentWhereInput["OR"] = [];

  // if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
