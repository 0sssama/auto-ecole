export type StudentFolder = {
  id: number;
  profilePictureUrl: string | null;
  info: {
    nameFr: string;
    nameAr: string;

    addressFr: string;
    addressAr: string;

    professionFr: string;
    professionAr: string;

    phone: string;
    email: string;
    cin: string;
    birthdate: Date;
  };
};

export type ProfileImageColumnProps = {
  profilePictureUrl: string | null;
  studentName: string;
};

export type InfoImageRowProps = {
  student: StudentFolder;
};
