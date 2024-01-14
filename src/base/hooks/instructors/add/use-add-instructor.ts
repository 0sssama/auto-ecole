import { useState } from 'react';

import type { TRPCOptions } from '@/base/types';
import type { InstructorFormValues } from '@/components/molecules/modal/instructors/add/add.types';

import { useDeleteClerkUser } from '../../clerk/use-delete-clerk-user';

import { useAddInstructorToDb } from './use-add-instructor-to-db';
import { useAddInstructorToClerk } from './use-add-instructor-to-clerk';

export const useAddInstructor = (options?: TRPCOptions) => {
  const [userClerkId, setUserClerkId] = useState<string | null>(null);
  const [values, setValues] = useState<InstructorFormValues | null>(null);

  const { onSuccess, onError } = options ?? {};

  const {
    deleteClerkUser: deleteInstructorFromClerk,
    isDeleting,
    deletionError,
  } = useDeleteClerkUser({
    ...(onError ? { onError, onSuccess: onError } : {}),
  });

  const { addInstructorToDb, isAddingInstructorToDb, addInstructorToDbError } = useAddInstructorToDb({
    ...(onSuccess ? { onSuccess } : {}),
    onError: () => {
      if (!userClerkId) return;

      deleteInstructorFromClerk(userClerkId);
    },
  });

  const { addInstructorToClerk, isAddingInstructorToClerk, addInstructorToClerkError } = useAddInstructorToClerk({
    onSuccess: (data) => {
      setUserClerkId(data.clerkId);

      if (!values) return;

      addInstructorToDb({
        ...values,
        clerkId: data.clerkId,
      });
    },
    ...(onError ? { onError } : {}),
  });

  return {
    createInstructor: (inputValues: InstructorFormValues) => {
      setValues(inputValues);
      addInstructorToClerk({
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        phoneNumber: inputValues.phone,
      });
    },
    isCreating: isAddingInstructorToClerk || isAddingInstructorToDb || isDeleting,
    creationError: addInstructorToClerkError || addInstructorToDbError || deletionError,
  };
};
