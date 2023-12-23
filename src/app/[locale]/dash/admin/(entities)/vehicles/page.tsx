import { getTranslations } from "next-intl/server";

import { VehicleReport } from "@/components/sections/vehicles";
import { getVehicle } from "@/server/utils/vehicles/getVehicle";
import type { Locale } from "@/lib/locales";

import VehicleNotFound from "./_components/not-found";
import VehiclesPage from "./_components/vehicles";

export default async function Vehicles({
  searchParams: { vehicleId },
}: {
  searchParams: {
    vehicleId: string | undefined;
  };
}) {
  if (vehicleId === undefined) return <VehiclesPage />;

  const id = Number(vehicleId);

  console.log("1");

  if (isNaN(id) || id <= 0) return <VehicleNotFound />;

  console.log("2");
  const vehicle = await getVehicle(id);

  console.log("3");
  if (!vehicle) return <VehicleNotFound />;

  console.log("4");
  return <VehicleReport vehicle={vehicle} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) {
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.Entities.Vehicles.Header",
  });

  return {
    title: `${t("title")} / Dashboard`,
  };
}
