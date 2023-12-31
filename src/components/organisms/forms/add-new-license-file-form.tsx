'use client';

import omit from 'lodash/omit';
import { useState } from 'react';
import type { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Category, LicenseFileStatus } from '@prisma/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { api } from '@/base/utils/server/api';
import type { TranslationFunction } from '@/base/types';
import type { licenseFileFormSchema } from '@/base/schemas/license-file-form-schema';

import type { FormComponentType } from './types';

const fields = (t: TranslationFunction) => [
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

type TFormValues = z.infer<typeof licenseFileFormSchema>;

const AddNewStudentForm: FormComponentType<TFormValues> = ({ form, onSubmit, className }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const t = useTranslations('Dashboard.Files.LicenseFiles.AddNewModal.AddNewLicenseFileForm');

  const students = api.db.students.query.getManyForSelect.useQuery({
    searchQuery,
    count: 5,
  });

  const instructors = api.db.instructors.query.getManyForSelect.useQuery({
    searchQuery,
    count: 5,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="inline-block w-full text-sm">{f.label}</FormLabel>
                <FormControl className="relative w-full">
                  <>
                    {field.name === 'price' && (
                      <Input {...field} placeholder={f.placeholder} value={field.value as string} />
                    )}

                    {field.name !== 'price' && (
                      <Combobox
                        {...omit(field, 'ref')}
                        placeholder={f.placeholder}
                        emptyMessage={f.emptyMessage}
                        loadingMessage={f.loadingMessage}
                        value={field.value as string | null}
                        options={
                          {
                            instructorId: instructors.data ?? [],
                            studentId: students.data ?? [],
                            category: f.options!,
                            status: f.options!,
                          }[field.name]
                        }
                        isLoading={
                          {
                            instructorId: instructors.isLoading,
                            studentId: students.isLoading,
                            category: false,
                            status: false,
                          }[field.name]
                        }
                        search={
                          {
                            instructorId: { searchQuery, setSearchQuery },
                            studentId: { searchQuery, setSearchQuery },
                            category: undefined,
                            status: undefined,
                          }[field.name]
                        }
                        onChange={(newValue) => {
                          // @ts-ignore
                          form.setValue(field.name, newValue);
                        }}
                      />
                    )}
                  </>
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

export default AddNewStudentForm;
