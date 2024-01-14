import type { FC } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

type FormProps<TFormValues extends FieldValues, TContext = undefined> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<TFormValues, any, undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: () => any;
  className?: string;
} & (TContext extends undefined
  ? {
      // empty object
    }
  : { context?: TContext });

export type FormComponentType<TFormValues extends FieldValues, TContext = undefined> = FC<
  FormProps<TFormValues, TContext>
>;
