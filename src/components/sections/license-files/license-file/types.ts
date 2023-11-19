import { LicenseFileStatus } from "@prisma/client";

export type FetchedLicenseFile = {
  id: number;
  licenseFileStatus: LicenseFileStatus;
  price: number;
  createdAt: Date;

  student: {
    id: number;
    fullName: string;
    profilePictureUrl: string;
  };

  instructor: {
    id: number;
    fullName: string;
    profilePictureUrl: string;
  };

  createdBy: {
    id: number;
    fullName: string;
    profilePictureUrl: string;
  };
};
