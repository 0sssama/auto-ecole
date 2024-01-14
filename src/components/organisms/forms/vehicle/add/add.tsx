'use client';

import omit from 'lodash/omit';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { api } from '@/base/utils/server/api';
import type { UseFileUploadHook } from '@/base/hooks/use-file-upload/types';
import type { VehicleFormValues } from '@/components/molecules/modal/vehicles/add/vehicle';

import type { FormComponentType } from '../../forms.types';

import { formFields } from './form-fields';

type TFormValues = VehicleFormValues;
type TContext = {
  FileUpload?: ReturnType<UseFileUploadHook>['FileUpload'];
};

const AddNewVehicleForm: FormComponentType<TFormValues, TContext> = ({
  form,
  onSubmit,
  className,
  context: { FileUpload } = {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const t = useTranslations('Dashboard.Modals.AddVehicle.Form');

  const fields = formFields(t);

  const instructors = api.db.instructors.query.getManyForSelect.useQuery({
    searchQuery,
    count: 5,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields.map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="inline-block w-full !text-left text-sm">{f.label}</FormLabel>
                <FormControl className="relative w-full">
                  <>
                    {(field.name === 'name' || field.name === 'brand') && (
                      <Input {...field} placeholder={f.placeholder} value={field.value as string} />
                    )}

                    {(field.name === 'instructorId' || field.name === 'type') && (
                      <Combobox
                        {...omit(field, 'ref')}
                        placeholder={f.placeholder}
                        emptyMessage={f.emptyMessage}
                        loadingMessage={f.loadingMessage}
                        value={field.value as string | null}
                        options={
                          {
                            instructorId: instructors?.data ?? [],
                            type: f.options!,
                          }[field.name]
                        }
                        isLoading={
                          {
                            instructorId: instructors?.isLoading,
                            type: false,
                          }[field.name]
                        }
                        search={
                          {
                            instructorId: { searchQuery, setSearchQuery },
                            type: undefined,
                          }[field.name]
                        }
                        onChange={(newValue) => {
                          // @ts-ignore
                          form.setValue(field.name, newValue);
                        }}
                      />
                    )}

                    {field.name === 'image' && FileUpload !== undefined && <FileUpload>{t('upload-image')}</FileUpload>}
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

export default AddNewVehicleForm;
