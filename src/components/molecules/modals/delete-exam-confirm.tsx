"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { Spinner } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useDeleteExam } from "@/lib/hooks/exams/useDeleteExam";

import type { ModalComponentType } from "./types";

const DeleteExamConfirm: ModalComponentType<{ examId: number }> = ({
  isOpen,
  close,
  context: { examId },
}) => {
  const t = useTranslations("Dashboard.Modals.DeleteExam");

  const { deleteExam, isDeletingExam } = useDeleteExam(examId, {
    onSuccess: () => {
      close();
      toast.success(t("exam-delete-success"));
    },
    onError: () => {
      toast.error(t("exam-delete-error"));
    },
  });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size="sm"
      className="max-h-[80vh] overflow-auto md:max-h-full"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 pt-4 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("description")}</p>
        </ModalHeader>
        <ModalFooter className="flex flex-col w-full gap-1">
          <Button
            variant="destructive"
            onClick={deleteExam}
            disabled={isDeletingExam}
          >
            {isDeletingExam ? (
              <Spinner size="xs" color="background" />
            ) : (
              t("button-submit")
            )}
          </Button>
          <Button variant="ghost" onClick={close} className="!text-destructive">
            {t("button-cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExamConfirm;
