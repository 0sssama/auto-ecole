"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LicenseFile, licenseFileSchema } from "./schema";
import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { useTranslations } from "next-intl";
import { Chip, ChipProps } from "@nextui-org/chip";
import { LicenseFileStatus } from "@prisma/client";
import { ActionsColumn } from "./actions-column";
import moment from "moment";

export const columns: ColumnDef<LicenseFile>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StudentLicenseFiles.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.category"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.LicenseFiles.Category",
      );
      const licenseFile = licenseFileSchema.parse(row.original);

      return (
        <>
          {t(licenseFile.category)} ({licenseFile.category})
        </>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.price"
      />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.status"
      />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations("Dashboard.Dossier.Tables.LicenseFiles.Status");
      const licenseFile = licenseFileSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (licenseFile.status) {
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

      return (
        <Chip color={getChipColor()} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {t(licenseFile.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="StudentLicenseFiles.created-at"
      />
    ),
    cell: ({ row }) => {
      const licenseFile = licenseFileSchema.parse(row.original);

      return <>{moment(licenseFile.createdAt).fromNow()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ActionsColumn row={row} />
      </div>
    ),
  },
];
