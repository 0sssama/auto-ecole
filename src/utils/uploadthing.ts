import { generateComponents } from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();

export { useUploadThing, uploadFiles, UploadButton, UploadDropzone, Uploader };
