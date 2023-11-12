import { prisma } from "@/server/db";
import { checkAdminStudentHierarchy } from "./checkAdminStudentHierarchy";

export const getStudentFolder = async (studentId: number) => {
  if (studentId <= 0) return null;

  const hasPermission = await checkAdminStudentHierarchy(studentId);

  if (!hasPermission) return null;

  const student = await prisma.customer.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,

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
    },
  });

  if (!student) return null;

  return {
    id: student.id,

    nameFr: `${student.firstNameFr} ${student.lastNameFr}`,
    nameAr: `${student.firstNameAr} ${student.lastNameAr}`,

    addressFr: student.addressFr,
    addressAr: student.addressAr,

    professionFr: student.professionFr,
    professionAr: student.professionAr,

    phone: student.phone,
    email: student.email,
    cin: student.cin,
    birthdate: student.birthdate,
  };
};
