import type { FC } from 'react';

import type { TranslationFunction } from '@/types';

interface PageHeaderProps {
  openModal: () => void;
  t: TranslationFunction;
}

export type PageHeaderComponentType = FC<PageHeaderProps>;
