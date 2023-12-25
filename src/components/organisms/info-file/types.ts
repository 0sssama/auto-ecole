import type { FC } from "react";

export type InfoFileType = "student" | "instructor" | "licenseFile" | "vehicle";

export type InfoFileProps = {
  data: {
    id: number;
    profilePictureUrl: string | null;

    info: Record<string, any>;
  };
  type: InfoFileType;
};

export type InfoFileComponentType = FC<InfoFileProps>;
