import type { FC } from 'react';

export type InfoFileType = 'student' | 'instructor' | 'licenseFile' | 'vehicle';

export type InfoFileProps = {
  data: {
    id: number;
    profilePictureUrl: string | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: Record<string, any>;
  };
  type: InfoFileType;
};

export type InfoFileComponentType = FC<InfoFileProps>;
