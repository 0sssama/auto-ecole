import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import type { useUploadThing } from '@/base/utils/client/uploadthing';

export type FileUploadProps = {
  acceptMultiple: boolean;
  children: ReactNode;
  permittedFileInfo: ReturnType<typeof useUploadThing>['permittedFileInfo'];
  files: {
    get: File[];
    set: Dispatch<SetStateAction<File[]>>;
  };
};

export type FileUploadComponentType = FC<FileUploadProps>;
