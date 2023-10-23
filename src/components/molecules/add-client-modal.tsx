import {
  Modal,
  //   ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

function AddClientModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const t = useTranslations("Dashboard.Users.AddNewClientModal");

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={close} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody>{t("body")}</ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={() => close()}>
            {t("button-cancel")}
          </Button>
          <Button variant="default">{t("button-submit")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddClientModal;
