import type { FC, ReactNode } from 'react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface UploadFileResponse {
  name: string;
  size: number;
  url: string;
}

export interface FileUploadOptions {
  endpoint: keyof OurFileRouter; // UploadThing endpoint
  acceptMultiple?: boolean;
  onUploadBegin?: (fileName: string) => void;
  onUploadError?: (message: string) => void;
  onUploadComplete?: (res: UploadFileResponse[]) => void;
}

export interface UseFileUploadComponentProps {
  children: ReactNode;
}

export type FileUploadReturn = {
  startUpload: () => Promise<{ response: UploadFileResponse[] }>;
  FileUpload: FC<UseFileUploadComponentProps>;
  acceptedExtensions: string;
  isUploading: boolean;
};

export type UseFileUploadHook = (options: FileUploadOptions) => FileUploadReturn;
