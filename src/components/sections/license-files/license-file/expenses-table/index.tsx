'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

import { useModal } from '@/base/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/organisms';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import { api } from '@/base/utils/server/api';
import { AddLicenseFileExpenseModal } from '@/components/molecules';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { LicenseFileExpense } from './schema';
import type { LicenseFileExpensesTableComponentType } from './types';

const LicenseFileExpensesTable: LicenseFileExpensesTableComponentType = ({ context: { licenseFileId } }) => {
  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExpenses');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const addExpenseModal = useModal();

  const { data, isLoading, error } = api.db.expenses.query.listByLicenseFileId.useQuery<Paginated<LicenseFileExpense>>({
    licenseFileId,
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <AddLicenseFileExpenseModal {...addExpenseModal} context={{ licenseFileId }} />
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="mb-4 w-full text-2xl font-bold">{t('title')}</h1>
        <div>
          <Button onClick={addExpenseModal.open}>
            <Plus size={18} />
            <span className="ml-2 hidden whitespace-nowrap lg:block">{t('add-button')}</span>
          </Button>
        </div>
      </div>
      <DataTable
        data={data}
        error={error?.message}
        isLoading={isLoading}
        columns={columns}
        pagination={pagination}
        filters={filters}
      />
    </div>
  );
};

export default LicenseFileExpensesTable;
