"use client";

// import { Separator } from "@/components/ui/separator";
// import { InfoFile } from "@/components/organisms";

import type { VehicleReportComponentType } from "./types";

const VehicleReport: VehicleReportComponentType = ({ vehicle }) => {
  return (
    <div className="flex flex-col">
      Vehicle Nom: {vehicle.id}
      {/* <InfoFile data={student} type="student" />
      <Separator className="mb-6 mt-14" />
      <StudentLicenseFilesTable studentId={student.id} />
      <Separator className="mb-6 mt-14" />
      <StudentLessonsTable studentId={student.id} />
      <Separator className="mb-6 mt-14" />
      <StudentPaymentsTable studentId={student.id} /> */}
    </div>
  );
};

export default VehicleReport;
