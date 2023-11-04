"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddClientModal, PageContentHeader } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { api } from "@/utils/api";
import { ClientsListTable } from "@/components/sections";
import { Spinner } from "@/components/atoms";
import { Client } from "@/components/sections/clients-list-table/types";

const PageHeader = ({ openModal }: { openModal: () => void }) => {
  const t = useTranslations("Dashboard.Users.Header");

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

export default function Home() {
  const t = useTranslations("Dashboard.Users.ListClientsTable");

  const { data, isLoading, error } =
    api.db.customers.query.list.useQuery<Client[]>();

  const addClientModal = useModal();
  return (
    <main>
      <PageHeader openModal={addClientModal.open} />
      <AddClientModal
        isOpen={addClientModal.isOpen}
        close={addClientModal.close}
      />
      <div className="w-full">
        {(error || isLoading) && (
          <div className="w-full min-h-[300px] flex items-center justify-center">
            {error && t("error")}
            {isLoading && <Spinner size="md" />}
          </div>
        )}
        {data && <ClientsListTable data={data} />}
      </div>
    </main>
  );
}
