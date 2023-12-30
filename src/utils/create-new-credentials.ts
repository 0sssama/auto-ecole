import { cleanPhoneNumber } from './clean-phone-number';
import { snakeCaseTransformer as snake } from './snake-case-transformer';

interface CreateNewCredentialsOptions {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  cin?: string;
  isInstructor?: boolean;
}

export type ClerkCredentials = {
  username: string;
  password: string;
};

/**
 * Student/Other Credentials:
 *
 * username: <lastName>_<phoneNumber>
 * password: <lastName>@<cin>_student
 */

/**
 * Instructor Credentials:
 *
 * username: <lastName>_<phoneNumber>
 * password: <lastName>@<firstName>_instructor
 */

export const createNewCredentials = (options?: CreateNewCredentialsOptions): ClerkCredentials => {
  if (!options)
    return {
      username: '',
      password: '',
    };

  const { firstName = '', lastName = '', phoneNumber = '', cin = '', isInstructor = false } = options;

  return {
    username: `${snake(lastName)}_${cleanPhoneNumber(phoneNumber)}`,
    password: `${snake(lastName)}@${isInstructor ? snake(firstName) : snake(cin)}_${
      isInstructor ? 'instructor' : 'student'
    }`,
  };
};
