import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'lastName',
    label: t('lastName'),
    placeholder: 'Doe',
  },
  {
    name: 'firstName',
    label: t('firstName'),
    placeholder: 'John',
  },
  {
    name: 'phone',
    label: t('phone'),
    placeholder: '06XXXXXXXX',
  },
];
