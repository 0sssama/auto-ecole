'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AddNewVehicleExpenseForm } from '@/components/organisms';
import { Spinner } from '@/components/atoms';
import { api } from '@/base/utils/server/api';
import { vehicleExpenseFormSchema } from '@/base/schemas/vehicle-expense-form-schema';

import type { ModalComponentType } from './types';

const AddVehicleExpenseModal: ModalComponentType<{
  vehicleId: number;
}> = ({ isOpen, close, context: { vehicleId } }) => {
  const t = useTranslations('Dashboard.Modals.AddVehicleExpense');

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof vehicleExpenseFormSchema>>({
    resolver: zodResolver(vehicleExpenseFormSchema),
    defaultValues: {
      vehicleId,
      sum: '0',
      comment: '',
      date: new Date(),
    },
  });

  const {
    mutate: addExpense,
    isLoading,
    error,
  } = api.db.expenses.mutation.addToVehicle.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t('success'));
      closeModal();
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('error'));
    },
  });

  const onSubmit = (values: z.infer<typeof vehicleExpenseFormSchema>) =>
    addExpense({
      ...values,
      sum: Number(values.sum),
    });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} modal onOpenChange={(isOpen) => !isOpen && closeModal()}>
      <DialogContent className="flex w-full flex-col items-center text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] w-full max-lg:overflow-auto lg:max-h-full">
          {error && (
            <div className="mb-4 w-full rounded bg-destructive/10 px-2 py-4 text-center">
              <p className="text-center text-sm font-bold text-destructive">{t('error')}</p>
            </div>
          )}
          <AddNewVehicleExpenseForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-x-6 gap-y-2"
          />
        </div>
        <DialogFooter className="mt-4 flex w-full items-center justify-end gap-2">
          <Button variant="outline" onClick={closeModal} className="w-full">
            {t('button-cancel')}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="w-full">
            {isLoading ? <Spinner size="xs" color="background" /> : t('button-submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleExpenseModal;
