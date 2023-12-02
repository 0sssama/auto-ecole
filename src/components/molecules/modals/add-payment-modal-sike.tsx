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
      <DialogContent className="flex flex-col items-center w-full text-center">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl">
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("description")}</DialogDescription>
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
