"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleType } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms";
import { AddNewVehicleForm } from "@/components/organisms";
import { api } from "@/utils/api";
import { useFileUpload } from "@/lib/hooks/useFileUpload";
import { vehicleFormSchema } from "@/schemas/vehicle-form-schema";

import type { ModalComponentType } from "./types";

const AddVehicleModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations("Dashboard.Modals.AddVehicle");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      image: "",
      instructorId: "0",
      type: VehicleType.CAR,
    },
  });

  const { startUpload, FileUpload, isUploading } = useFileUpload({
    endpoint: "imageUploader",
  });

  const {
    mutate: addVehicle,
    isLoading,
    error,
  } = api.db.vehicles.mutation.create.useMutation({
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

  const onSubmit = (values: z.infer<typeof vehicleFormSchema>) =>
    startUpload()
      .then(({ response }) => response[0])
      .then(({ url }) => {
        addVehicle({
          ...values,
          image: url,
          instructorId: Number(values.instructorId),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(t("error"));
      });

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      defaultOpen={isOpen}
      modal
      onOpenChange={(isOpen) => !isOpen && close()}
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
          <AddNewVehicleForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-2"
            context={{
              FileUpload,
            }}
          />
        </div>
        <DialogFooter className="flex items-center justify-end w-full gap-2 mt-4">
          <Button variant="ghost" onClick={closeModal} className="w-full">
            {t("button-cancel")}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading || isUploading}
            className="w-full"
          >
            {isLoading || isUploading ? (
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

export default AddVehicleModal;
