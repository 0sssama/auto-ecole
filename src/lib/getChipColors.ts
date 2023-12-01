import { ExamStatus, LessonStatus, LicenseFileStatus } from "@prisma/client";
import type { ChipProps } from "@nextui-org/chip";

import type { Student } from "@/components/sections/students/list-table/schema";

export const getLicenseFileStatusChipColor = (
  status: LicenseFileStatus,
): ChipProps["color"] => {
  switch (status) {
    case LicenseFileStatus.ONGOING:
      return "secondary";
    case LicenseFileStatus.REJECTED:
      return "danger";
    case LicenseFileStatus.VALIDATED:
      return "success";
    default:
      return "primary";
  }
};

export const getExamStatusChipColor = (
  status: ExamStatus,
): ChipProps["color"] => {
  switch (status) {
    case ExamStatus.FAILED:
      return "danger";
    case ExamStatus.PENDING:
      return "primary";
    case ExamStatus.SUCCESS:
      return "success";
    default:
      return "primary";
  }
};

export const getLessonStatusChipColor = (
  status: LessonStatus,
): ChipProps["color"] => {
  switch (status) {
    case LessonStatus.RESERVED:
      return "secondary";
    case LessonStatus.CANCELLED:
      return "danger";
    case LessonStatus.DONE:
      return "success";
    default:
      return "primary";
  }
};

export const getLessonGradeChipColor = (grade: number): ChipProps["color"] => {
  switch (true) {
    case grade < 30:
      return "danger";
    case grade >= 30 && grade < 60:
      return "primary";
    case grade >= 60:
      return "success";
    default:
      return "primary";
  }
};

export const getStudentStatusChipColor = (
  status: Student["status"],
): ChipProps["color"] => {
  switch (status) {
    case "active":
      return "secondary";
    case "finished":
      return "success";
    case "not-started":
      return "primary";
    case "rejected":
      return "danger";
    default:
      return "primary";
  }
};
