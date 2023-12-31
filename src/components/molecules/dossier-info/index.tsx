'use client';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User } from '@nextui-org/user';
import { Chip } from '@nextui-org/chip';
import type { LicenseFileStatus } from '@prisma/client';

import { cn } from '@/base/utils/client/cn';
import { getLicenseFileStatusChipColor } from '@/base/utils/client/get-chip-colors';

import type { DossierInfoProps, InfoDataProps, InfoTypes } from './types';

function InfoData<InfoT extends InfoTypes>({ labelId, value }: InfoDataProps<InfoT>) {
  const t = useTranslations('Dashboard.Dossier.Labels');

  switch (labelId) {
    case 'id': {
      return <p>{value as number}</p>;
    }
    case 'licenseFileStatus': {
      return (
        <Chip color={getLicenseFileStatusChipColor(value as LicenseFileStatus)} size="sm">
          <span className="mt-2 !text-[10px] font-bold md:text-sm">
            {t('LicenseFile.Status.' + value).toUpperCase()}
          </span>
        </Chip>
      );
    }
    case 'vehicleType': {
      return <p>{t('Vehicle.Type.' + value)}</p>;
    }
    default: {
      break;
    }
  }

  if (['student', 'instructor', 'createdBy'].includes(labelId))
    return (
      <Link
        href={`/dash/admin/${labelId === 'createdBy' ? 'editor' : labelId}s?${
          labelId === 'createdBy' ? 'editor' : labelId
          //   @ts-ignore
        }Id=${value.id}`}
      >
        <User
          className="mt-2"
          //   @ts-ignore
          name={value.fullName}
          description={labelId === 'createdBy' ? t('LicenseFile.UserDesc.admin') : t('LicenseFile.UserDesc.' + labelId)}
          avatarProps={{
            //   @ts-ignore
            src: value.profilePictureUrl,
            size: 'sm',
          }}
        />
      </Link>
    );

  switch (typeof value) {
    case 'string': {
      return (
        <p
          className={cn(
            'w-full',
            labelId.endsWith('Ar') && 'text-left', // we want arabic text to keep left alignment
          )}
          dir={labelId.endsWith('Ar') ? 'rtl' : 'ltr'}
        >
          {value}
        </p>
      );
    }

    case 'boolean': {
      return <p>{value ? 'Yes' : 'No'}</p>;
    }

    case 'number': {
      return <p>{value} DH</p>;
    }

    default: {
      return <p>{formatDistanceToNow(new Date(value), { addSuffix: true })}</p>;
    }
  }
}

const forbiddenInfoXD = new Set(['profilePictureUrl']);

function DossierInfo<InfoT extends InfoTypes>({
  labelId,
  value,
  setValue,
  editing,
  translatePrefix,
}: DossierInfoProps<InfoT>) {
  const t = useTranslations('Dashboard.Dossier.Labels');

  if (forbiddenInfoXD.has(labelId)) return null;

  return (
    <div className={cn('flex flex-col gap-2', labelId === 'id' && 'col-span-2')}>
      <label className="text-xs font-bold uppercase text-muted-foreground">{t(`${translatePrefix}.${labelId}`)}</label>
      <InfoData {...{ labelId, value, setValue, editing }} />
    </div>
  );
}

export default DossierInfo;
