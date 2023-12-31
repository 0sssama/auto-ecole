import { Separator } from '@/components/ui/separator';
import { InfoFile } from '@/components/organisms';

import LicenseFileExamsTable from './exams-table';
import LicenseFileLessonsTable from './lessons-table';
import LicenseFilePaymentsTable from './payments-table';
import LicenseFileExpensesTable from './expenses-table';
import type { LicenseFileComponentType } from './types';

const LicenseFile: LicenseFileComponentType = ({ licenseFile }) => {
  const { id, ...licenseFileNoId } = licenseFile;

  return (
    <div className="flex flex-col">
      <InfoFile
        data={{
          id,
          profilePicture: '',
          cinFile: '',

          info: licenseFileNoId,
        }}
        type="licenseFile"
      />
      <Separator className="mb-6 mt-14" />
      <LicenseFileExamsTable licenseFileId={licenseFile.id} />
      <Separator className="mb-6 mt-14" />
      <LicenseFileLessonsTable
        context={{
          licenseFileId: licenseFile.id,
          studentId: licenseFile.student.id,
          instructorId: licenseFile.instructor.id,
        }}
      />
      <Separator className="mb-6 mt-14" />
      <LicenseFilePaymentsTable context={{ licenseFileId: licenseFile.id }} />
      <Separator className="mb-6 mt-14" />
      <LicenseFileExpensesTable context={{ licenseFileId: licenseFile.id }} />
    </div>
  );
};

export default LicenseFile;
