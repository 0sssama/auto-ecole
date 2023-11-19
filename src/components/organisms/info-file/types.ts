export type InfoFileType = "student" | "instructor" | "licenseFile";

export type InfoFileProps = {
  data: {
    id: number;
    profilePictureUrl: string | null;

    info: Record<string, any>;
  };
  type: InfoFileType;
};
