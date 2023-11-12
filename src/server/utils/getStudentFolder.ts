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
    },
  });

  if (!student) return null;

  return {
    id: student.id,
    name: `${student.firstNameFr} ${student.lastNameFr}`,
  };
};
