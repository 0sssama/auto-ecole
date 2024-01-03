import type { FC } from 'react';

interface LicenseFileExpensesTableProps {
  context: {
    licenseFileId: number;
  };
}

export type LicenseFileExpensesTableComponentType = FC<LicenseFileExpensesTableProps>;
