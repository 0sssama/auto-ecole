'use client';

import Image from 'next/image';
import snakeCase from 'lodash/snakeCase';
import { useTranslations } from 'next-intl';
import { FolderDown, ImageDown, UploadCloud, UserCircle2 } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/atoms';

import type { ProfileImageColumnProps } from './types';

const ProfileImageColumn: FC<ProfileImageColumnProps> = ({ profilePicture, cinFile, fullName, type }) => {
  const t = useTranslations('Dashboard.Dossier.ImageColumn');

  return (
    <div className="flex w-full max-w-[calc(100vw-3rem)] items-center gap-4 md:flex-col">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="group relative flex aspect-square w-full max-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted">
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gray-600/40 p-1 transition-all duration-400 ease-in group-hover:bg-gray-600/80 group-hover:p-2">
            <UploadCloud className="text-white" size={16} />
          </div>
          {profilePicture ? (
            <Image src={profilePicture} alt={fullName} fill />
          ) : (
            <UserCircle2 className="text-muted-foreground" size={32} />
          )}
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-bold">{fullName}</p>
          <p className="text-xs text-muted-foreground">{t(type)}</p>
        </div>
      </div>
      {type === 'student' && (
        <div className="flex w-full flex-col gap-2">
          <Button className="w-full text-sm" variant="default" size="sm">
            <FolderDown size={16} className="mr-2" />
            {t(`${type}-file`)}
          </Button>
          {cinFile && (
            <Link download={`${snakeCase(fullName)}_cin.pdf`} href={cinFile}>
              <Button className="w-full text-sm" variant="outline" size="sm">
                <ImageDown size={16} className="mr-2" />
                {t(`${type}-cin`)}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImageColumn;
