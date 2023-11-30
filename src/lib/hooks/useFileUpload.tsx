import omit from "lodash/omit";
import { toast } from "sonner";
import { extension } from "mime-types";
import { type FC, type ReactNode, useState } from "react";

import { FileUpload } from "@/components/atoms";
import { useUploadThing } from "@/utils/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type UploadFileResponse = {
  name: string;
  size: number;
  url: string;
};

export type FileUploadOptions = {
  endpoint: keyof OurFileRouter; // UploadThing endpoint
  acceptMultiple?: boolean;
  onUploadBegin?: (fileName: string) => void;
  onUploadError?: (message: string) => void;
  onUploadComplete?: (res: UploadFileResponse[]) => void;
};

type UseFileUploadComponentProps = { children: ReactNode };

export type FileUploadReturn = {
  startUpload: () => Promise<{ response: UploadFileResponse[] }>;
  FileUpload: FC<UseFileUploadComponentProps>;
  acceptedExtensions: string;
};

export function useFileUpload(options: FileUploadOptions): FileUploadReturn {
  const {
    endpoint,
    acceptMultiple = false,
    onUploadBegin = () => {},
    onUploadError = () => {
      toast.error("Error occurred while uploading file");
    },
    onUploadComplete = () => {
      toast.success("File(s) uploaded successfully");
    },
  } = options;

  const [files, setFiles] = useState<File[]>([]);

  const { startUpload, permittedFileInfo } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) =>
      onUploadComplete(res.map((r) => omit(r, ["serverData"]))),
    onUploadError: (err) => onUploadError(err.message),
    onUploadBegin,
  });

  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("No endpoint provided for File Upload");
  }

  return {
    startUpload: async () => {
      if (files.length === 0) {
        toast.error("No file selected");

        return { response: [] };
      }

      console.log("started upload");
      const response = await startUpload(files);

      if (!response) return { response: [] };

      console.log("finished upload");
      return {
        response: response.map((file) => omit(file, ["serverData"])),
      };
    },
    acceptedExtensions: Object.keys(permittedFileInfo?.config || {})
      .map((type) => `.${extension(type)}`)
      .join(", "),
    FileUpload: ({ children }: UseFileUploadComponentProps) => {
      return (
        <FileUpload
          acceptMultiple={acceptMultiple}
          permittedFileInfo={permittedFileInfo}
          files={{
            get: files,
            set: setFiles,
          }}
        >
          {children}
        </FileUpload>
      );
    },
  };
}
