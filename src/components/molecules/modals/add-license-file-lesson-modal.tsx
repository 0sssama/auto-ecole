"use client";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { LessonStatus } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms";
import { AddNewLessonForm } from "@/components/organisms";
import { api } from "@/utils/api";

import { lessonFormSchema } from "@/schemas/lesson-form-schema";
import type { ModalComponentType } from "./types";

const AddLessonModal: ModalComponentType<{
  licenseFileId: number;
  studentId: number;
  instructorId: number;
}> = ({ isOpen, close, context }) => {
  const t = useTranslations("Dashboard.Modals.AddLesson");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof lessonFormSchema>>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      studentId: String(context.studentId),
      instructorId: String(context.instructorId),
      price: "100",
      duration: "1",
      status: LessonStatus.RESERVED,
    },
  });

  const {
    mutate: addLesson,
    isLoading,
    error,
  } = api.db.lessons.mutation.add.useMutation({
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

  const onSubmit = (values: z.infer<typeof lessonFormSchema>) =>
    addLesson({
      ...values,
      licenseFileId: context.licenseFileId,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
      duration: Number(values.duration),
    });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="2xl"
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
            <div className="w-full px-2 py-4 mb-4 text-center rounded bg-destructive/10">
              <p className="text-sm font-bold text-center text-destructive">
                {t("no-user-instructor")}
              </p>
            </div>
          )}
          <AddNewLessonForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6"
            context={{ isLicenseFileLesson: true }}
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
              <Spinner size="xs" color="background" />
            ) : (
              t("button-submit")
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLessonModal;
