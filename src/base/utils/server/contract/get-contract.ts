import format from 'date-fns/format';

import { prisma } from '@/server/db';
import type { ContractProps } from '@/components/sections/contract/contract.types';

import { getArabicLicenseFileCategory } from '../license-files/get-arabic-license-file-category';

export const getContract = async (id: number, orgId: string): Promise<ContractProps | null> => {
  if (id <= 0) return null;

  try {
    const licenseFile = await prisma.licenseFile.findUnique({
      where: {
        id,
        student: {
          clerkOrgId: orgId,
        },
      },
      select: {
        id: true,
        category: true,

        student: {
          select: {
            cin: true,
            birthdate: true,
            birthplaceAr: true,
            addressAr: true,

            school: {
              select: {
                name: true,
                numRegistreCommerce: true,
                numRegistreFiscale: true,
                numRegistrePermis: true,
                practiceHours: true,
                theoryHours: true,

                address: true,
                city: true,
                fax: true,
                phone: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!licenseFile) return null;

    return {
      date: format(new Date(), 'dd/MM/yyyy'),
      city: licenseFile.student.school.city,

      licenseFile: {
        id: String(licenseFile.id),
        category: getArabicLicenseFileCategory(licenseFile.category),
        practiceHours: licenseFile.student.school.practiceHours,
        theoryHours: licenseFile.student.school.theoryHours,
      },

      school: {
        name: licenseFile.student.school.name,
        numRegistreCommerce: licenseFile.student.school.numRegistreCommerce,
        numRegistreFiscale: licenseFile.student.school.numRegistreFiscale,
        numRegistrePermis: licenseFile.student.school.numRegistrePermis,
        city: licenseFile.student.school.city,
        address: licenseFile.student.school.address,
        phone: licenseFile.student.school.phone,
        fax: licenseFile.student.school.fax,
        email: licenseFile.student.school.email,
      },

      student: {
        cin: licenseFile.student.cin,
        birthdate: format(licenseFile.student.birthdate, 'dd/MM/yyyy'),
        birthplace: licenseFile.student.birthplaceAr,
        address: licenseFile.student.addressAr,
        numReferenceWeb: 'REFERENCE WEB',
      },
    };
  } catch {
    return null;
  }
};
