import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'sum',
    label: t('sum'),
    placeholder: '1200',
  },
  {
    name: 'comment',
    label: t('comment'),
    placeholder: 'Avance de 1200 DH pour le permis de conduire',
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '2021-07-13',
  },
];
