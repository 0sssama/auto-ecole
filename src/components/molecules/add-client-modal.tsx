import {
  Modal,
  //   ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
// import { useOrganization } from "@clerk/nextjs";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AddNewClientForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { ClientFormSchema } from "@/schemas/client-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import { toast } from "sonner";
import { useState } from "react";

function AddClientModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const t = useTranslations("Dashboard.Users.AddNewClientModal");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
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
    mutate: addCustomerToDb,
    isLoading: dbOperationLoading,
    error: dbOperationError,
  } = api.db.customers.mutation.add.useMutation({
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
        clerkId: userClerkId,
      });
    },
  });

  const {
    mutate: addCustomerToClerk,
    isLoading: clerkOperationLoading,
    error: clerkOperationError,
  } = api.clerk.users.mutation.add.useMutation({
    onSuccess: (data) => {
      //   void ctx.users.getPage.invalidate();
      setUserClerkId(data.clerkId);

      addCustomerToDb({
        ...form.getValues(),
        clerkId: data.clerkId,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof ClientFormSchema>) =>
    addCustomerToClerk({
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
          <AddNewClientForm
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
}

export default AddClientModal;
