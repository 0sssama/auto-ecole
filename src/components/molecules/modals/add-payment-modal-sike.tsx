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

import { Button } from "@/components/ui/button";

import type { ModalComponentType } from "./types";

const AddPaymentModalSike: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations("Dashboard.Modals.AddPaymentSike");

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      defaultOpen={isOpen}
      modal
      onOpenChange={(isOpen) => !isOpen && close()}
    >
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-1 text-center">
          <DialogTitle className="text-2xl font-semibold">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-xs opacity-70">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center my-4">
          <p className="text-sm text-center opacity-70 lg:max-w-[400px]">
            {t("description")}
          </p>
        </div>
        <DialogFooter className="w-full">
          <Button variant="outline" onClick={close} className="w-full">
            {t("button-cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentModalSike;
