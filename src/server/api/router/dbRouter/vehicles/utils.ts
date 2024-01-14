import type { Prisma } from '@prisma/client';

import type { TableFilters } from '@/components/organisms/data-table/data-table.types';

const searchFilters = (search: TableFilters['get']['search']): Prisma.VehicleWhereInput[] => {
  const searchableFields: (keyof Prisma.VehicleWhereInput)[] = ['name', 'brand'];

  return searchableFields.map((field) => {
    return {
      [field]: { contains: search },
    };
  });
};

export const getWhereObjFromFilters = (filters: TableFilters['get']): Prisma.VehicleWhereInput => {
  void filters;

  let output: Prisma.VehicleWhereInput['OR'] = [];

  if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
