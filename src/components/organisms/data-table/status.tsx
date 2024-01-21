'use client';

import { useTranslations } from 'next-intl';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { DataTableStatusComponentProps } from './types';

const DataTableStatus: React.FC<DataTableStatusComponentProps> = ({ status }) => {
  const t = useTranslations('Dashboard.Tables');
  if (status === undefined) return null;

  const handleCheckChange = (isChecked: boolean, item: string) => {
    if (isChecked) status.set.status(item);
    else status.delete.status(item);
  };

  const items = [
    { status: t('Status.active'), value: 'Active' },
    { status: t('Status.rejected'), value: 'Rejected' },
    { status: t('Status.finished'), value: 'Finished' },
    { status: t('Status.undeposited'), value: 'Undeposited' },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-3">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('filter')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className="capitalize"
            checked={status.get.status.includes(item.value)}
            onCheckedChange={(value) => handleCheckChange(value, item.value)}
          >
            {item.status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableStatus;
