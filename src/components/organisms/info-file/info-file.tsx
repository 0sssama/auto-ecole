'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/atoms/link';
import { Button } from '@/components/ui/button';
import { DossierInfo } from '@/components/molecules/dossier-info';
import { ProfileImageColumn } from '@/components/molecules/profile-image-column';
import { cn } from '@/base/utils/client/cn';

import type { InfoFileComponentType } from './info-file.types';
import { translatePrefix } from './info-file.helpers';

const InfoFile: InfoFileComponentType = ({ data, type }) => {
  const pathname = usePathname();

  const t = useTranslations('Dashboard.Dossier.Labels');

  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 gap-8',
        type === 'licenseFile' ? 'md:grid-cols-1' : 'md:grid-cols-[200px_1fr]',
      )}
    >
      {type !== 'licenseFile' && (
        <ProfileImageColumn
          profilePicture={data.profilePicture}
          cinFile={data.cinFile}
          fullName={data.info.fullName}
          type={type}
        />
      )}
      <div
        className={cn('grid w-full grid-cols-1 gap-6', type === 'licenseFile' ? 'md:grid-cols-3' : 'md:grid-cols-2')}
        style={{
          gridTemplateRows: 'auto 1fr',
        }}
      >
        {Object.keys(data.info).map((key) => (
          <DossierInfo
            key={key}
            labelId={key}
            translatePrefix={translatePrefix(type)}
            value={data.info[key as keyof typeof data.info]}
          />
        ))}
        {type === 'licenseFile' && (
          <Link
            href={`${pathname}?licenseFileId=${data.id}&renderContract=true`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>{t(`LicenseFile.print-contract`)}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoFile;