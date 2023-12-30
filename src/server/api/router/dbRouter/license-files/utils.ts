import type { Prisma } from '@prisma/client';

import type { TableFilters } from '@/components/organisms/data-table/types';

export const getWhereObjFromFilters = (filters: TableFilters['get']): Prisma.LicenseFileWhereInput => {
  void filters;

  const output: Prisma.LicenseFileWhereInput['OR'] = [];

  //   if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
