'use client';

import { Plus } from 'lucide-react';

import { PageContentHeader } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/atoms';

import type { PageHeaderComponentType } from './types';

const PageHeader: PageHeaderComponentType = ({ openModal, href, t }) => (
  <PageContentHeader title={t('title')}>
    {(openModal || href) && (
      <div className="flex items-center">
        <Link href={href}>
          <Button onClick={openModal}>
            <Plus size={18} />
            <span className="ml-2 hidden lg:block">{t('button')}</span>
          </Button>
        </Link>
      </div>
    )}
  </PageContentHeader>
);

export default PageHeader;
