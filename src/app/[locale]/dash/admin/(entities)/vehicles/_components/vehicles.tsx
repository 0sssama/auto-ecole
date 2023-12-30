'use client';

import { useTranslations } from 'next-intl';

import {
  PageHeader,
  // AddCarModal
  AddVehicleModal,
} from '@/components/molecules';
import { useModal } from '@/lib/hooks/use-modal';
import { VehiclesListTable } from '@/components/sections/vehicles';

export default function VehiclesPage() {
  const t = useTranslations('Dashboard.Entities.Vehicles.Header');
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
