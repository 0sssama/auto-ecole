'use client';

import omit from 'lodash/omit';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import type { StudentFormValues } from '@/base/schemas/student-form-schema';
import type { UseFileUploadHook } from '@/base/hooks/use-file-upload/types';

import type { FormComponentType } from '../../forms.types';

import { formFields } from './form-fields';

type TFormValues = StudentFormValues;
type TContext = {
  FileUploadPFP?: ReturnType<UseFileUploadHook>['FileUpload'];
  FileUploadCIN?: ReturnType<UseFileUploadHook>['FileUpload'];
};

const AddNewStudentForm: FormComponentType<TFormValues, TContext> = ({
  form,
  onSubmit,
  className,
  context: { FileUploadPFP, FileUploadCIN } = {},
}) => {
  const t = useTranslations('Dashboard.Users.Students.AddNewStudentModal.AddNewStudentForm');

  const fields = formFields(t);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields.map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline-block w-full text-sm" dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}>
                  {f.label}
                </FormLabel>
                <FormControl>
                  <>
                    {field.name !== 'birthdate' && field.name !== 'profilePicture' && field.name !== 'cinFile' && (
                      <Input
                        placeholder={f.placeholder}
                        dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}
                        {...field}
                        value={field.value as string}
                      />
                    )}

                    {field.name === 'birthdate' && (
                      <DatePicker {...omit(field, 'ref')} placeholder={f.placeholder} value={field.value as Date} />
                    )}

                    {field.name === 'profilePicture' && FileUploadPFP !== undefined && (
                      <FileUploadPFP>{f.placeholder}</FileUploadPFP>
                    )}

                    {field.name === 'cinFile' && FileUploadCIN !== undefined && (
                      <FileUploadCIN>{f.placeholder}</FileUploadCIN>
                    )}
                  </>
                </FormControl>
                <FormMessage
                  dir={f.name.endsWith('Ar') ? 'rtl' : 'ltr'}
                  className="inline-block w-full px-1 text-[12px]"
                />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewStudentForm;
