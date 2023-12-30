// UNCOMMENT BEFORE RELEASE
// import { clerkClient } from "@clerk/nextjs";

import { prisma } from '@/server/db';
import type { StudentFolder } from '@/components/sections/students/student-file/types';

import { checkAdminStudentHierarchy } from '../check-admin-student-hierarchy';

export const getStudentFolder = async (studentId: number): Promise<StudentFolder | null> => {
  if (studentId <= 0) return null;

  const hasPermission = await checkAdminStudentHierarchy(studentId);

  if (!hasPermission) return null;

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      clerkUserId: true,

      firstNameFr: true,
      lastNameFr: true,

      firstNameAr: true,
      lastNameAr: true,

      addressAr: true,
      addressFr: true,

      professionAr: true,
      professionFr: true,

      phone: true,
      email: true,
      cin: true,
      birthdate: true,

      profilePicture: true,
      cinFile: true,
    },
  });

  if (!student) return null;

  return {
    id: student.id,

    profilePicture: student.profilePicture,
    cinFile: student.cinFile,

    info: {
      fullName: `${student.firstNameFr} ${student.lastNameFr}`,
      nameAr: `${student.lastNameAr} ${student.firstNameAr}`,

      addressFr: student.addressFr,
      addressAr: student.addressAr,

      professionFr: student.professionFr,
      professionAr: student.professionAr,

      phone: student.phone,
      email: student.email,
      cin: student.cin,
      birthdate: student.birthdate,
    },
  };
};
