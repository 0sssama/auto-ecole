import { LessonStatus } from '@prisma/client';

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
    placeholder: '100',
  },
  {
    name: 'duration',
    label: t('duration'),
    placeholder: '1',
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '21-11-2023',
  },
  {
    name: 'status',
    label: t('Status.label'),
    placeholder: t('Status.RESERVED'),
    emptyMessage: t('Status.empty'),
    options: Object.keys(LessonStatus).map((key) => {
      return {
        value: key,
        label: t('Status.' + key),
      };
    }),
  },
];
