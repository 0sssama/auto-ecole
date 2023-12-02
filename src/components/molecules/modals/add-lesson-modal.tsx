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
import { LessonStatus } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AddNewLessonForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { api } from "@/utils/api";

import { lessonFormSchema } from "@/schemas/lesson-form-schema";
import type { ModalComponentType } from "./types";

const AddLessonModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations("Dashboard.Modals.AddLesson");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof lessonFormSchema>>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      studentId: "0",
      instructorId: "0",
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
      console.log("CLEANING UP INSTRUCTOR FROM CLERK, FAILURE TO ADD TO DB");
      console.error(error);
      toast.error(t("error"));
    },
  });

  const onSubmit = (values: z.infer<typeof lessonFormSchema>) =>
    addLesson({
      ...values,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
      duration: Number(values.duration),
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
        <div className="w-full">
          {error && (
            <div className="w-full px-2 py-4 text-center bg-red-100 rounded">
              <p className="text-sm font-bold text-center text-danger">
                {error ? t("no-user-instructor") : t("error")}
              </p>
            </div>
          )}
          <AddNewLessonForm
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

export default AddLessonModal;
