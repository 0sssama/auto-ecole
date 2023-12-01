"use client";

import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AddNewInstructorForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { api } from "@/utils/api";

import { instructorFormSchema } from "@/schemas/instructor-form-schema";
import type { ModalComponentType } from "./types";

const AddInstructorModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations(
    "Dashboard.Users.Instructors.AddNewInstructorModal",
  );

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof instructorFormSchema>>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const { mutate: deleteUserFromClerk } =
    api.clerk.users.mutation.delete.useMutation();
  const [userClerkId, setUserClerkId] = useState<string | null>(null);

  const {
    mutate: addInstructorToDb,
    isLoading: dbOperationLoading,
    error: dbOperationError,
  } = api.db.instructors.mutation.add.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t("success"));
      closeModal();
    },
    onError: (error) => {
      console.log("CLEANING UP INSTRUCTOR FROM CLERK, FAILURE TO ADD TO DB");
      console.error(error);

      if (!userClerkId) return;

      deleteUserFromClerk({
        clerkUserId: userClerkId,
      });
    },
  });

  const {
    mutate: addInstructorToClerk,
    isLoading: clerkOperationLoading,
    error: clerkOperationError,
  } = api.clerk.users.mutation.addInstructor.useMutation({
    onSuccess: (data) => {
      //   void ctx.users.getPage.invalidate();
      setUserClerkId(data.clerkId);

      addInstructorToDb({
        ...form.getValues(),
        clerkId: data.clerkId,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof instructorFormSchema>) =>
    addInstructorToClerk({
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phone,
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
          {(dbOperationError || clerkOperationError) && (
            <div className="w-full px-2 py-4 text-center bg-red-100 rounded">
              <p className="text-sm font-bold text-center text-danger">
                {clerkOperationError ? t("user-exists") : t("error")}
              </p>
            </div>
          )}
          <AddNewInstructorForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6"
          />
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t("button-cancel")}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={clerkOperationLoading || dbOperationLoading}
          >
            {clerkOperationLoading || dbOperationLoading ? (
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

export default AddInstructorModal;
