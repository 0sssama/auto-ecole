/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/base/utils/client/cn';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxProps {
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
}

export const Combobox = ({
  options,
  value,
  onChange,
  placeholder,
  emptyMessage,
  search,
  isLoading,
  loadingMessage,
}: ComboboxProps) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [valueOption, setValueOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const isCurrentValue = useCallback(
    (optionValue: string) => value && value.toUpperCase() === optionValue.toUpperCase(),
    [value],
  );

  const searchedOptions = useMemo(() => {
    if (search) return options; // if search is passed in props, it will be handled server-side

    return options.filter((option) => option.label.toUpperCase().includes(internalSearchQuery.toUpperCase()));
  }, [options, internalSearchQuery, search]);

  const getValue = useCallback(
    (value: string | null) =>
      searchedOptions.find((option) => value && option.value.toUpperCase() === value.toUpperCase()),
    [searchedOptions],
  );

  const displayOptions = useMemo(
    () => [
      ...(value && valueOption && !getValue(value) ? [valueOption] : []), // the selected option must always be displayed
      ...searchedOptions,
    ],
    [valueOption, searchedOptions],
  );

  useEffect(() => {
    if (value) {
      const option = getValue(value);
      if (option) setValueOption(option);
    } else {
      setValueOption(null);
    }
  }, [value, getValue]);

  useEffect(() => {
    if (open) return;

    if (search) search.setSearchQuery('');

    setInternalSearchQuery('');
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {valueOption ? valueOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[280px] p-0 lg:min-w-[300px]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            {...(search
              ? {
                  value: search.searchQuery,
                  onValueChange: (query) => search.setSearchQuery(query),
                }
              : {
                  value: internalSearchQuery,
                  onValueChange: (query) => setInternalSearchQuery(query),
                })}
          />
          <CommandEmpty className="!m-0 !p-0">
            {!isLoading && <div className="py-6 text-center text-sm">{emptyMessage}</div>}
          </CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-center text-sm">
                <Spinner size="xs" color="foreground" />
                {loadingMessage}
              </div>
            ) : (
              displayOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (!isCurrentValue(currentValue)) {
                      onChange(currentValue.toUpperCase());
                      setValueOption(option);
                    }

                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', isCurrentValue(option.value) ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
