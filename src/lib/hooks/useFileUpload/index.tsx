import omit from "lodash/omit";
import { useState } from "react";
import { toast } from "sonner";
import { extension } from "mime-types";

import { FileUpload } from "@/components/atoms";
import { useUploadThing } from "@/utils/uploadthing";

import type { UseFileUploadComponentProps, UseFileUploadHook } from "./types";

export const useFileUpload: UseFileUploadHook = (options) => {
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

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: (res) =>
        onUploadComplete(res.map((r) => omit(r, ["serverData"]))),
      onUploadError: (err) => onUploadError(err.message),
      onUploadBegin,
    },
  );

  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("No endpoint provided for File Upload");
  }

  return {
    startUpload: async () => {
      if (files.length === 0) {
        toast.error("No file selected");

        return { response: [] };
      }

      const response = await startUpload(files);

      if (!response) return { response: [] };

      return {
        response: response.map((file) => omit(file, ["serverData"])),
      };
    },
    acceptedExtensions: Object.keys(permittedFileInfo?.config || {})
      .map((type) => `.${extension(type)}`)
      .join(", "),
    isUploading,
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
};
