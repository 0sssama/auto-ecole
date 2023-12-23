import { getTranslations } from "next-intl/server";

import type { Locale } from "@/lib/locales";
import VehicleNotFound from "./_components/not-found";
import VehiclesPage from "./_components/vehicles";

export default function Vehicles({
  searchParams: { vehicleId },
}: {
  searchParams: {
    vehicleId: string | undefined;
  };
}) {
  if (vehicleId === undefined) return <VehiclesPage />;

  const id = Number(vehicleId);

  if (isNaN(id) || id <= 0) return <VehicleNotFound />;

  //   const student = await getCar(id);

  //   if (!student) return <CarNotFound />;

  //   return <Car student={student} />;
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
