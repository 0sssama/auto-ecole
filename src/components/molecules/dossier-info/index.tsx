"use client";

import moment from "moment";
import { useTranslations } from "next-intl";
import { User } from "@nextui-org/user";
import { Chip, ChipProps } from "@nextui-org/chip";
import { LicenseFileStatus } from "@prisma/client";

import { cn } from "@/lib/cn";

import type { DossierInfoProps, InfoDataProps, InfoTypes } from "./types";
import Link from "next/link";

const getChipColor = (status: LicenseFileStatus): ChipProps["color"] => {
  switch (status) {
    case LicenseFileStatus.ONGOING:
      return "secondary";
    case LicenseFileStatus.REJECTED:
      return "danger";
    case LicenseFileStatus.VALIDATED:
      return "success";
    default:
      return "primary";
  }
};

function InfoData<InfoT extends InfoTypes>({
  labelId,
  value,
}: InfoDataProps<InfoT>) {
  const t = useTranslations("Dashboard.Dossier.Labels");

  switch (labelId) {
    case "id":
      return <p>{value as number}</p>;
    case "licenseFileStatus":
      return (
        <Chip color={getChipColor(value as LicenseFileStatus)} size="sm">
          <span className="font-bold !text-[10px] md:text-sm mt-2">
            {t("LicenseFile.Status." + value).toUpperCase()}
          </span>
        </Chip>
      );
  }

  if (["student", "instructor", "createdBy"].includes(labelId))
    return (
      <Link
        href={`/dash/admin/${labelId === "createdBy" ? "editor" : labelId}s?${
          labelId === "createdBy" ? "editor" : labelId
          //   @ts-ignore
        }Id=${value.id}`}
      >
        <User
          className="mt-2"
          //   @ts-ignore
          name={value.fullName}
          description={
            labelId === "createdBy"
              ? t("LicenseFile.UserDesc.admin")
              : t("LicenseFile.UserDesc." + labelId)
          }
          avatarProps={{
            //   @ts-ignore
            src: value.profilePictureUrl,
            size: "sm",
          }}
        />
      </Link>
    );

  switch (typeof value) {
    case "string":
      return (
        <p
          className={cn(
            "w-full",
            labelId.endsWith("Ar") && "text-left", // we want arabic text to keep left alignment
          )}
          dir={labelId.endsWith("Ar") ? "rtl" : "ltr"}
        >
          {value}
        </p>
      );

    case "boolean":
      return <p>{value ? "Yes" : "No"}</p>;

    case "number":
      return <p>{value} DH</p>;

    default:
      return <p>{moment(value).calendar()}</p>;
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
      className={cn("flex flex-col gap-2", labelId === "id" && "col-span-2")}
    >
      <label className="text-xs font-bold text-gray-500 uppercase">
        {t(`${translatePrefix}.${labelId}`)}
      </label>
      <InfoData {...{ labelId, value, setValue, editing }} />
    </div>
  );
}

export default DossierInfo;
