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

import { Button } from "@/components/ui/button";
import { AddNewClientForm } from "@/components/organisms";
import { ClientFormSchema } from "@/schemas/client-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function AddClientModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      firstNameAr: "",
      firstNameFr: "",
      lastNameAr: "",
      lastNameFr: "",
      addressAr: "",
      addressFr: "",
      phone: "",
      cin: "",
      email: "",
      birthdate: new Date("08-02-2002"),
    },
  });

  const onSubmit = (values: z.infer<typeof ClientFormSchema>) => {
    console.log(`adding ${values.firstNameFr}`);
  };

  const t = useTranslations("Dashboard.Users.AddNewClientModal");

  const closeModal = () => {
    form.reset();
    close();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody>
          <AddNewClientForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-y-2 gap-x-6"
          />
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t("button-cancel")}
          </Button>
          <Button variant="default" onClick={form.handleSubmit(onSubmit)}>
            {t("button-submit")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddClientModal;
