import type { InfoFileType } from './info-file.types';

export const translatePrefix = (type: InfoFileType) => {
  switch (type) {
    case 'instructor': {
      return 'Instructor';
    }
    case 'student': {
      return 'Student';
    }
    case 'licenseFile': {
      return 'LicenseFile';
    }
    case 'vehicle': {
      return 'Vehicle';
    }
    default: {
      return '';
    }
  }
};
