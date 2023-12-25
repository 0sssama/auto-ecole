"use client";

import Link from "next/link";
import {
  CheckCircle,
  Eye,
  MoreHorizontal,
  Pencil,
  XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { DeactivateVehicleModal, ActivateVehicleModal } from "@/components/molecules";
import { useModal } from "@/lib/hooks/useModal";
import { cn } from "@/lib/cn";
import type { ActionsColumnComponentType } from "@/components/organisms/data-table/types";

import { type Vehicle, vehicleSchema } from "./schema";

const ActionsColumn: ActionsColumnComponentType<Vehicle> = ({ row }) => {
  const t = useTranslations("Dashboard.Entities.Vehicles.ListTable.Actions");

  const deactivateVehicleModal = useModal();
  const activateVehicleModal = useModal();

  const vehicle = vehicleSchema.parse(row.original);

  return (
    <DropdownMenu>
      {/* <DeactivateVehicleModal
        {...deactivateVehicleModal}
        context={{ vehicleId: vehicle.id }}
      /> */}
      {/* <ActivateVehicleModal
        {...activateVehicleModal}
        context={{ vehicleId: vehicle.id }}
      /> */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">{t("open-menu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem className="text-sm font-medium cursor-pointer text-muted-foreground/90">
          <Link
            className="flex items-center w-full h-full"
            href={`/dash/admin/vehicles?vehicleId=${vehicle.id}`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t("view")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium cursor-pointer text-muted-foreground/90"
          onClick={() => console.log("editing", vehicle.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            "text-sm font-medium cursor-pointer",
            vehicle.active &&
              "text-destructive/90 bg-destructive/10 hover:!text-destructive/100 hover:!bg-destructive/20",
            !vehicle.active &&
              "text-success/90 bg-success/10 hover:!text-success/100 hover:!bg-success/20",
            (deactivateVehicleModal.isOpen || activateVehicleModal) &&
              "opacity-50 !cursor-not-allowed",
          )}
          onClick={deactivateVehicleModal.open}
        >
          {vehicle.active ? (
            <>
              <XCircle className="text-destructive mr-2 h-3.5 w-3.5" />
              {t("deactivate")}
            </>
          ) : (
            <>
              <CheckCircle className="text-destructive mr-2 h-3.5 w-3.5" />
              {t("activate")}
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
