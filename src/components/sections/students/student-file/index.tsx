import { Separator } from '@/components/ui/separator';
import { InfoFile } from '@/components/organisms';

import StudentLicenseFilesTable from './license-files-table';
import StudentLessonsTable from './lessons-table';
import StudentPaymentsTable from './payments-table';
import type { StudentFileComponentType } from './types';

const StudentFile: StudentFileComponentType = ({ student }) => (
  <div className="flex flex-col">
    <InfoFile data={student} type="student" />
    <Separator className="mb-6 mt-14" />
    <StudentLicenseFilesTable studentId={student.id} />
    <Separator className="mb-6 mt-14" />
    <StudentLessonsTable studentId={student.id} />
    <Separator className="mb-6 mt-14" />
    <StudentPaymentsTable studentId={student.id} />
  </div>
);

export default StudentFile;
