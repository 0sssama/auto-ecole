"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PageContentHeader,
  // AddLicenseFileModal
} from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { LicenseFilesListTable } from "@/components/sections/license-files";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Files.LicenseFiles.Header");

  return (
    <PageContentHeader title={t("title")}>
      <div className="flex items-center">
        <Button onClick={openModal}>
          <Plus size={18} />
          <span className="hidden ml-2 lg:block">{t("button")}</span>
        </Button>
      </div>
    </PageContentHeader>
  );
};

export default function LicenseFilesPage() {
  const addLicenseFileModal = useModal();

  return (
    <main>
      <PageHeader openModal={addLicenseFileModal.open} />
      {/* <AddLicenseFileModal
        isOpen={addLicenseFileModal.isOpen}
        close={addLicenseFileModal.close}
      /> */}
      <div className="w-full">
        <LicenseFilesListTable />
      </div>
    </main>
  );
}
