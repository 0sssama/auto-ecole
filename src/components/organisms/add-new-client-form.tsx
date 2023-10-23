"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { ClientFormSchema } from "@/schemas/client-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormType = z.infer<typeof ClientFormSchema>;

const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "John",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "John",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "06XXXXXXXX",
  },
  {
    name: "cin",
    label: "CIN",
    placeholder: "CDXXXXXX",
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
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields.map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof FormType}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{f.label}</FormLabel>
                <FormControl>
                  <Input placeholder={f.placeholder} {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}
