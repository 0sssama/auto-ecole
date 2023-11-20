import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

function AddExamModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const t = useTranslations("Dashboard.Files.Exams.AddNewModal");

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size="2xl"
      className="max-h-[80vh] overflow-auto md:max-h-full"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center my-4">
          <p className="text-sm text-center opacity-70 lg:max-w-[400px]">
            {t("description")}
          </p>
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={close}>
            {t("button-cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddExamModal;
