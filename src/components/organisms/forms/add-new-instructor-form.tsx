'use client';

import type { z } from 'zod';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { TranslationFunction } from '@/types';
import type { instructorFormSchema } from '@/schemas/instructor-form-schema';

import type { FormComponentType } from './types';

const fields = (t: TranslationFunction) => [
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

type TFormValues = z.infer<typeof instructorFormSchema>;

const AddNewInstructorForm: FormComponentType<TFormValues> = ({ form, onSubmit, className }) => {
  const t = useTranslations('Dashboard.Users.Instructors.AddNewInstructorModal.AddNewInstructorForm');

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
                <FormLabel className="inline-block w-full text-sm">{f.label}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={f.placeholder} value={field.value as string} />
                </FormControl>
                <FormMessage className="inline-block w-full px-1 text-[12px]" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewInstructorForm;
