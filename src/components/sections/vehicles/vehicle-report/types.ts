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
    profilePictureUrl: string | null;
  };
};

export type VehicleReportComponentType = FC<{
  vehicle: VehicleReport;
}>;
