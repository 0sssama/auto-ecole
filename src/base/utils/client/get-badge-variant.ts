import { ExamStatus, LessonStatus, LicenseFileStatus } from '@prisma/client';
import type { VariantProps } from 'class-variance-authority';

import type { Student } from '@/components/sections/students/list-table/schema';
import type { Badge } from '@/components/ui/badge';

export const getLicenseFileStatusBadgeVariant = (status: LicenseFileStatus): VariantProps<typeof Badge>['variant'] => {
  switch (status) {
    case LicenseFileStatus.ONGOING: {
      return 'secondary';
    }
    case LicenseFileStatus.REJECTED: {
      return 'destructive';
    }
    case LicenseFileStatus.VALIDATED: {
      return 'success';
    }
    case LicenseFileStatus.UNDEPOSITED: {
      return 'warning';
    }
    default: {
      return 'default';
    }
  }
};

export const getExamStatusBadgeVariant = (status: ExamStatus): VariantProps<typeof Badge>['variant'] => {
  switch (status) {
    case ExamStatus.FAILED: {
      return 'destructive';
    }
    case ExamStatus.PENDING: {
      return 'default';
    }
    case ExamStatus.SUCCESS: {
      return 'success';
    }
    default: {
      return 'default';
    }
  }
};

export const getLessonStatusBadgeVariant = (status: LessonStatus): VariantProps<typeof Badge>['variant'] => {
  switch (status) {
    case LessonStatus.RESERVED: {
      return 'secondary';
    }
    case LessonStatus.CANCELLED: {
      return 'destructive';
    }
    case LessonStatus.DONE: {
      return 'success';
    }
    default: {
      return 'default';
    }
  }
};

export const getLessonGradeBadgeVariant = (grade: number): VariantProps<typeof Badge>['variant'] => {
  switch (true) {
    case grade < 30: {
      return 'destructive';
    }
    case grade >= 30 && grade < 60: {
      return 'default';
    }
    case grade >= 60: {
      return 'success';
    }
    default: {
      return 'default';
    }
  }
};

export const getStudentStatusBadgeVariant = (status: Student['status']): VariantProps<typeof Badge>['variant'] => {
  switch (status) {
    case 'active': {
      return 'secondary';
    }
    case 'finished': {
      return 'success';
    }
    case 'undeposited': {
      return 'warning';
    }
    case 'not-started': {
      return 'default';
    }
    case 'rejected': {
      return 'destructive';
    }
    default: {
      return 'default';
    }
  }
};
