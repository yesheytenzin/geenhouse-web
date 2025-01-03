"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userTableColumnSchemaType } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import GenerateCode from "@/components/GenerateCodeScreen";
import { env } from "@/env";

const deleteUserById = async (id: string) => {
  const res = await fetch(`http://${env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    cache: "no-store",
  });
  if (res.ok) {
    toast.success("User deleted successfully");
    return true;
  }
  toast.error("Something went wrong");
  return false;
};

export const columns: ColumnDef<userTableColumnSchemaType>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "cid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Citizen ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
  },
  {
    accessorKey: "registeredAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registered At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(
        new Date(row.getValue("registeredAt")),
        "dd MMM yyyy HH:mm:ss",
      );
    },
  },
  {
    accessorKey: "dzongkhag",
    header: "Dzongkhag",
  },
  {
    accessorKey: "gewog",
    header: "Gewog",
  },
  {
    accessorKey: "greenhouseCount",
    header: "Total Greenhouses",
  },
  {
    accessorKey: "irrigationCount",
    header: "Total Irrigation Controllers",
  },
  // side actions for respective row
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => deleteUserById(user.id)}
                className="flex space-x-3"
              >
                <span>Delete User</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex space-x-3" asChild>
                <GenerateCode id={row.original.id} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
