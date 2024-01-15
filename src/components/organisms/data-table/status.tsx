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

  const items = ['Active', 'Undeposited', 'Rejected', 'Finished'];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-3">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('status')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            className="capitalize"
            checked={status.get.status.includes(item)}
            onCheckedChange={(value) => handleCheckChange(value, item)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableStatus;
