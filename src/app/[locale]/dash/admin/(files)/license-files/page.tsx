import { auth } from '@clerk/nextjs';

import { getLicenseFile } from '@/base/utils/server/license-files/get-license-file';
import { LicenseFile } from '@/components/sections/license-files';
import { getContract } from '@/base/utils/server/contract/get-contract';
import { Contract } from '@/components/sections/contract';

import LicenseFilesPage from './_components/license-files';
import LicenseFileNotFound from './_components/not-found';

export default async function LicenseFiles({
  searchParams: { licenseFileId, renderContract },
}: {
  searchParams: {
    licenseFileId: string | undefined;
    renderContract: string | undefined;
  };
}) {
  if (licenseFileId === undefined) return <LicenseFilesPage />;

  const id = Number(licenseFileId);

  if (Number.isNaN(id) || id <= 0) return <LicenseFileNotFound />;

  const contract = renderContract === 'true';

  const { orgId } = auth();

  if (contract) {
    const contract = await getContract(id, orgId!);

    if (!contract) return 'No contract for you.';

    return <Contract {...contract} />;
  }

  const licenseFile = await getLicenseFile(id, orgId!);

  if (!licenseFile) return <LicenseFileNotFound />;

  return <LicenseFile licenseFile={licenseFile} />;
}
