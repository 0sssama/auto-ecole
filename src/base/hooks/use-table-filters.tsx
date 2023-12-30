'use client';

import { useState } from 'react';

import type { TableFilters } from '@/components/organisms/data-table/types';

export const useTableFilters = (initialState?: TableFilters['get']): TableFilters => {
  const [filters, setFilters] = useState(
    initialState ?? {
      search: '',
    },
  );

  return {
    get: filters,
    set: {
      search: (value) =>
        setFilters((prev) => {
          return { ...prev, search: value };
        }),
    },
    helpers: {
      resetSearch: () =>
        setFilters((prev) => {
          return { ...prev, search: '' };
        }),
      resetAll: () => setFilters({ search: '' }),
    },
  };
};
