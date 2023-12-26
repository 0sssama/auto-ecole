"use client";

import {
  useCallback,
  type Dispatch,
  type SetStateAction,
  type FC,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react/hooks";

import { concatFileName } from "@/utils/concatText";
import { useUploadThing } from "@/utils/uploadthing";
import { cn } from "@/lib/cn";

export type FileUploadProps = {
  acceptMultiple: boolean;
  children: ReactNode;
  permittedFileInfo: ReturnType<typeof useUploadThing>["permittedFileInfo"];
  files: {
    get: File[];
    set: Dispatch<SetStateAction<File[]>>;
  };
};

export type FileUploadComponentType = FC<FileUploadProps>;

const FileUpload: FileUploadComponentType = ({
  acceptMultiple,
  files,
  permittedFileInfo,
  children,
}) => {
  const t = useTranslations("Dashboard.Common.FileUpload");

  const onDrop = useCallback(
    (newFiles: File[]) => files.set(newFiles),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files.set],
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center min-h-[175px] cursor-pointer",
        " border-1 border-dashed rounded-lg border-foreground-300",
        "p-4 gap-1",
        "transition-colors duration-400",
        "bg-accent/30 hover:bg-accent/80",
      )}
      {...getRootProps()}
    >
      <input
        type="file"
        accept={fileTypes.join(", ")}
        multiple={acceptMultiple}
        {...getInputProps()}
      />
      <span className="text-sm font-semibold">{children}</span>
      <span className="text-xs text-foreground-400">
        {files.get.length
          ? files.get.map((file) => concatFileName(file.name, 20)).join(", ")
          : t("idle")}
      </span>
    </div>
  );
};

export default FileUpload;
