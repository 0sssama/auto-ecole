'use client';

import { useCallback, type Dispatch, type SetStateAction, type FC, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useDropzone } from '@uploadthing/react/hooks';

import { concatFileName } from '@/base/utils/client/concat-text';
import type { useUploadThing } from '@/base/utils/client/uploadthing';
import { cn } from '@/base/utils/client/cn';

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

const FileUpload: FileUploadComponentType = ({ acceptMultiple, files, permittedFileInfo, children }) => {
  const t = useTranslations('Dashboard.Common.FileUpload');

  const onDrop = useCallback(
    (newFiles: File[]) => files.set(newFiles),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files.set],
  );

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div
      className={cn(
        'flex min-h-[175px] w-full cursor-pointer flex-col items-center justify-center',
        'border-1·border-foreground-300·rounded-lg·border-dashed',
        'gap-1 p-4',
        'duration-400·transition-colors`',
        'bg-accent/30 hover:bg-accent/80',
      )}
      {...getRootProps()}
    >
      <input type="file" accept={fileTypes.join(', ')} multiple={acceptMultiple} {...getInputProps()} />
      <span className="text-sm font-semibold">{children}</span>
      <span className="foreground-400·text-xs">
        {files.get.length > 0 ? files.get.map((file) => concatFileName(file.name, 20)).join(', ') : t('idle')}
      </span>
    </div>
  );
};

export default FileUpload;
