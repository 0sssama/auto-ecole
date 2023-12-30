'use client';

import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { DataTablePaginationComponentType } from './types';

const DataTablePagination: DataTablePaginationComponentType = ({ pagination }) => {
  const t = useTranslations('Dashboard.Tables.Pagination');

  return (
    <div className="flex items-end justify-end gap-2 px-2">
      <div className="flex w-full items-end justify-end gap-x-2 lg:gap-x-8">
        <div className="flex items-center gap-x-2 ">
          <p className="text-xs font-medium md:text-sm">{t('rows-per-page')}</p>
          <Select
            value={`${pagination.get.pageSize}`}
            onValueChange={(value) => {
              pagination.set.pageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[60px] max-w-[70px] text-xs md:text-sm">
              <SelectValue placeholder={pagination.get.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-center justify-end gap-x-2 gap-y-2 sm:!flex-row">
          <div className="flex items-center justify-end text-right text-xs font-medium md:text-sm">
            {`${t('page')} ${pagination.get.pageIndex + 1} ${t('of')} ${pagination.get.pageCount}`}
          </div>
          <div className="flex items-end gap-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => pagination.set.pageIndex(0)}
              disabled={!pagination.helpers.canGetPreviousPage()}
            >
              <span className="sr-only">{t('go-to-first-page')}</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => pagination.helpers.previousPage()}
              disabled={!pagination.helpers.canGetPreviousPage()}
            >
              <span className="sr-only">{t('go-to-previous-page')}</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => pagination.helpers.nextPage()}
              disabled={!pagination.helpers.canGetNextPage()}
            >
              <span className="sr-only">{t('go-to-next-page')}</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => pagination.set.pageIndex(pagination.get.pageCount - 1)}
              disabled={!pagination.helpers.canGetNextPage()}
            >
              <span className="sr-only">{t('go-to-last-page')}</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
