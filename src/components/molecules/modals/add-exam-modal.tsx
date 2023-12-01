"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExamStatus, ExamType } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms";
import { AddNewExamForm } from "@/components/organisms";
import { api } from "@/utils/api";

import { examFormSchema } from "@/schemas/exam-form-schema";
import type { ModalComponentType } from "./types";

const AddExamModal: ModalComponentType<{
  licenseFileId: number;
}> = ({ isOpen, close, context: { licenseFileId } }) => {
  const t = useTranslations("Dashboard.Modals.AddExam");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      type: ExamType.CODE,
      status: ExamStatus.PENDING,
      date: new Date(),
    },
  });

  const {
    mutate: addExamToLicenseFile,
    isLoading,
    error,
  } = api.db.exams.mutation.addToLicenseFile.useMutation({
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

  const onSubmit = (values: z.infer<typeof examFormSchema>) =>
    addExamToLicenseFile({
      ...values,
      licenseFileId,
    });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="md"
      className="max-h-[80vh] overflow-auto md:max-h-full"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody>
          {error && (
            <div className="w-full px-2 py-4 text-center bg-red-100 rounded">
              <p className="text-sm font-bold text-center text-danger">
                {error.message}
              </p>
            </div>
          )}
          <AddNewExamForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-2"
          />
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t("button-cancel")}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="xs" color="#fff" />
            ) : (
              t("button-submit")
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddExamModal;
