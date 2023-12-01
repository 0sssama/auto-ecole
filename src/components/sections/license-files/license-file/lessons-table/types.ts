import type { FC } from "react";

interface LicenseFileLessonsTableProps {
  context: {
    licenseFileId: number;
    studentId: number;
    instructorId: number;
  };
}

export type LicenseFileLessonsTableComponentType =
  FC<LicenseFileLessonsTableProps>;
