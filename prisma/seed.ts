import { PrismaClient } from '@prisma/client';

import { seedSuperAdmins, seedSecretaries } from './seed/seed-super-admins';
import { seedStudents } from './seed/seed-students';
import { seedInstructors } from './seed/seed-instructors';
import { seedLicenseFiles } from './seed/seed-license-files';
import { seedSchool } from './seed/seed-school';
import { seedCashFund } from './seed/seed-cash-fund';

export const clerkOrgId = 'org_2Vr89LWYt1FRrhR7ALcBq5HqYhC';
export const superAdminClerkIds = [
  {
    username: 'ecpp_super_admin',
    fullName: 'ECPP SUPER ADMIN',
    id: 'user_2YBRtRz9u0fyELr5fus2ty0aOeo',
  },
  {
    username: 'osm_super_admin',
    fullName: 'OSM SUPER ADMIN',
    id: 'user_2YPTIqDuUclX7PcPkZJeRIyhHTv',
  },
];
export const secretaryClerkIds = ['user_2ZMBck8CD5AsqoewQZoLCbwFhU7'];

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

    console.time('Seeding School');
    await seedSchool(prisma);
    console.timeEnd('Seeding School');

    console.time('Seeding Cash Fund');
    const cashFund = await seedCashFund(prisma);
    console.timeEnd('Seeding Cash Fund');

    console.time('Seeding SuperAdmin');
    const superAdmins = await seedSuperAdmins(prisma);
    console.timeEnd('Seeding SuperAdmin');

    console.time('Seeding Secretary');
    await seedSecretaries(prisma);
    console.timeEnd('Seeding Secretary');

    // ask user if they want to continue seeding, if not stop
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Continue seeding? (press 'n' if we are in PROD) (y/n) `, (answer: string) => {
      if (answer === 'n') {
        console.log('Stopping seeding...');
        process.exit(0);
      }
      readline.close();
    });

    console.time('Seeding Students');
    const students = await seedStudents(prisma, superAdmins[0].id);
    console.timeEnd('Seeding Students');

    console.time('Seeding Instructors');
    const instructors = await seedInstructors(prisma);
    console.timeEnd('Seeding Instructors');

    console.time('Seeding LicenseFiles');
    await seedLicenseFiles(
      prisma,
      instructors.map((instructor) => instructor.id),
      students.map((student) => student.id),
      superAdmins[0].id,
      cashFund.id,
    );
    console.timeEnd('Seeding LicenseFiles');

    console.timeEnd('Seeding database');
    clearInterval(twirler);
  } catch (error) {
    console.error(error);
  }
}

main();
