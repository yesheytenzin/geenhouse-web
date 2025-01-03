"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Action from "./action";

export type CropThreshold = {
  id: string;
  name: string;
  minThreshold: number;
  maxThreshold: number;
  createdAt: Date;
  type: "temperature" | "soilMoisture" | "humidity";
};

export const columns: ColumnDef<CropThreshold>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center font-bold">Crop</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "minThreshold",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-center font-bold">Min Threshold</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.minThreshold}{" "}
          {row.original.type === "temperature" ? " °C" : "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "maxThreshold",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-center font-bold">Max Threshold</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.maxThreshold}{" "}
          {row.original.type === "temperature" ? " °C" : "%"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-center font-bold">Created / Modified</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {format(row.original.createdAt, "dd-MMM-yyyy hh:mm aa")}
        </div>
      );
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <MoreHorizontal className="w-5 h-5" />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-5">
              <Action id={row.original.id} />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
