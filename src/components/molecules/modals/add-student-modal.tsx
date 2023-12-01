import { useState } from "react";
import { toast } from "sonner";
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
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AddNewStudentForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { StudentFormSchema } from "@/schemas/student-form-schema";
import { api } from "@/utils/api";

import type { ModalComponentType } from "./types";

const AddStudentModal: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations("Dashboard.Users.Students.AddNewStudentModal");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof StudentFormSchema>>({
    resolver: zodResolver(StudentFormSchema),
    defaultValues: {
      firstNameAr: "",
      firstNameFr: "",
      lastNameAr: "",
      lastNameFr: "",
      addressAr: "",
      addressFr: "",
      professionAr: "",
      professionFr: "",
      phone: "",
      cin: "",
      email: "",
      birthdate: new Date("08-02-2002"),
    },
  });

  const { mutate: deleteUserFromClerk } =
    api.clerk.users.mutation.delete.useMutation();
  const [userClerkId, setUserClerkId] = useState<string | null>(null);

  const {
    mutate: addStudentToDb,
    isLoading: dbOperationLoading,
    error: dbOperationError,
  } = api.db.students.mutation.add.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t("success"));
      closeModal();
    },
    onError: (error) => {
      console.log("CLEANING UP USER FROM CLERK, FAILURE TO ADD TO DB");
      console.error(error);

      if (!userClerkId) return;

      deleteUserFromClerk({
        clerkUserId: userClerkId,
      });
    },
  });

  const {
    mutate: addStudentToClerk,
    isLoading: clerkOperationLoading,
    error: clerkOperationError,
  } = api.clerk.users.mutation.add.useMutation({
    onSuccess: (data) => {
      //   void ctx.users.getPage.invalidate();
      setUserClerkId(data.clerkId);

      addStudentToDb({
        ...form.getValues(),
        clerkId: data.clerkId,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof StudentFormSchema>) =>
    addStudentToClerk({
      emailAddress: values.email,
      firstName: values.firstNameFr,
      lastName: values.lastNameFr,
      phoneNumber: values.phone,
      cin: values.cin,
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
          <AddNewStudentForm
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

export default AddStudentModal;
