'use client';

import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/atoms/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/base/utils/client/cn';
import { useModal } from '@/base/hooks/use-modal';
import { ExamDeleteConfirmModal } from '@/components/molecules/modal/exams/delete-confirm';
import type { ActionsColumnComponentType } from '@/components/organisms/data-table/types';

import { type LicenseFileExam, licenseFileExamSchema } from './schema';

const ActionsColumn: ActionsColumnComponentType<LicenseFileExam> = ({ row }) => {
  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExams.Actions');

  const deleteExamModal = useModal();

  const exam = licenseFileExamSchema.parse(row.original);

  return (
    <DropdownMenu>
      <ExamDeleteConfirmModal {...deleteExamModal} context={{ examId: exam.id }} />
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{t('open-menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer text-sm font-medium text-muted-foreground/90">
          <Link className="flex h-full w-full items-center" href={`/dash/admin/exams?examId=${exam.id}`}>
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t('view')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-sm font-medium text-muted-foreground/90"
          onClick={() => console.log('editing', exam.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            'cursor-pointer bg-destructive/10 text-sm font-medium text-destructive/90 hover:!bg-destructive/20 hover:!text-destructive/100',
            deleteExamModal.isOpen && '!cursor-not-allowed opacity-50',
          )}
          onClick={deleteExamModal.open}
        >
          <Trash2 className="mr-2 h-3.5 w-3.5 text-destructive" />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
