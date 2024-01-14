import type { TranslationFunction } from '@/base/types';

export const formFields = (t: TranslationFunction) => [
  {
    name: 'profilePicture',
    label: t('profilePicture'),
    placeholder: t('upload-profile-picture'),
  },
  {
    name: 'lastNameFr',
    label: t('lastName'),
    placeholder: 'Doe',
  },
  {
    name: 'lastNameAr',
    label: 'الإسم العائلي :',
    placeholder: 'العلوي',
  },
  {
    name: 'firstNameFr',
    label: t('firstName'),
    placeholder: 'John',
  },
  {
    name: 'firstNameAr',
    label: 'الإسم الشخصي :',
    placeholder: 'محمد',
  },
  {
    name: 'professionFr',
    label: t('profession'),
    placeholder: 'Professeur',
  },
  {
    name: 'professionAr',
    label: 'المهنة :',
    placeholder: 'أستاذ',
  },
  {
    name: 'birthplaceFr',
    label: t('birthplace'),
    placeholder: 'Casablanca',
  },
  {
    name: 'birthplaceAr',
    label: 'مكان الإزدياد :',
    placeholder: 'الدار البيضاء',
  },
  {
    name: 'addressFr',
    label: t('address'),
    placeholder: 'Rue 123, Ville, Pays',
  },
  {
    name: 'addressAr',
    label: 'العنوان :',
    placeholder: 'شارع 123، المدينة، البلد',
  },
  {
    name: 'birthdate',
    label: t('birthdate'),
    placeholder: '02-08-1969',
  },
  {
    name: 'phone',
    label: t('phone'),
    placeholder: '06XXXXXXXX',
  },
  {
    name: 'email',
    label: t('email'),
    placeholder: 'john@doe.com',
  },
  {
    name: 'cin',
    label: t('cin'),
    placeholder: 'CDXXXXXX',
  },
  {
    name: 'cinFile',
    label: t('cinFile'),
    placeholder: t('upload-cin-file'),
  },
];
