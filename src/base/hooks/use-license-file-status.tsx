'use client';

import { useState } from 'react';

import type { TableStatus } from '@/components/organisms/data-table/types';

export const useTableStatus = (initialState?: TableStatus['get']): TableStatus => {
  const [status, setStatus] = useState(
    initialState ?? {
      status: [],
    },
  );

  return {
    get: status,
    set: {
      status: (value: string) => {
        setStatus((prev) => {
          return { ...prev, status: [...prev.status, value] };
        });
      },
    },
    delete: {
      status: (value: string) => {
        setStatus((prev) => {
          return { ...prev, status: prev.status.filter((item) => item !== value) };
        });
      },
    },
    helpers: {
      resetAll: () => {
        setStatus({ status: [] });
      },
    },
  };
};
