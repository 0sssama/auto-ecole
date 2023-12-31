'use client';

import type { z } from 'zod';
import omit from 'lodash/omit';
import { useTranslations } from 'next-intl';
import { ExamStatus, ExamType } from '@prisma/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import type { examFormSchema } from '@/base/schemas/exam-form-schema';
import type { TranslationFunction } from '@/base/types';

import type { FormComponentType } from './types';

const fields = (t: TranslationFunction) => [
  {
    name: 'type',
    label: t('Type.label'),
    placeholder: t('Type.placeholder'),
    emptyMessage: t('Type.empty'),
    options: Object.keys(ExamType).map((key) => {
      return {
        value: key,
        label: t('Type.' + key),
      };
    }),
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '09/11/2002',
  },
  {
    name: 'status',
    label: t('Status.label'),
    placeholder: t('Status.placeholder'),
    emptyMessage: t('Status.empty'),
    options: Object.keys(ExamStatus).map((key) => {
      return {
        value: key,
        label: t('Status.' + key),
      };
    }),
  },
];

type TFormValues = z.infer<typeof examFormSchema>;

const AddNewInstructorForm: FormComponentType<TFormValues> = ({ form, onSubmit, className }) => {
  const t = useTranslations('Dashboard.Modals.AddExam.Form');

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
                  <>
                    {field.name !== 'date' && (
                      <Combobox
                        {...omit(field, 'ref')}
                        placeholder={f.placeholder}
                        emptyMessage={f.emptyMessage}
                        value={field.value as string | null}
                        options={
                          {
                            type: f.options!,
                            status: f.options!,
                          }[field.name]
                        }
                        onChange={(newValue) => {
                          // @ts-ignore
                          form.setValue(field.name, newValue);
                        }}
                      />
                    )}

                    {field.name === 'date' && (
                      <DatePicker {...omit(field, 'ref')} placeholder={f.placeholder} value={field.value as Date} />
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

export default AddNewInstructorForm;
