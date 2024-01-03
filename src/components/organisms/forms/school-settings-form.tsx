'use client';

import type { SchoolSettingsFormType } from '@/base/schemas/school-settings-form-schema';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import type { FormComponentType } from './types';

const fields = [
  {
    name: 'name',
    label: 'إسم مؤسسة تعليم السياقة :',
  },
  {
    name: 'city',
    label: 'المدينة :',
  },
  {
    name: 'address',
    label: 'العنوان :',
  },
  {
    name: 'phone',
    label: 'رقم الهاتف :',
  },
  {
    name: 'fax',
    label: 'رقم الفاكس :',
  },
  {
    name: 'email',
    label: 'البريد الإلكتروني :',
  },
  {
    name: 'numRegistrePermis',
    label: 'رقم القيد في السجل الوطني الخاص بمؤسسات تعليم السياقة (رقم الرخصة) :',
  },
  {
    name: 'numRegistreCommerce',
    label: 'رقم القيد في السجل التجاري :',
  },
  {
    name: 'numRegistreFiscale',
    label: 'رقم القيد في سجل الضريبة المهنية :',
  },
  {
    name: 'theoryHours',
    label: 'عدد ساعات التكوين النظري :',
  },
  {
    name: 'practiceHours',
    label: 'عدد ساعات التكوين التطبيقي :',
  },
];
const SchoolSettingsForm: FormComponentType<SchoolSettingsFormType> = ({ form, onSubmit, className }) => (
  <Form {...form}>
    <form onSubmit={onSubmit} className={className}>
      {fields.map((f, key) => (
        <FormField
          key={key}
          control={form.control}
          name={f.name as keyof SchoolSettingsFormType}
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
