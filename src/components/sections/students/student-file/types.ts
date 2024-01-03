import type { FC } from 'react';

export type StudentFolder = {
  id: number;
  profilePicture: string;
  cinFile: string;

  info: {
    fullName: string;
    nameAr: string;

    addressFr: string;
    addressAr: string;

    professionFr: string;
    professionAr: string;

    birthplaceFr: string;
    birthplaceAr: string;

    phone: string;
    email: string;
    cin: string;
    birthdate: Date;
  };
};

export type StudentFileComponentType = FC<{
  student: StudentFolder;
}>;
