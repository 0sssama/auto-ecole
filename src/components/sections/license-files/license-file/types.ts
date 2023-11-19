import { LicenseFileStatus } from "@prisma/client";

export type FetchedLicenseFile = {
  id: number;
  status: LicenseFileStatus;
  price: number;
  createdAt: Date;

  student: {
    id: number;
    fullName: string;
  };

  instructor: {
    id: number;
    fullName: string;
  };

  createdBy: {
    id: number;
    fullName: string;
  };
};
