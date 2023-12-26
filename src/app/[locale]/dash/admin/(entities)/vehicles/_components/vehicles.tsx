"use client";

import { useTranslations } from "next-intl";

import {
  PageHeader,
  // AddCarModal
} from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { VehiclesListTable } from "@/components/sections/vehicles";
import { AddVehicleModal } from "@/components/molecules";

export default function VehiclesPage() {
  const t = useTranslations("Dashboard.Entities.Vehicles.Header");
  const addVehicleModal = useModal();

  return (
    <main>
      <PageHeader openModal={addVehicleModal.open} t={t} />
      <AddVehicleModal {...addVehicleModal} />
      <div className="w-full">
        <VehiclesListTable />
      </div>
    </main>
  );
}
