"use client";

import moment from "moment";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";

import type { DossierInfoProps, InfoTypes } from "./types";

function InfoData<InfoT extends InfoTypes>({
  labelId,
  value,
  //   setValue,
  editing,
}: DossierInfoProps<InfoT>) {
  if (labelId === "id")
    return <p className="font-semibold text-md">{value as number}</p>;

  switch (typeof value) {
    case "string":
      return (
        <div>
          {editing ? (
            <></>
          ) : (
            <p
              className={cn(
                "font-semibold text-md w-full",
                labelId.endsWith("Ar") && "text-left",
              )}
              dir={labelId.endsWith("Ar") ? "rtl" : "ltr"}
            >
              {value}
            </p>
          )}
        </div>
      );

    case "boolean":
      return (
        <div>
          {editing ? (
            <></>
          ) : (
            <p className="font-semibold text-md">{value ? "Yes" : "No"}</p>
          )}
        </div>
      );

    default:
      return (
        <div>
          {editing ? (
            <></>
          ) : (
            <p className="font-semibold text-md">{moment(value).calendar()}</p>
          )}
        </div>
      );
  }
}

function DossierInfo<InfoT extends InfoTypes>({
  labelId,
  value,
  setValue,
  editing,
}: DossierInfoProps<InfoT>) {
  const t = useTranslations("Dashboard.Dossier.Labels");
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-500 uppercase">
        {t(labelId)}
      </label>
      <InfoData {...{ labelId, value, setValue, editing }} />
    </div>
  );
}

export default DossierInfo;
