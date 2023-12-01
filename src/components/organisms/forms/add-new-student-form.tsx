"use client";

import { z } from "zod";
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
import { DatePicker } from "@/components/ui/date-picker";
import { studentFormSchema } from "@/schemas/student-form-schema";
import type { TranslationFunction } from "@/types";

import type { FormComponentType } from "./types";

const fields = (t: TranslationFunction) => [
  {
    name: "lastNameFr",
    label: t("lastName"),
    placeholder: "Doe",
  },
  {
    name: "lastNameAr",
    label: "الإسم العائلي :",
    placeholder: "العلوي",
  },
  {
    name: "firstNameFr",
    label: t("firstName"),
    placeholder: "John",
  },
  {
    name: "firstNameAr",
    label: "الإسم الشخصي :",
    placeholder: "محمد",
  },
  {
    name: "addressFr",
    label: t("address"),
    placeholder: "Rue 123, Ville, Pays",
  },
  {
    name: "addressAr",
    label: "العنوان :",
    placeholder: "شارع 123، المدينة، البلد",
  },
  {
    name: "professionFr",
    label: t("profession"),
    placeholder: "Professeur",
  },
  {
    name: "professionAr",
    label: "المهنة :",
    placeholder: "أستاذ",
  },
  {
    name: "cin",
    label: t("cin"),
    placeholder: "CDXXXXXX",
  },
  {
    name: "phone",
    label: t("phone"),
    placeholder: "06XXXXXXXX",
  },
  {
    name: "email",
    label: t("email"),
    placeholder: "john@doe.com",
  },
  {
    name: "birthdate",
    label: t("birthdate"),
    placeholder: "02-08-1969",
  },
];

type TFormValues = z.infer<typeof studentFormSchema>;

const AddNewStudentForm: FormComponentType<TFormValues> = ({
  form,
  onSubmit,
  className,
}) => {
  const t = useTranslations(
    "Dashboard.Users.Students.AddNewStudentModal.AddNewStudentForm",
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="inline-block w-full text-sm"
                  dir={f.name.endsWith("Ar") ? "rtl" : "ltr"}
                >
                  {f.label}
                </FormLabel>
                <FormControl>
                  <>
                    {field.name !== "birthdate" && (
                      <Input
                        placeholder={f.placeholder}
                        dir={f.name.endsWith("Ar") ? "rtl" : "ltr"}
                        {...field}
                        value={field.value as string}
                      />
                    )}

                    {field.name === "birthdate" && (
                      <DatePicker
                        placeholder={f.placeholder}
                        {...field}
                        value={field.value as Date}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage
                  dir={f.name.endsWith("Ar") ? "rtl" : "ltr"}
                  className="inline-block w-full text-[12px] px-1"
                />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewStudentForm;
