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
import { DatePicker } from "@/components/ui/date-picker";
import { ClientFormSchema } from "@/schemas/client-form-schema";
import { TranslationFunction } from "@/types";

type FormType = z.infer<typeof ClientFormSchema>;

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
    name: "addressFR",
    label: t("address"),
    placeholder: "Rue 123, Ville, Pays",
  },
  {
    name: "addressAr",
    label: "العنوان :",
    placeholder: "شارع 123، المدينة، البلد",
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

export default function AddNewClientForm({
  form,
  onSubmit,
  className,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  onSubmit: () => any;
  className?: string;
}) {
  const t = useTranslations(
    "Dashboard.Users.AddNewClientModal.AddNewClientForm",
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
}
