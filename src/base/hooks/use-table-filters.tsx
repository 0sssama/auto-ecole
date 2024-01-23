'use client';

import { useState } from 'react';

import type { TableFilters } from '@/components/organisms/data-table/types';

export const useTableFilters = (initialState?: TableFilters['get']): TableFilters => {
  const [filters, setFilters] = useState(
    initialState ?? {
      search: '',
      licenseFileStatus: [],
    },
  );

  return {
    get: {
      search: filters.search,
      licenseFileStatus: filters.licenseFileStatus,
    },

    set: {
      search: (value) =>
        setFilters((prev) => {
          return { ...prev, search: value };
        }),
      licenseFileStatus: (value) =>
        setFilters((prev) => {
          return { ...prev, licenseFileStatus: [...prev.licenseFileStatus, value] };
        }),
    },
    helpers: {
      resetSearch: () =>
        setFilters((prev) => {
          return { ...prev, search: '' };
        }),
      deleteLicenseFilesStatus: (value: string) => {
        setFilters((prev) => {
          return { ...prev, licenseFileStatus: prev.licenseFileStatus.filter((item) => item !== value) };
        });
      },
      resetAll: () => {
        setFilters({ search: '', licenseFileStatus: [] });
      },
      resetLicenseFileStatus: () => {
        setFilters((prev) => {
          return { ...prev, licenseFileStatus: [] };
        });
      },
    },
  };
};
