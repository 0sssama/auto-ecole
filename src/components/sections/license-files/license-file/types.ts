import type { FC } from 'react';
import type { LicenseFileStatus } from '@prisma/client';

export type FetchedLicenseFile = {
  id: number;
  licenseFileStatus: LicenseFileStatus;
  price: number;
  createdAt: Date;

  student: {
    id: number;
    fullName: string;
    profilePicture: string;
  };

  instructor: {
    id: number;
    fullName: string;
    profilePicture: string;
  };

  createdBy: {
    id: number;
    fullName: string;
    profilePicture: string;
  };
};

interface LicenseFileProps {
  licenseFile: FetchedLicenseFile;
}

export type LicenseFileComponentType = FC<LicenseFileProps>;
