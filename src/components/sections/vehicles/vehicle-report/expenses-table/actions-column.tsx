'use client';

import Link from 'next/link';
import { Eye, MoreHorizontal, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ActionsColumnComponentType } from '@/components/organisms/data-table/types';

import { vehicleExpenseSchema, type VehicleExpense } from './schema';

const ActionsColumn: ActionsColumnComponentType<VehicleExpense> = ({ row }) => {
  const t = useTranslations('Dashboard.Dossier.Tables.StudentPayments.Actions');

  const vehicleExpense = vehicleExpenseSchema.parse(row.original);

  return (
    <DropdownMenu>
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
            href={`/dash/admin/payments?paymentId=${vehicleExpense.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t('view')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-sm font-medium text-muted-foreground/90"
          onClick={() => console.log('editing', vehicleExpense.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t('edit')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
