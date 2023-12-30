'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

import { AddExamModal } from '@/components/molecules';
import { DataTable } from '@/components/organisms';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useTableFilters } from '@/lib/hooks/use-table-filters';
import { useModal } from '@/lib/hooks/use-modal';
import { api } from '@/utils/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { LicenseFileExam } from './schema';
import type { LicenseFileExamsTableComponentType } from './types';

const LicenseFileExamsTable: LicenseFileExamsTableComponentType = ({ licenseFileId }) => {
  const addExamModal = useModal();

  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.exams.query.listByLicenseFileId.useQuery<Paginated<LicenseFileExam>>({
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
          <Button onClick={addExamModal.open}>
            <Plus size={18} />
            <span className="ml-2 hidden whitespace-nowrap lg:block">{t('add-button')}</span>
          </Button>
        </div>
      </div>
      <AddExamModal {...addExamModal} context={{ licenseFileId }} />
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

export default LicenseFileExamsTable;
