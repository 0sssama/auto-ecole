'use client';

import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { InstructorFormValues } from '@/components/molecules/modal/instructors/add';

import type { FormComponentType } from '../../forms.types';

import { formFields } from './form-fields';

const AddNewInstructorForm: FormComponentType<InstructorFormValues> = ({ form, onSubmit, className }) => {
  const t = useTranslations('Dashboard.Users.Instructors.AddNewInstructorModal.AddNewInstructorForm');

  const fields = formFields(t);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields.map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof InstructorFormValues}
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
