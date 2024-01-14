import { VehicleType } from '@prisma/client';

import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'brand',
    label: t('brand'),
    placeholder: 'Dacia',
  },
  {
    name: 'name',
    label: t('name'),
    placeholder: 'Sandero',
  },
  {
    name: 'type',
    label: t('Type.label'),
    placeholder: t('Type.CAR'),
    emptyMessage: t('Type.empty'),
    options: Object.keys(VehicleType).map((key) => {
      return {
        value: key,
        label: t('Type.' + key),
      };
    }),
  },
  {
    name: 'instructorId',
    label: t('Instructor.instructor'),
    placeholder: t('Instructor.placeholder'),
    emptyMessage: t('Instructor.empty'),
    loadingMessage: t('Instructor.loading'),
  },
  {
    name: 'image',
    label: t('image'),
  },
];
