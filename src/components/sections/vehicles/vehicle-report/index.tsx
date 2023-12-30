import { Separator } from '@/components/ui/separator';
import { InfoFile } from '@/components/organisms';

import VehicleExpensesTable from './expenses-table';
import type { VehicleReportComponentType } from './types';

const VehicleReport: VehicleReportComponentType = ({ vehicle }) => (
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
    <VehicleExpensesTable vehicleId={vehicle.id} />
  </div>
);

export default VehicleReport;
