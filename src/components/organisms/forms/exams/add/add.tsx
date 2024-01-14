'use client';

import omit from 'lodash/omit';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import type { ExamFormValues } from '@/components/molecules/modal/exams/add';

import type { FormComponentType } from '../../forms.types';

import { addExamFields } from './form-fields';

const AddNewExamForm: FormComponentType<ExamFormValues> = ({ form, onSubmit, className }) => {
  const t = useTranslations('Dashboard.Modals.AddExam.Form');

  const fields = addExamFields(t);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields.map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof ExamFormValues}
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

export default AddNewExamForm;
