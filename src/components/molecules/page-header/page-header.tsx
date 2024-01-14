'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/atoms/link';
import { PageContentHeader } from '@/components/molecules/page-content-header';

import type { PageHeaderComponentType } from './page-header.types';

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
