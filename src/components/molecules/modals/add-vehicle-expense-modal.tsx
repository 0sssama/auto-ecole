"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AddNewVehicleExpenseForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { api } from "@/utils/api";

import { vehicleExpenseFormSchema } from "@/schemas/vehicle-expense-form-schema";
import type { ModalComponentType } from "./types";

const AddVehicleExpenseModal: ModalComponentType<{
  vehicleId: number;
}> = ({ isOpen, close, context: { vehicleId } }) => {
  const t = useTranslations("Dashboard.Modals.AddVehicleExpense");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof vehicleExpenseFormSchema>>({
    resolver: zodResolver(vehicleExpenseFormSchema),
    defaultValues: {
      vehicleId,
      sum: "0",
      comment: "",
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
      toast.success(t("success"));
      closeModal();
    },
    onError: (error) => {
      console.error(error);
      toast.error(t("error"));
    },
  });

  const onSubmit = (values: z.infer<typeof vehicleExpenseFormSchema>) =>
    addExpense({
      ...values,
      sum: Number(values.sum),
    });

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      defaultOpen={isOpen}
      modal
      onOpenChange={(isOpen) => !isOpen && closeModal()}
    >
      <DialogContent className="flex flex-col items-center w-full text-center">
        <DialogHeader>
          <DialogTitle className="text-xl text-center lg:text-2xl">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full max-h-[40vh] max-lg:overflow-auto lg:max-h-full">
          {error && (
            <div className="w-full px-2 py-4 mb-4 text-center rounded bg-destructive/10">
              <p className="text-sm font-bold text-center text-destructive">
                {t("error")}
              </p>
            </div>
          )}
          <AddNewVehicleExpenseForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-y-2 gap-x-6"
          />
        </div>
        <DialogFooter className="flex items-center justify-end w-full gap-2 mt-4">
          <Button variant="outline" onClick={closeModal} className="w-full">
            {t("button-cancel")}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Spinner size="xs" color="background" />
            ) : (
              t("button-submit")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleExpenseModal;
