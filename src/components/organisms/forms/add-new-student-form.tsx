'use client';

import omit from 'lodash/omit';
import type { z } from 'zod';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import type { TranslationFunction } from '@/base/types';
import type { studentFormSchema } from '@/base/schemas/student-form-schema';
import type { UseFileUploadHook } from '@/base/hooks/use-file-upload/types';

import type { FormComponentType } from './types';

const fields = (t: TranslationFunction) => [
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
    name: 'cin',
    label: t('cin'),
    placeholder: 'CDXXXXXX',
  },
  {
    name: 'cinFile',
    label: t('cinFile'),
    placeholder: t('upload-cin-file'),
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
    name: 'birthdate',
    label: t('birthdate'),
    placeholder: '02-08-1969',
  },
  {
    name: 'profilePicture',
    label: t('profilePicture'),
    placeholder: t('upload-profile-picture'),
  },
];

type TFormValues = z.infer<typeof studentFormSchema>;
type TContext = {
  FileUploadPFP?: ReturnType<UseFileUploadHook>['FileUpload'];
  FileUploadCIN?: ReturnType<UseFileUploadHook>['FileUpload'];
};

const AddNewStudentForm: FormComponentType<TFormValues, TContext> = ({
  form,
  onSubmit,
  className,
  context: { FileUploadPFP, FileUploadCIN } = {},
}) => {
  const t = useTranslations('Dashboard.Users.Students.AddNewStudentModal.AddNewStudentForm');

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline-block w-full text-sm" dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}>
                  {f.label}
                </FormLabel>
                <FormControl>
                  <>
                    {field.name !== 'birthdate' && field.name !== 'profilePicture' && field.name !== 'cinFile' && (
                      <Input
                        placeholder={f.placeholder}
                        dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}
                        {...field}
                        value={field.value as string}
                      />
                    )}

                    {field.name === 'birthdate' && (
                      <DatePicker {...omit(field, 'ref')} placeholder={f.placeholder} value={field.value as Date} />
                    )}

                    {field.name === 'profilePicture' && FileUploadPFP !== undefined && (
                      <FileUploadPFP>{f.placeholder}</FileUploadPFP>
                    )}

                    {field.name === 'cinFile' && FileUploadCIN !== undefined && (
                      <FileUploadCIN>{f.placeholder}</FileUploadCIN>
                    )}
                  </>
                </FormControl>
                <FormMessage
                  dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}
                  className="inline-block w-full px-1 text-[12px]"
                />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewStudentForm;
