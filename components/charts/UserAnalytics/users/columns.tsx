"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { toast } from "sonner";
import Link from "next/link";
import Icons from "@/components/Icons";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const deleteUserById = async (id: string) => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const respObj = await res.json();
  // fix this part
  if (res.ok) {
    toast.success("User deleted successfully");
  }
  toast.error(respObj?.message);
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
    cell: ({ row }) => <div className="ml-4">{row.original.cid}</div>,
  },
  // side actions for respective row
  {
    id: "actions",
    header: ({ column }) => (
      <div>
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild className="flex space-x-3">
              <AlertDialog>
                <AlertDialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Delete User
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      user&apos;s account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUserById(user.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "analytics",
    header: ({ column }) => (
      <div>
        <h1>Analytics</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Link
          className={cn(
            `flex space-x-2`,
            buttonVariants({
              variant: "outline",
            }),
          )}
          href={`/dashboard/user-analytics?id=${row.original.id}`}
        >
          <p>Analytics</p>
          <Icons.dashboard />
        </Link>
      );
    },
  },
];
