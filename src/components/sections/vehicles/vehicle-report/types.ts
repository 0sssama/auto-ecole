import type { FC } from 'react';

export type VehicleReport = {
  id: number;
  image: string;
  name: string;
  brand: string;
  type: string;

  instructor: {
    id: number;
    fullName: string;
    profilePicture: string;
  };
};

export type VehicleReportComponentType = FC<{
  vehicle: VehicleReport;
}>;
