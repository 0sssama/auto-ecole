'use client';

import isSameDay from 'date-fns/isSameDay';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
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
import type { ActionsColumnComponentType } from '@/components/organisms/data-table/data-table.types';
import { useModal } from '@/base/hooks/use-modal';
import { DeleteExpenseModal } from '@/components/molecules/modal/expenses/delete';

import { licenseFileExpenseSchema, type LicenseFileExpense } from './schema';

const ActionsColumn: ActionsColumnComponentType<LicenseFileExpense> = ({ row }) => {
  const t = useTranslations('Dashboard.Files.LicenseFiles.FilePage.LicenseFileExpenses.Actions');

  const deleteExpenseModal = useModal();

  const licenseFileExpense = licenseFileExpenseSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DeleteExpenseModal {...deleteExpenseModal} context={{ expenseId: licenseFileExpense.id }} />
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{t('open-menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer text-sm font-medium text-muted-foreground/90">
          <Link
            className="flex h-full w-full items-center"
            href={`/dash/admin/expenses?expenseId=${licenseFileExpense.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t('view')}
          </Link>
        </DropdownMenuItem>
        {isSameDay(new Date(), licenseFileExpense.date) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer bg-destructive/10 text-sm font-medium text-destructive/90 hover:!bg-destructive/20 hover:!text-destructive/100"
              onClick={() => {
                if (deleteExpenseModal.isOpen) return;

                deleteExpenseModal.open();
              }}
              disabled={deleteExpenseModal.isOpen}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              {t('delete')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
