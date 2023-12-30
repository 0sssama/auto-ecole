'use client';

import { Plus } from 'lucide-react';

import { PageContentHeader } from '@/components/molecules';
import { Button } from '@/components/ui/button';

import type { PageHeaderComponentType } from './types';

const PageHeader: PageHeaderComponentType = ({ openModal, t }) => (
  <PageContentHeader title={t('title')}>
    <div className="flex items-center">
      <Button onClick={openModal}>
        <Plus size={18} />
        <span className="ml-2 hidden lg:block">{t('button')}</span>
      </Button>
    </div>
  </PageContentHeader>
);

export default PageHeader;
