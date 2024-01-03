'use client';

import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Category, LicenseFileStatus } from '@prisma/client';
import type { z } from 'zod';
import { useEffect } from 'react';

import { AddNewLicenseFileForm } from '@/components/organisms';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms';
import { licenseFileFormSchema } from '@/base/schemas/license-file-form-schema';
import { api } from '@/base/utils/server/api';
import { createQueryString } from '@/base/utils/client/create-query-string';
import { Separator } from '@/components/ui/separator';

export default function CreateLicenseFilePage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const t = useTranslations('Dashboard.Files.LicenseFiles.Create');

  const form = useForm<z.infer<typeof licenseFileFormSchema>>({
    resolver: zodResolver(licenseFileFormSchema),
    defaultValues: {
      studentId: searchParams.get('studentId') ?? '0',
      instructorId: searchParams.get('instructorId') ?? '0',
      price: '3200',
      status: LicenseFileStatus.UNDEPOSITED,
      category: Category.B,
    },
  });

  const data = useWatch({
    control: form.control,
  });

  const {
    mutate: addLicenseFile,
    isLoading,
    error,
  } = api.db.licenseFiles.mutation.add.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t('success'));
      router.push('/dash/admin/license-files');
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('error'));
    },
  });

  const onSubmit = (values: z.infer<typeof licenseFileFormSchema>) =>
    addLicenseFile({
      ...values,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
    });

  useEffect(() => {
    if (!data.studentId || data.studentId === '0') return;

    router.push(
      `${pathname}?${createQueryString({
        searchParams,
        name: 'studentId',
        value: data.studentId,
      })}`,
    );
  }, [data.studentId]);

  useEffect(() => {
    if (!data.instructorId || data.instructorId === '0') return;

    router.push(
      `${pathname}?${createQueryString({
        searchParams,
        name: 'instructorId',
        value: data.instructorId,
      })}`,
    );
  }, [data.instructorId]);

  return (
    <main className="relative w-full">
      <div className="flex w-full flex-col gap-2">
        <div>
          <Button
            onClick={() => router.push('/dash/admin/license-files')}
            variant="ghost"
            className="mb-6 px-0 hover:bg-transparent"
          >
            <ArrowLeft size={18} />
            <span className="ml-2">{t('back')}</span>
          </Button>
        </div>
        <h1 className="text-xl font-bold tracking-tight lg:text-3xl">{t('title')}</h1>
        <p className="lg:text-md text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <div className="mt-4 flex w-full flex-col items-end gap-8 lg:max-w-[60%]">
        <Separator />
        {error && (
          <div className="w-full rounded bg-destructive/10 px-2 py-4 text-center">
            <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
          </div>
        )}
        <AddNewLicenseFileForm
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        />
        <div className="w-full md:w-fit">
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full md:w-fit"
          >
            {isLoading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </div>
      </div>
    </main>
  );
}
