'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/organisms';
import { AddLicenseFilePaymentModal } from '@/components/molecules';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useTableFilters } from '@/lib/hooks/use-table-filters';
import { useModal } from '@/lib/hooks/use-modal';
import { api } from '@/utils/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { LicenseFilePayment } from './schema';
import type { LicenseFilePaymentsTableComponentType } from './types';

const LicenseFilePaymentsTable: LicenseFilePaymentsTableComponentType = ({ context: { licenseFileId } }) => {
  const addPaymentModal = useModal();

  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFilePayments');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.payments.query.listByLicenseFileId.useQuery<Paginated<LicenseFilePayment>>({
    licenseFileId,
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="mb-4 w-full text-2xl font-bold">{t('title')}</h1>
        <div>
          <Button onClick={addPaymentModal.open}>
            <Plus size={18} />
            <span className="ml-2 hidden whitespace-nowrap lg:block">{t('add-button')}</span>
          </Button>
        </div>
      </div>
      <AddLicenseFilePaymentModal
        {...addPaymentModal}
        context={{
          licenseFileId,
        }}
      />
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

export default LicenseFilePaymentsTable;
