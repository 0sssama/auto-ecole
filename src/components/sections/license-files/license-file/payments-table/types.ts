import type { FC } from "react";

interface LicenseFilePaymentsTableProps {
  context: {
    licenseFileId: number;
  };
}

export type LicenseFilePaymentsTableComponentType =
  FC<LicenseFilePaymentsTableProps>;
