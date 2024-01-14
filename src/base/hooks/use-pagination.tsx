'use client';

import { useState } from 'react';

import type { TablePagination } from '@/components/organisms/data-table/data-table.types';

type StateType = TablePagination['get'];

export const usePagination = (initialState?: StateType): TablePagination => {
  const [pagination, setPagination] = useState<StateType>(
    initialState ?? {
      pageIndex: 0,
      pageSize: 10,
      pageCount: 0,
    },
  );

  return {
    get: pagination,
    set: {
      pageIndex: (pageIndex: number) => {
        setPagination((prev: StateType) => {
          return { ...prev, pageIndex };
        });
      },
      pageSize: (pageSize: number) => {
        setPagination((prev: StateType) => {
          return {
            ...prev,
            pageSize,
            pageIndex: 0,
          };
        });
      },
      pageCount: (pageCount: number) => {
        setPagination((prev: StateType) => {
          return { ...prev, pageCount };
        });
      },
      pagination: (pagination: Omit<StateType, 'pageCount'>) => {
        setPagination((prev: StateType) => {
          return { ...prev, ...pagination };
        });
      },
    },
    helpers: {
      previousPage: () =>
        pagination.pageIndex > 0 &&
        setPagination((prev: StateType) => {
          return {
            ...prev,
            pageIndex: prev.pageIndex - 1,
          };
        }),
      nextPage: () =>
        pagination.pageIndex < pagination.pageCount - 1 &&
        setPagination((prev: StateType) => {
          return {
            ...prev,
            pageIndex: prev.pageIndex + 1,
          };
        }),
      canGetPreviousPage: () => pagination.pageIndex > 0,
      canGetNextPage: () => pagination.pageIndex < pagination.pageCount - 1,
    },
  };
};
