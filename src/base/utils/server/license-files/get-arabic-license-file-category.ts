import { Category } from '@prisma/client';

export const getArabicLicenseFileCategory = (category: Category): string => {
  switch (category) {
    case Category.A: {
      return 'أ';
    }
    case Category.B: {
      return 'ب';
    }
    case Category.C: {
      return 'ج';
    }
    case Category.EC: {
      return 'هـ(ج)';
    }
    default: {
      return '';
    }
  }
};
