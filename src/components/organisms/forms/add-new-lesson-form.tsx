'use client';

import { useState } from 'react';
import omit from 'lodash/omit';
import type { z } from 'zod';
import { useTranslations } from 'next-intl';
import { LessonStatus } from '@prisma/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import { api } from '@/base/utils/server/api';
import type { TranslationFunction } from '@/base/types';
import type { lessonFormSchema } from '@/base/schemas/lesson-form.schema';

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

type TFormValues = z.infer<typeof lessonFormSchema>;
type TContext = {
  isLicenseFileLesson?: boolean;
};

const AddNewLessonForm: FormComponentType<TFormValues, TContext> = ({
  form,
  onSubmit,
  className,
  context: { isLicenseFileLesson } = {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const t = useTranslations('Dashboard.Modals.AddLesson.Form');

  const students = isLicenseFileLesson
    ? null
    : api.db.students.query.getManyForSelect.useQuery({
        searchQuery,
        count: 5,
      });

  const instructors = isLicenseFileLesson
    ? null
    : api.db.instructors.query.getManyForSelect.useQuery({
        searchQuery,
        count: 5,
      });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) =>
          (f.name === 'studentId' && isLicenseFileLesson) ||
          (f.name === 'instructorId' && isLicenseFileLesson) ? null : (
            <FormField
              key={key}
              control={form.control}
              name={f.name as keyof TFormValues}
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="inline-block w-full !text-left text-sm">{f.label}</FormLabel>
                  <FormControl className="relative w-full">
                    <>
                      {field.name === 'date' && (
                        <DatePicker {...omit(field, 'ref')} placeholder={f.placeholder} value={field.value as Date} />
                      )}

                      {(field.name === 'price' || field.name === 'duration') && (
                        <Input {...field} placeholder={f.placeholder} value={field.value as string} />
                      )}

                      {(field.name === 'instructorId' || field.name === 'studentId' || field.name === 'status') && (
                        <Combobox
                          {...omit(field, 'ref')}
                          placeholder={f.placeholder}
                          emptyMessage={f.emptyMessage}
                          loadingMessage={f.loadingMessage}
                          value={field.value as string | null}
                          options={
                            {
                              instructorId: instructors?.data ?? [],
                              studentId: students?.data ?? [],
                              status: f.options!,
                            }[field.name]
                          }
                          isLoading={
                            {
                              instructorId: instructors?.isLoading,
                              studentId: students?.isLoading,
                              status: false,
                            }[field.name]
                          }
                          search={
                            {
                              instructorId: { searchQuery, setSearchQuery },
                              studentId: { searchQuery, setSearchQuery },
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
                  <FormMessage className="inline-block w-full px-1 !text-right text-[12px]" />
                </FormItem>
              )}
            />
          ),
        )}
      </form>
    </Form>
  );
};

export default AddNewLessonForm;
