'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/components/atoms/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { ModalComponentType } from './types';

const ShouldCreateLicenseFileModal: ModalComponentType<{ studentId: number }> = ({
  isOpen,
  close,
  context: { studentId },
}) => {
  const t = useTranslations('Dashboard.Users.Students.Create.RedirectModal');

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('question')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full !flex-col gap-2">
          <Link href={`/dash/admin/license-files/create?studentId=${studentId}`}>
            <Button variant="default" onClick={close} className="w-full">
              {t('yes')}
            </Button>
          </Link>
          <Link href="/dash/admin/students">
            <Button variant="outline" onClick={close} className="w-full">
              {t('no')}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShouldCreateLicenseFileModal;
