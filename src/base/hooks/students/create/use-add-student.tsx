import { useState } from 'react';
import type { z } from 'zod';

import type { TRPCOptions } from '@/base/types';
import type { studentFormSchema } from '@/base/schemas/student-form.schema';

import { useDeleteClerkUser } from '../../clerk/use-delete-clerk-user';

import { useAddStudentToClerk } from './use-add-student-to-clerk';
import { useAddStudentToDb } from './use-add-student-to-db';

type InputValuesType = z.infer<typeof studentFormSchema>;

export const useAddStudent = (options?: TRPCOptions) => {
  const [userClerkId, setUserClerkId] = useState<string | null>(null);
  const [values, setValues] = useState<InputValuesType | null>(null);

  const { onSuccess, onError } = options ?? {};

  const {
    deleteClerkUser: deleteStudentFromClerk,
    isDeleting,
    deletionError,
  } = useDeleteClerkUser({
    ...(onError ? { onError, onSuccess: onError } : {}),
  });

  const {
    addStudentToClerk,
    isAdding: isAddingToClerk,
    additionError: clerkAdditionError,
  } = useAddStudentToClerk({
    onSuccess: (data: { clerkId: string }) => {
      setUserClerkId(data.clerkId);

      if (!values) return;

      addStudentToDb({
        ...values,
        clerkId: data.clerkId,
      });
    },
    ...(onError ? { onError } : {}),
  });

  const {
    addStudentToDb,
    isAdding: isAddingToDb,
    additionError: dbAdditionError,
  } = useAddStudentToDb({
    ...(onSuccess ? { onSuccess } : {}),
    onError: () => {
      if (!userClerkId) return;

      deleteStudentFromClerk(userClerkId);
    },
  });

  return {
    createStudent: (inputValues: InputValuesType) => {
      setValues(inputValues);
      addStudentToClerk({
        emailAddress: inputValues.email,
        firstName: inputValues.firstNameFr,
        lastName: inputValues.lastNameFr,
        phoneNumber: inputValues.phone,
        cin: inputValues.cin,
      });
    },
    isCreating: isAddingToClerk || isAddingToDb || isDeleting,
    creationError: clerkAdditionError || dbAdditionError || deletionError,
  };
};
