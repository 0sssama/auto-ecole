import type { FC } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type FormProps<TFormValues extends FieldValues, TContext = undefined> = {
  form: UseFormReturn<TFormValues, any, undefined>;
  onSubmit: () => any;
  className?: string;
} & (TContext extends undefined ? {} : { context?: TContext });

export type FormComponentType<
  TFormValues extends FieldValues,
  TContext = undefined,
> = FC<FormProps<TFormValues, TContext>>;
