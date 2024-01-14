import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'sum',
    label: t('sum'),
    placeholder: '500',
  },
  {
    name: 'comment',
    label: t('comment'),
    placeholder: 'Diesel fuel',
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '2021-07-13',
  },
];
