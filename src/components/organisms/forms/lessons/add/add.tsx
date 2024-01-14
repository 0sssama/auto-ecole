'use client';

import { useState } from 'react';
import omit from 'lodash/omit';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import { api } from '@/base/utils/server/api';
import type { LessonFormValues } from '@/base/schemas/lesson-form.schema';

import type { FormComponentType } from '../../forms.types';

import { formFields } from './form-fields';

type TFormValues = LessonFormValues;
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

  const fields = formFields(t);

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
        {fields.map((f, key) =>
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
