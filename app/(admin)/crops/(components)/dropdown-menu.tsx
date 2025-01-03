"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useContext } from "react";
import { EnvironmentParameterContext, ParameterValueTypes } from "./context";

import { cn } from "@/lib/utils";
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

const frameworks = [
  {
    value: "temperature",
    label: "Temperature",
  },
  {
    value: "soilmoisture",
    label: "Soil Moisture",
  },
  {
    value: "humidity",
    label: "Humidity",
  },
];

export function ThresholdParameterDropdown() {
  const [open, setOpen] = React.useState(false);
  const { value, setValue } = useContext(EnvironmentParameterContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Parameter Type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Parameter Type" />
          <CommandEmpty>No target type parameter found</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue:ParameterValueTypes) => {
                  setValue(currentValue === value ? "temperature" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
