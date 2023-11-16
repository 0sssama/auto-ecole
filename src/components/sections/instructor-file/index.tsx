"use client";

import { Separator } from "@/components/ui/separator";
import { InfoFile } from "@/components/organisms";

import InstructorLicenseFilesTable from "./license-files-table";
import InstructorLessonsTable from "./lessons-table";

import type { InstructorProps } from "./types";

export default function Instructor({ instructor }: InstructorProps) {
  return (
    <div className="flex flex-col">
      <InfoFile data={instructor} type="instructor" />
      <Separator className="mb-6 mt-14" />
      <InstructorLicenseFilesTable instructorId={instructor.id} />
      <Separator className="mb-6 mt-14" />
      <InstructorLessonsTable instructorId={instructor.id} />
    </div>
  );
}
