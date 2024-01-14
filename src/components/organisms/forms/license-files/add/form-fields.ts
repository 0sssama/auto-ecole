import { Category, LicenseFileStatus } from '@prisma/client';

import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'studentId',
    label: t('Student.student'),
    placeholder: t('Student.placeholder'),
    emptyMessage: t('Student.empty'),
    loadingMessage: t('Student.loading'),
  },
  {
    name: 'instructorId',
    label: t('Instructor.instructor'),
    placeholder: t('Instructor.placeholder'),
    emptyMessage: t('Instructor.empty'),
    loadingMessage: t('Instructor.loading'),
  },
  {
    name: 'price',
    label: t('price'),
    placeholder: '3200',
  },
  {
    name: 'category',
    label: t('Category.category'),
    placeholder: `B (${t('Category.B')})`,
    emptyMessage: t('Category.empty'),
    options: Object.keys(Category).map((key) => {
      return {
        value: key,
        label: `${key} (${t('Category.' + key)})`,
      };
    }),
  },
  {
    name: 'status',
    label: t('Status.status'),
    placeholder: t('Status.ONGOING'),
    emptyMessage: t('Status.empty'),
    options: Object.keys(LicenseFileStatus).map((key) => {
      return {
        value: key,
        label: t('Status.' + key),
      };
    }),
  },
];
