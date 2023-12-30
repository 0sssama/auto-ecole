import type { FC } from 'react';

export type Instructor = {
  id: number;
  profilePicture: string;

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
