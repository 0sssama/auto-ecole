import { Separator } from '@/components/ui/separator';
import { InfoFile } from '@/components/organisms';

import InstructorLicenseFilesTable from './license-files-table';
import InstructorLessonsTable from './lessons-table';
import type { InstructorComponentType } from './types';

const Instructor: InstructorComponentType = ({ instructor }) => (
  <div className="flex flex-col">
    <InfoFile data={{ ...instructor, cinFile: '' }} type="instructor" />
    <Separator className="mb-6 mt-14" />
    <InstructorLicenseFilesTable instructorId={instructor.id} />
    <Separator className="mb-6 mt-14" />
    <InstructorLessonsTable instructorId={instructor.id} />
  </div>
);

export default Instructor;
