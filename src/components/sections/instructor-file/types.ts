export type Instructor = {
  id: number;
  profilePictureUrl: string | null;

  info: {
    fullName: string;
    username: string;
    phone: string;
    dateJoined: Date;
  };
};

export type InstructorProps = {
  instructor: Instructor;
};
