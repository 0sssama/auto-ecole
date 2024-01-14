import { ExamStatus, ExamType } from '@prisma/client';

import type { TranslationFunction } from '@/base/types';

export const addExamFields = (t: TranslationFunction) => [
  {
    name: 'type',
    label: t('Type.label'),
    placeholder: t('Type.placeholder'),
    emptyMessage: t('Type.empty'),
    options: Object.keys(ExamType).map((key) => {
      return {
        value: key,
        label: t('Type.' + key),
      };
    }),
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '09/11/2002',
  },
  {
    name: 'status',
    label: t('Status.label'),
    placeholder: t('Status.placeholder'),
    emptyMessage: t('Status.empty'),
    options: Object.keys(ExamStatus).map((key) => {
      return {
        value: key,
        label: t('Status.' + key),
      };
    }),
  },
];
