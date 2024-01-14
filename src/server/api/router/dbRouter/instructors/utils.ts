import type { Prisma } from '@prisma/client';

import type { TableFilters } from '@/components/organisms/data-table/data-table.types';

const searchFilters = (search: TableFilters['get']['search']): Prisma.InstructorWhereInput[] => {
  const searchableFields: (keyof Prisma.InstructorWhereInput)[] = ['firstName', 'lastName', 'phone'];

  return searchableFields.map((field) => {
    return {
      [field]: { contains: search },
    };
  });
};

export const getWhereObjFromFilters = (filters: TableFilters['get']): Prisma.InstructorWhereInput => {
  let output: Prisma.InstructorWhereInput['OR'] = [];

  if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};
