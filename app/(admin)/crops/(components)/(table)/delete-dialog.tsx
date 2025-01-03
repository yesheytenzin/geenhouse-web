"use client";

import Icons from "@/components/Icons";
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
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { useState } from "react";
import { toast } from "sonner";

async function deleteCropData(id: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/resource/threshold?role=admin&cropId=${id}`,
    {
      method: "DELETE",
    },
  );
  const data = (await res.json()) ?? {};
  return data;
}

const DeleteThresholdDialog = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const handleSubmit = async () => {
    setIsDeleting(true);
    const res = await deleteCropData(id);
    setIsDeleting(false);
    toast.success("The crop data has been deleted, Reload the page");
    setIsDialogVisible(false);
  };
  return (
    <AlertDialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            threshold paramter from the list
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSubmit}>
            {isDeleting ? (
              <div className="flex justify-center">
                <Icons.spinner className="animate-spin" />
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteThresholdDialog;
