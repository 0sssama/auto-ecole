import type { FC } from "react";

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

interface InstructorProps {
  instructor: Instructor;
}

export type InstructorComponentType = FC<InstructorProps>;
