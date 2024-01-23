import type { Prisma, LicenseFileStatus, Category } from '@prisma/client';

import type { TableFilters } from '@/components/organisms/data-table/types';
import type { Student } from '@/components/sections/students/list-table/schema';

const searchFilters = (search: TableFilters['get']['search']): Prisma.StudentWhereInput[] => {
  const searchableFields: (keyof Prisma.StudentWhereInput)[] = [
    'firstNameAr',
    'firstNameFr',
    'lastNameAr',
    'lastNameFr',
    'email',
    'phone',
    'cin',
    'professionAr',
    'professionFr',
    'addressAr',
    'addressFr',
  ];

  return searchableFields.map((field) => {
    return {
      [field]: { contains: search },
    };
  });
};

const licenseFilesFilter = (status: string[]): LicenseFileStatus[] =>
  status.map((status) => {
    switch (status) {
      case 'Undeposited': {
        return 'UNDEPOSITED';
      }
      case 'Finished': {
        return 'VALIDATED';
      }
      case 'Rejected': {
        return 'REJECTED';
      }
      default: {
        return 'ONGOING';
      }
    }
  });

export const getWhereObjFromFilters = (filters: TableFilters['get']): Prisma.StudentWhereInput => {
  let output: Prisma.StudentWhereInput['OR'] = [];

  if (filters.search) output = [...output, ...searchFilters(filters.search)];

  if (output.length === 0) return {};

  return { OR: output };
};

export const getWhereObjFromFiltersAndStatus = (filters: TableFilters['get']): Prisma.StudentWhereInput => {
  let output: Prisma.StudentWhereInput['AND'] = [];

  if (filters.search) output = [...output, { OR: searchFilters(filters.search) }];
  if (filters.licenseFileStatus.length > 0) {
    const licenseFileStatuses = licenseFilesFilter(filters.licenseFileStatus);
    output = [...output, { licenseFiles: { some: { status: { in: licenseFileStatuses } } } }];
  }
  return { AND: output };
};

export const getStudentStatusFromLicenseFiles = (licenseFiles: { status: LicenseFileStatus }[]): Student['status'] => {
  if (licenseFiles.length === 0) return 'not-started';

  const statuses = new Set(licenseFiles.map((licenseFile) => licenseFile.status));

  if (statuses.has('ONGOING')) return 'active';

  if (statuses.has('UNDEPOSITED')) return 'undeposited';

  if (statuses.has('VALIDATED')) return 'finished';

  if (statuses.has('REJECTED')) return 'rejected';

  return 'not-started';
};

export const getStudentCategoryFromLicenseFiles = (
  licenseFiles: { status: LicenseFileStatus; category: Category }[],
): Student['category'] => {
  if (licenseFiles.length === 0) return undefined;

  const onGoingLicenseFile = licenseFiles.find((licenseFile) => licenseFile.status === 'ONGOING');

  if (onGoingLicenseFile) return onGoingLicenseFile.category;

  const undepositedLicenseFile = licenseFiles.find((licenseFile) => licenseFile.status === 'UNDEPOSITED');

  if (undepositedLicenseFile) return undepositedLicenseFile.category;

  const validatedLicenseFile = licenseFiles.find((licenseFile) => licenseFile.status === 'VALIDATED');

  if (validatedLicenseFile) return validatedLicenseFile.category;

  return undefined;
};
