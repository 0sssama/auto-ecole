"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InstructorFormSchema } from "@/schemas/instructor-form-schema";
import { TranslationFunction } from "@/types";

type FormType = z.infer<typeof InstructorFormSchema>;

const fields = (t: TranslationFunction) => [
  {
    name: "lastName",
    label: t("lastName"),
    placeholder: "Doe",
  },
  {
    name: "firstName",
    label: t("firstName"),
    placeholder: "John",
  },
  {
    name: "phone",
    label: t("phone"),
    placeholder: "06XXXXXXXX",
  },
];

export default function AddNewInstructorForm({
  form,
  onSubmit,
  className,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  onSubmit: () => any;
  className?: string;
}) {
  const t = useTranslations(
    "Dashboard.Users.Instructors.AddNewInstructorModal.AddNewInstructorForm",
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof FormType}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline-block w-full text-sm">
                  {f.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={f.placeholder}
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage className="inline-block w-full text-[12px] px-1" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}
