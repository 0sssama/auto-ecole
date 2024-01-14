'use client';

import { useTranslations } from 'next-intl';

import { useModal } from '@/base/hooks/use-modal';
import { VehiclesListTable } from '@/components/sections/vehicles';
import { PageHeader } from '@/components/molecules/page-header';
import { AddVehicleModal } from '@/components/molecules/modal/vehicles/add/vehicle';

export default function VehiclesPage() {
  const t = useTranslations('Dashboard.Entities.Vehicles.Header');
  const addVehicleModal = useModal();

  return (
    <>
      <PageHeader openModal={addVehicleModal.open} t={t} />
      <AddVehicleModal {...addVehicleModal} />
      <div className="w-full">
        <VehiclesListTable />
      </div>
    </>
  );
}
