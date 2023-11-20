export type StudentFolder = {
  id: number;
  profilePictureUrl: string | null;
  info: {
    fullName: string;
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
