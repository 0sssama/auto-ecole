import type { FC } from "react";

export type VehicleReport = {
  id: number;
  name: string;
  //   profilePictureUrl: string | null;
  //   info: {
  //     fullName: string;
  //     nameAr: string;

  //     addressFr: string;
  //     addressAr: string;

  //     professionFr: string;
  //     professionAr: string;

  //     phone: string;
  //     email: string;
  //     cin: string;
  //     birthdate: Date;
  //   };
};

export type VehicleReportComponentType = FC<{
  vehicle: VehicleReport;
}>;
