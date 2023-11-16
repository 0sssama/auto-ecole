"use client";

import { Separator } from "@/components/ui/separator";
import { InfoFile } from "@/components/organisms";

import type { InstructorProps } from "./types";

export default function Instructor({ instructor }: InstructorProps) {
  return (
    <div className="flex flex-col">
      <InfoFile data={instructor} type="instructor" />
      <Separator className="mb-6 mt-14" />
      {/* <StudentLicenseFilesTable studentId={student.id} /> */}
      {/* <Separator className="mb-6 mt-14" /> */}
      {/* <StudentLessonsTable studentId={student.id} /> */}
    </div>
  );
}
