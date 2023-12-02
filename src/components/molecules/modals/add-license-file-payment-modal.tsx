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
import { AddNewLicenseFilePaymentForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { api } from "@/utils/api";

import { licenseFilePaymentFormSchema } from "@/schemas/license-file-payment-form-schema";
import type { ModalComponentType } from "./types";

const AddLicenseFilePaymentModal: ModalComponentType<{
  licenseFileId: number;
}> = ({ isOpen, close, context: { licenseFileId } }) => {
  const t = useTranslations("Dashboard.Modals.AddLicenseFilePayment");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof licenseFilePaymentFormSchema>>({
    resolver: zodResolver(licenseFilePaymentFormSchema),
    defaultValues: {
      licenseFileId,
      sum: "0",
      comment: "",
      date: new Date(),
    },
  });

  const {
    mutate: addPayment,
    isLoading,
    error,
  } = api.db.payments.mutation.addToLicenseFile.useMutation({
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

  const onSubmit = (values: z.infer<typeof licenseFilePaymentFormSchema>) =>
    addPayment({
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
            <div className="w-full px-2 py-4 mb-4 text-center rounded bg-danger-50">
              <p className="text-sm font-bold text-center text-danger">
                {t("error")}
              </p>
            </div>
          )}
          <AddNewLicenseFilePaymentForm
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

export default AddLicenseFilePaymentModal;