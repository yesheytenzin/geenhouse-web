"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { CropThreshold } from "./columns";
import { env } from "@/env";
import Icons from "@/components/Icons";

const schema = z.object({
  minThreshold: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Min threshold must be a number",
  }),
  maxThreshold: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Max threshold must be a number",
  }),
});

async function getData(): Promise<CropThreshold[]> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/resource/threshold?role=admin`,
    {
      method: "GET",
      next: {
        revalidate: 5,
      },
    },
  );
  const data = (await res.json()) ?? [];
  return data;
}

async function updateData(sendData: {
  minThreshold: number;
  maxThreshold: number;
}): Promise<CropThreshold> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/resource/threshold?role=admin`,
    {
      method: "PATCH",
      body: JSON.stringify(sendData),
      next: {
        revalidate: 5,
      },
    },
  );
  const data = (await res.json()) ?? {};
  return data;
}

export default function EditDialog({ id }: { id: string }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CropThreshold[]>([]);
  const [cropData, setCropData] = useState<CropThreshold | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const findCropData = useCallback((tableData: CropThreshold[], id: string) => {
    const cropData = tableData.find((item) => item.id === id);
    setCropData(cropData || null);
  }, []);

  const onSubmit = async (data: {
    minThreshold: number;
    maxThreshold: number;
  }) => {
    // Handle form submission
    setIsSubmitting(true);
    const updatedData = {
      ...data,
      id: cropData?.id,
    };
    const res = await updateData(updatedData);
    setIsSubmitting(false);
    setCropData(res);
    toast.success("The parameters have been updated, Reload the page");
  };

  useEffect(() => {
    getData().then((res) => {
      setTableData(res);
    });
  }, [onSubmit]);

  useEffect(() => {
    if (tableData) {
      findCropData(tableData, id);
    }
  }, [findCropData, tableData, id]);

  return (
    <Dialog>
      <DialogTrigger className="focus:outline-none">Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Threshold Value</DialogTitle>
          {cropData ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div>
                <Label>Crop</Label>
                <div className="w-full p-2 rounded-md border border-muted">
                  {cropData.name}
                </div>
              </div>
              <div>
                <Label>Parameter for Type</Label>
                <div className="w-full p-2 rounded-md border border-muted">
                  {cropData.type}
                </div>
              </div>
              <div>
                <Label>Min Threshold (Type here)</Label>
                <Input
                  type="number"
                  {...register("minThreshold")}
                  aria-invalid={!!errors.minThreshold}
                  defaultValue={cropData.minThreshold}
                />
                {errors.minThreshold && (
                  <span role="alert" className="text-red-500">
                    {errors.minThreshold.message.toString()}
                  </span>
                )}
              </div>
              <div>
                <Label>Max Threshold (Type here)</Label>
                <Input
                  type="number"
                  {...register("maxThreshold")}
                  aria-invalid={!!errors.maxThreshold}
                  defaultValue={cropData.maxThreshold}
                />
                {errors.maxThreshold && (
                  <span role="alert" className="text-red-500">
                    {errors.maxThreshold.message.toString()}
                  </span>
                )}
              </div>
              <Button className="w-full" type="submit">
                {isSubmitting ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  <span>Update Values</span>
                )}
              </Button>
            </form>
          ) : (
            <div className="min-h-16 flex justify-center">
              <div className="flex-col items-center justify-center space-y-4">
                <p className="prose">Displaying crop data</p>
                <Icons.spinner className="animate-spin mx-auto" />
              </div>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
