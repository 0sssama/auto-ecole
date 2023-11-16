"use client";

import moment from "moment";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";

import type { DossierInfoProps, InfoDataProps, InfoTypes } from "./types";

function InfoData<InfoT extends InfoTypes>({
  labelId,
  value,
  //   setValue,
  editing,
}: InfoDataProps<InfoT>) {
  if (labelId === "id") return <p>{value as number}</p>;

  switch (typeof value) {
    case "string":
      return (
        <div>
          {editing ? (
            <></>
          ) : (
            <p
              className={cn(
                "w-full",
                labelId.endsWith("Ar") && "text-left", // we want arabic text to keep left alignment
              )}
              dir={labelId.endsWith("Ar") ? "rtl" : "ltr"}
            >
              {value}
            </p>
          )}
        </div>
      );

    case "boolean":
      return <div>{editing ? <></> : <p>{value ? "Yes" : "No"}</p>}</div>;

    default:
      return <div>{editing ? <></> : <p>{moment(value).calendar()}</p>}</div>;
  }
}

const forbiddenInfoXD = ["profilePictureUrl"];

function DossierInfo<InfoT extends InfoTypes>({
  labelId,
  value,
  setValue,
  editing,
  translatePrefix,
}: DossierInfoProps<InfoT>) {
  const t = useTranslations("Dashboard.Dossier.Labels");

  if (forbiddenInfoXD.includes(labelId)) return null;

  return (
    <div
      className={cn("flex flex-col gap-1", labelId === "id" && "col-span-2")}
    >
      <label className="text-xs font-bold text-gray-500 uppercase">
        {t(`${translatePrefix}.${labelId}`)}
      </label>
      <InfoData {...{ labelId, value, setValue, editing }} />
    </div>
  );
}

export default DossierInfo;
