"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { enUS, fr } from "date-fns/locale";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  value,
  onChange,
  placeholder,
}: {
  placeholder: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          // onClick={(e) => e.preventDefault()}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
          fromYear={1950}
          toYear={new Date().getFullYear()}
          locale={document.documentElement.lang === "fr" ? fr : enUS}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
