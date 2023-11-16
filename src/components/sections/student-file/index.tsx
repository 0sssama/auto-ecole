"use client";

import { Separator } from "@/components/ui/separator";
import { InfoFile } from "@/components/organisms";

import StudentLicenseFilesTable from "./license-file-table";
import StudentLessonsTable from "./lessons-table";
import StudentPaymentsTable from "./payments-table";

import type { StudentFolder } from "./types";

export default function StudentFile({ student }: { student: StudentFolder }) {
  return (
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
}
