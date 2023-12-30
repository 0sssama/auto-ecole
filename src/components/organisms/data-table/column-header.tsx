'use client';

import { useTranslations } from 'next-intl';
import { ArrowDownAZ, ArrowUpZA, ChevronsDownUp, EyeOff } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/base/utils/client/cn';

import type { DataTableColumnHeaderProps } from './types';

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const t = useTranslations('Dashboard.Tables.Header');

  if (!column.getCanSort()) return <div className={cn(className)}>{t(title)}</div>;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 !text-left data-[state=open]:bg-accent">
            <span>{t(title)}</span>
            {column.getIsSorted() === 'desc' && <ArrowDownAZ className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'asc' && <ArrowUpZA className="ml-2 h-4 w-4" />}
            {!column.getIsSorted() && <ChevronsDownUp className="ml-2 h-3 w-3" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <ArrowUpZA className="mr-2 h-3.5 w-3.5" />
            {t('asc')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <ArrowDownAZ className="mr-2 h-3.5 w-3.5" />
            {t('desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="text-sm font-medium text-muted-foreground/90"
          >
            <EyeOff className="mr-2 h-3.5 w-3.5" />
            {t('hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
