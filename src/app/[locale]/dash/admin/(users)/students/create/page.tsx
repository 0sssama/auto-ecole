'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { useAddStudent } from '@/base/hooks/students/create/use-add-student';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms/spinner';
import { useFileUpload } from '@/base/hooks/use-file-upload';
import { useModal } from '@/base/hooks/use-modal';
import { Separator } from '@/components/ui/separator';
import { LicenseFileRedirectModal } from '@/components/molecules/modal/license-files/add/student-creation-redirect';
import { AddNewStudentForm } from '@/components/organisms/forms/students/add';
import { studentFormSchema, type StudentFormValues } from '@/base/schemas/student-form-schema';

export default function CreateStudentPage() {
  const router = useRouter();

  const t = useTranslations('Dashboard.Users.Students.Create');

  const [studentId, setStudentId] = useState<number | null>(null);
  const licenseFileModal = useModal();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      firstNameAr: '',
      firstNameFr: '',
      lastNameAr: '',
      lastNameFr: '',
      addressAr: '',
      addressFr: '',
      professionAr: '',
      professionFr: '',
      birthplaceFr: '',
      birthplaceAr: '',
      phone: '',
      cin: '',
      email: '',
      cinFile: '',
      profilePicture: '',
      birthdate: new Date(),
    },
  });

  const { createStudent, isCreating, creationError } = useAddStudent({
    onSuccess: ({ newUserId }: { newUserId: number }) => {
      setStudentId(newUserId);

      toast.success(t('success'));
      licenseFileModal.open();
    },
    onError: () => {
      toast.error(t('error'));
    },
  });

  const {
    startUpload: uploadPFP,
    FileUpload: FileUploadPFP,
    isUploading: isUploading1,
  } = useFileUpload({
    endpoint: 'imageUploader',
  });

  const {
    startUpload: uploadCIN,
    FileUpload: FileUploadCIN,
    isUploading: isUploading2,
  } = useFileUpload({
    endpoint: 'pdfUploader',
  });

  const isUploading = isUploading1 || isUploading2;

  const onSubmit = (values: StudentFormValues) =>
    Promise.all([uploadPFP(), uploadCIN()])
      .then(([{ response: response1 }, { response: response2 }]) => [response1[0], response2[0]])
      .then(([{ url: pfpUrl }, { url: cinUrl }]) =>
        createStudent({ ...values, profilePicture: pfpUrl, cinFile: cinUrl }),
      )
      .catch(() => {
        toast.error(t('error'));
      });

  return (
    <>
      {studentId && (
        <LicenseFileRedirectModal
          {...licenseFileModal}
          context={{
            studentId,
          }}
        />
      )}
      <div className="flex w-full flex-col gap-2">
        <div>
          <Button onClick={() => router.back()} variant="ghost" className="mb-6 px-0 hover:bg-transparent">
            <ArrowLeft size={18} />
            <span className="ml-2">{t('back')}</span>
          </Button>
        </div>
        <h1 className="text-xl font-bold tracking-tight lg:text-3xl">{t('title')}</h1>
        <p className="lg:text-md text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <div className="mt-4 flex w-full flex-col items-end gap-8 lg:max-w-[60%]">
        <Separator />
        {creationError && (
          <div className="w-full rounded bg-destructive/10 px-2 py-4 text-center">
            <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
          </div>
        )}
        <AddNewStudentForm
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
          context={{
            FileUploadPFP,
            FileUploadCIN,
          }}
        />
        <div className="w-full md:w-fit">
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isCreating || isUploading}
            className="w-full md:w-fit"
          >
            {isCreating || isUploading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </div>
      </div>
    </>
  );
}
