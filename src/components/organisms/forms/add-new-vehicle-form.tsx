"use client";

import { useState } from "react";
import omit from "lodash/omit";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { VehicleType } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { api } from "@/utils/api";
// import { useFileUpload } from "@/lib/hooks/useFileUpload";
import type { TranslationFunction } from "@/types";

import { vehicleFormSchema } from "@/schemas/vehicle-form-schema";
import type { FormComponentType } from "./types";
import { UseFileUploadHook } from "@/lib/hooks/useFileUpload/types";

const fields = (t: TranslationFunction) => [
  {
    name: "brand",
    label: t("brand"),
    placeholder: "Dacia",
  },
  {
    name: "name",
    label: t("name"),
    placeholder: "Sandero",
  },
  {
    name: "type",
    label: t("Type.label"),
    placeholder: t("Type.CAR"),
    emptyMessage: t("Type.empty"),
    options: Object.keys(VehicleType).map((key) => ({
      value: key,
      label: t("Type." + key),
    })),
  },
  {
    name: "instructorId",
    label: t("Instructor.instructor"),
    placeholder: t("Instructor.placeholder"),
    emptyMessage: t("Instructor.empty"),
    loadingMessage: t("Instructor.loading"),
  },
  {
    name: "image",
    label: t("image"),
  },
];

type TFormValues = z.infer<typeof vehicleFormSchema>;
type TContext = {
  FileUpload?: ReturnType<UseFileUploadHook>["FileUpload"];
};

const AddNewVehicleForm: FormComponentType<TFormValues, TContext> = ({
  form,
  onSubmit,
  className,
  context: { FileUpload } = {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  //   const { startUpload, FileUpload } = useFileUpload({
  //     endpoint: "imageUploader",
  //   });

  const t = useTranslations("Dashboard.Modals.AddVehicle.Form");

  const instructors = api.db.instructors.query.getManyForSelect.useQuery({
    searchQuery,
    count: 5,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={className}>
        {fields(t).map((f, key) => (
          <FormField
            key={key}
            control={form.control}
            name={f.name as keyof TFormValues}
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="inline-block w-full text-sm !text-left">
                  {f.label}
                </FormLabel>
                <FormControl className="relative w-full">
                  <>
                    {(field.name === "name" || field.name === "brand") && (
                      <Input
                        {...field}
                        placeholder={f.placeholder}
                        value={field.value as string}
                      />
                    )}

                    {(field.name === "instructorId" ||
                      field.name === "type") && (
                      <Combobox
                        {...omit(field, "ref")}
                        placeholder={f.placeholder}
                        emptyMessage={f.emptyMessage}
                        loadingMessage={f.loadingMessage}
                        value={field.value as string | null}
                        options={
                          {
                            instructorId: instructors?.data ?? [],
                            type: f.options!,
                          }[field.name]
                        }
                        isLoading={
                          {
                            instructorId: instructors?.isLoading,
                            type: false,
                          }[field.name]
                        }
                        search={
                          {
                            instructorId: { searchQuery, setSearchQuery },
                            type: undefined,
                          }[field.name]
                        }
                        onChange={(newValue) => {
                          // @ts-ignore
                          form.setValue(field.name, newValue);
                        }}
                      />
                    )}

                    {field.name === "image" && FileUpload !== undefined && (
                      <FileUpload>Upload an image mf</FileUpload>
                    )}
                  </>
                </FormControl>
                <FormMessage className="inline-block w-full text-[12px] px-1 !text-right" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddNewVehicleForm;
