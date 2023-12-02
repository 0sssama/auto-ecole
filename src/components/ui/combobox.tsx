"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "../atoms";

type ComboboxProps = {
  options: {
    value: string;
    label: string;
  }[];
  value: string | null;
  onChange: (newValue: string | null) => void;
  placeholder?: string;
  emptyMessage?: string;
  search?: {
    searchQuery: string;
    setSearchQuery: (newValue: string) => void;
  };
  isLoading?: boolean;
  loadingMessage?: string;
};

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  emptyMessage,
  search,
  isLoading,
  loadingMessage,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [valueOption, setValueOption] = React.useState<{
    value: string;
    label: string;
  } | null>(null);

  const getValue = React.useCallback(
    (value: string | null) =>
      options.find(
        (option) => value && option.value.toUpperCase() === value.toUpperCase(),
      ),
    [options],
  );

  const isCurrentValue = React.useCallback(
    (optionValue: string) =>
      value && value.toUpperCase() === optionValue.toUpperCase(),
    [value],
  );

  React.useEffect(() => {
    if (!open && search) search.setSearchQuery("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {valueOption ? valueOption.label : placeholder}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[280px] lg:min-w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            {...(search
              ? {
                  value: search.searchQuery,
                  onValueChange: (query) => search.setSearchQuery(query),
                }
              : {})}
          />
          <CommandEmpty className="!p-0 !m-0">
            {!isLoading && (
              <div className="py-6 text-sm text-center">{emptyMessage}</div>
            )}
          </CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-center">
                <Spinner size="xs" color="foreground" />
                {loadingMessage}
              </div>
            ) : (
              [
                ...(value && valueOption && !getValue(value)
                  ? [valueOption]
                  : []),
                ...options,
              ].map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (isCurrentValue(currentValue)) {
                      onChange("0");
                      setValueOption(null);
                    } else {
                      onChange(currentValue.toUpperCase());
                      setValueOption(option);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isCurrentValue(option.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
