'use client';

import omit from 'lodash/omit';
import { useTranslations } from 'next-intl';
import type { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import type { TranslationFunction } from '@/base/types';
import type { expenseFormSchema } from '@/base/schemas/expense-form-schema';

import type { FormComponentType } from './types';

const fields = (t: TranslationFunction) => [
  {
    name: 'sum',
    label: t('sum'),
    placeholder: '500',
  },
  {
    name: 'comment',
    label: t('comment'),
    placeholder: 'Diesel fuel',
  },
  {
    name: 'date',
    label: t('date'),
    placeholder: '2021-07-13',
  },
];

type TFormValues = z.infer<typeof expenseFormSchema>;

const AddNewExpenseForm: FormComponentType<TFormValues> = ({ form, onSubmit, className }) => {
  const t = useTranslations('Dashboard.Modals.AddExpense.Form');

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
                <FormLabel className="inline-block w-full !text-left text-sm">{f.label}</FormLabel>
                <FormControl>
                  <>
                    {field.name === 'sum' && (
                      <Input {...field} placeholder={f.placeholder} value={field.value as string} />
                    )}

                    {field.name === 'comment' && (
                      <Textarea {...field} placeholder={f.placeholder} value={field.value as string} />
                    )}

                    {field.name === 'date' && (
                      <DatePicker {...omit(field, 'ref')} placeholder={f.placeholder} value={field.value as Date} />
                    )}
                  </>
                </FormControl>
                <FormMessage className="inline-block w-full px-1 !text-right text-[12px]" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewExpenseForm;
