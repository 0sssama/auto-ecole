import type { FC } from 'react';

import type { InfoFileType } from '@/components/organisms/info-file';

export interface ProfileImageColumnProps {
  profilePicture: string;
  cinFile: string;
  fullName: string;
  type: InfoFileType;
}

export type ProfileImageColumnComponentType = FC<ProfileImageColumnProps>;
