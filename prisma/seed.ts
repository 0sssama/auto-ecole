import { PrismaClient } from "@prisma/client";

import { seedSuperAdmin, seedSecretary } from "./seed/seedSuperAdmin";
import { seedStudents } from "./seed/seedStudents";
import { seedInstructors } from "./seed/seedInstructors";
import { seedLicenseFiles } from "./seed/seedLicenseFiles";

export const clerkOrgId = "org_2Vr89LWYt1FRrhR7ALcBq5HqYhC";
export const superAdminClerkId = "user_2YBRtRz9u0fyELr5fus2ty0aOeo";
export const secretaryClerkId = "user_2ZMBck8CD5AsqoewQZoLCbwFhU7";

const twirlTimer = () => {
  const P = ["\\", "|", "/", "-"];
  let x = 0;

  return setInterval(() => {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);
};

async function main() {
  try {
    const twirler = twirlTimer();
    console.time("Seeding database");
    const prisma = new PrismaClient();

    console.time("Seeding SuperAdmin");
    const superAdmin = await seedSuperAdmin(prisma);
    console.timeEnd("Seeding SuperAdmin");

    console.time("Seeding Secretary");
    await seedSecretary(prisma);
    console.timeEnd("Seeding Secretary");

    console.time("Seeding Students");
    const students = await seedStudents(prisma, superAdmin.id);
    console.timeEnd("Seeding Students");

    console.time("Seeding Instructors");
    const instructors = await seedInstructors(prisma);
    console.timeEnd("Seeding Instructors");

    console.time("Seeding LicenseFiles");
    await seedLicenseFiles(
      prisma,
      instructors.map((instructor) => instructor.id),
      students.map((student) => student.id),
      superAdmin.id,
    );
    console.timeEnd("Seeding LicenseFiles");

    console.timeEnd("Seeding database");
    clearInterval(twirler);
  } catch (error) {
    console.error(error);
  }
}

main();
