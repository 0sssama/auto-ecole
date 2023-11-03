"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddClientModal, PageContentHeader } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { api } from "@/utils/api";

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

const DbClientList = () => {
  const { data, isLoading, error } = api.db.customers.query.list.useQuery();

  if (error) return <div>Error loading DB Clients: {error.message}</div>;

  if (isLoading) return <div>Loading DB Clients...</div>;

  return (
    <div className="w-full border-r-1 border-r-gray-200">
      <h3 className="mb-2 text-2xl font-bold">All users in Database:</h3>
      {data && (
        <ul>
          {data.map((user, key) => (
            <li key={key}>
              {user.firstNameFr} {user.lastNameFr}{" "}
              <span dir="rtl">
                ({user.firstNameAr} {user.lastNameAr})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ClerkClientList = () => {
  const { data, isLoading, error } = api.clerk.users.query.list.useQuery();

  if (error) return <div>Error loading DB Clients: {error.message}</div>;

  if (isLoading) return <div>Loading DB Clients...</div>;

  return (
    <div className="w-full">
      <h3 className="mb-2 text-2xl font-bold">All users in Clerk:</h3>
      {data && (
        <ul>
          {data.map((user, key) => (
            <li key={key}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Home() {
  const addClientModal = useModal();

  return (
    <main>
      <PageHeader openModal={addClientModal.open} />
      <AddClientModal
        isOpen={addClientModal.isOpen}
        close={addClientModal.close}
      />
      <div className="grid w-full grid-cols-2 gap-8">
        <DbClientList />
        <ClerkClientList />
      </div>
      <div className="w-full h-[5000vh]"></div>
    </main>
  );
}
