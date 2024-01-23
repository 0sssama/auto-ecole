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

import type { DataTableStatusComponentType } from './types';

const DataTableStatus: DataTableStatusComponentType = ({ filters }) => {
  const t = useTranslations('Dashboard.Tables');
  if (filters.get.licenseFileStatus === undefined) return null;

  const handleCheckChange = (isChecked: boolean, item: string) => {
    if (isChecked) filters.set.licenseFileStatus(item);
    else filters.helpers.deleteLicenseFilesStatus(item);
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
            checked={filters.get.licenseFileStatus.includes(item.value)}
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
