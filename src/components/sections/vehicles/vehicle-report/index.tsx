import { Separator } from "@/components/ui/separator";
import { InfoFile } from "@/components/organisms";

import type { VehicleReportComponentType } from "./types";

const VehicleReport: VehicleReportComponentType = ({ vehicle }) => {
  return (
    <div className="flex flex-col">
      <InfoFile
        data={{
          id: vehicle.id,
          profilePictureUrl: vehicle.image,

          info: {
            fullName: `${vehicle.brand} ${vehicle.name}`,
            brand: vehicle.brand,
            vehicleType: vehicle.type,
            instructor: vehicle.instructor,
          },
        }}
        type="vehicle"
      />
      <Separator className="mb-6 mt-14" />
      {/* <StudentLicenseFilesTable studentId={student.id} /> */}
      {/* <Separator className="mb-6 mt-14" /> */}
      {/* <StudentLessonsTable studentId={student.id} /> */}
      {/* <Separator className="mb-6 mt-14" /> */}
      {/* <StudentPaymentsTable studentId={student.id} /> */}
    </div>
  );
};

export default VehicleReport;
