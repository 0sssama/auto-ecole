'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/organisms';
import { AddLicenseFileLessonModal } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useTableFilters } from '@/lib/hooks/use-table-filters';
import { useModal } from '@/lib/hooks/use-modal';
import { api } from '@/utils/api';
import type { Paginated } from '@/components/organisms/data-table/types';

import { columns } from './columns';
import type { LicenseFileLesson } from './schema';
import type { LicenseFileLessonsTableComponentType } from './types';

const LicenseFileLessonsTable: LicenseFileLessonsTableComponentType = ({
  context: { licenseFileId, studentId, instructorId },
}) => {
  const addLessonModal = useModal();

  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileLessons');

  const pagination = usePagination({
    pageIndex: 0,
    pageSize: 2,
    pageCount: 0,
  });

  const filters = useTableFilters();

  const { data, isLoading, error } = api.db.lessons.query.listByLicenseFileId.useQuery<Paginated<LicenseFileLesson>>({
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
          <Button onClick={addLessonModal.open}>
            <Plus size={18} />
            <span className="ml-2 hidden whitespace-nowrap lg:block">{t('add-button')}</span>
          </Button>
        </div>
      </div>
      <AddLicenseFileLessonModal
        {...addLessonModal}
        context={{
          licenseFileId,
          studentId,
          instructorId,
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

export default LicenseFileLessonsTable;
