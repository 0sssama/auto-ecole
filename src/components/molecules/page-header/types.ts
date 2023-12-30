import type { FC } from 'react';

import type { TranslationFunction } from '@/base/types';

interface PageHeaderProps {
  openModal?: () => void;
  href?: string;
  t: TranslationFunction;
}

export type PageHeaderComponentType = FC<PageHeaderProps>;
