'use client';

import { useTranslations } from 'next-intl';

import { DataTable } from '@/components/organisms';
import { usePagination } from '@/base/hooks/use-pagination';
import { useTableFilters } from '@/base/hooks/use-table-filters';
import { api } from '@/base/utils/server/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { StudentPayment } from './schema';
import type { StudentPaymentsTableComponentType } from './types';

const StudentPaymentsTable: StudentPaymentsTableComponentType = ({ studentId }) => {
  const t = useTranslations('Dashboard.Dossier.Tables.StudentPayments');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.payments.query.listByStudentId.useQuery<Paginated<StudentPayment>>({
    studentId,
    pageIndex: pagination.get.pageIndex,
    pageSize: pagination.get.pageSize,
    filters: filters.get,
  });

  return (
    <div className="w-full">
      <h1 className="mb-4 w-full text-2xl font-bold">{t('title')}</h1>
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

export default StudentPaymentsTable;
