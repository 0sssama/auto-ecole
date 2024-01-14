'use client';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { SchoolSettingsFormValues } from '@/base/schemas/school-settings-form.schema';

import type { FormComponentType } from '../../forms.types';

import { fields } from './form-fields';

const SchoolSettingsForm: FormComponentType<SchoolSettingsFormValues> = ({ form, onSubmit, className }) => (
  <Form {...form}>
    <form onSubmit={onSubmit} className={className}>
      {fields.map((f, key) => (
        <FormField
          key={key}
          control={form.control}
          name={f.name as keyof SchoolSettingsFormValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-sm" dir="rtl">
                {f.label}
              </FormLabel>
              <FormControl>
                <Input dir="rtl" {...field} value={field.value} />
              </FormControl>
              <FormMessage dir="rtl" className="inline-block w-full px-1 text-[12px]" />
            </FormItem>
          )}
        />
      ))}
    </form>
  </Form>
);

export default SchoolSettingsForm;
