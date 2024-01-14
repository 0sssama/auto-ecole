'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useEffect } from 'react';

import { schoolSettingsFormSchema, type SchoolSettingsFormType } from '@/base/schemas/school-settings-form-schema';
import { useGetSchool } from '@/base/hooks/school/use-get-school';
import { useUpdateSchool } from '@/base/hooks/school/use-update-school';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/atoms/spinner';
import { Button } from '@/components/ui/button';
import SchoolSettingsForm from '@/components/organisms/forms/school-settings-form';
import { cn } from '@/base/utils/client/cn';
import { useUserIsSuperAdmin } from '@/base/hooks/auth/use-user-is-super-admin';

export default function SchoolSettings() {
  const t = useTranslations('Dashboard.Settings');

  const { isSuperAdmin, isLoaded } = useUserIsSuperAdmin();

  const { schoolData, isLoading } = useGetSchool();
  const { updateSchool, isUpdating } = useUpdateSchool({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('error'));
    },
  });

  const loading = isLoading || !isLoaded;

  const form = useForm<SchoolSettingsFormType>({
    resolver: zodResolver(schoolSettingsFormSchema),
  });

  const onSubmit = (values: SchoolSettingsFormType) => updateSchool(values);

  useEffect(() => {
    if (schoolData)
      Object.keys(schoolData).forEach((key) => {
        const formKey = key as keyof SchoolSettingsFormType;
        const schoolDataKey = key as keyof typeof schoolData;

        form.setValue(formKey, schoolData[schoolDataKey] ?? '');
      });
  }, [schoolData]);

  return (
    <main className="relative h-full w-full">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-xl font-bold tracking-tight lg:text-3xl">{t('title')}</h1>
        <p className="lg:text-md text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <div className={cn('mt-4 flex w-full flex-col gap-8 lg:max-w-[60%]', loading ? 'items-center' : 'items-end')}>
        <Separator />
        {loading ? (
          <Spinner size="md" color="primary" />
        ) : (
          <>
            <SchoolSettingsForm
              form={form}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            />
            {isSuperAdmin && (
              <div className="w-full md:w-fit">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading || isUpdating}
                  className="w-full md:w-fit"
                >
                  {loading || isUpdating ? <Spinner size="xs" color="background" /> : t('button-submit')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
