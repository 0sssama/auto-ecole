import { PrismaClient } from '@prisma/client';

import { seedSuperAdmin, seedSecretary } from './seed/seed-super-admin';
import { seedStudents } from './seed/seed-students';
import { seedInstructors } from './seed/seed-instructors';
import { seedLicenseFiles } from './seed/seed-license-files';

export const clerkOrgId = 'org_2Vr89LWYt1FRrhR7ALcBq5HqYhC';
export const superAdminClerkId = 'user_2YBRtRz9u0fyELr5fus2ty0aOeo';
export const secretaryClerkId = 'user_2ZMBck8CD5AsqoewQZoLCbwFhU7';

const twirlTimer = () => {
  const P = ['\\', '|', '/', '-'];
  let x = 0;

  return setInterval(() => {
    process.stdout.write('\r' + P[x++]);
    x &= 3;
  }, 250);
};

async function main() {
  try {
    const twirler = twirlTimer();
    console.time('Seeding database');
    const prisma = new PrismaClient();

    console.time('Seeding SuperAdmin');
    const superAdmin = await seedSuperAdmin(prisma);
    console.timeEnd('Seeding SuperAdmin');

    console.time('Seeding Secretary');
    await seedSecretary(prisma);
    console.timeEnd('Seeding Secretary');

    console.time('Seeding Students');
    const students = await seedStudents(prisma, superAdmin.id);
    console.timeEnd('Seeding Students');

    console.time('Seeding Instructors');
    const instructors = await seedInstructors(prisma);
    console.timeEnd('Seeding Instructors');

    console.time('Seeding LicenseFiles');
    await seedLicenseFiles(
      prisma,
      instructors.map((instructor) => instructor.id),
      students.map((student) => student.id),
      superAdmin.id,
    );
    console.timeEnd('Seeding LicenseFiles');

    console.timeEnd('Seeding database');
    clearInterval(twirler);
  } catch (error) {
    console.error(error);
  }
}

await main();
