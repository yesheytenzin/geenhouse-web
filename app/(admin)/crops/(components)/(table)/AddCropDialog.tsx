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
import { SetStateAction, useEffect, useState } from "react";
import { CropThreshold } from "./columns";
import { env } from "@/env";
import Icons from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";

const schema = z.object({
  name: z.string().min(3, { message: "Enter valid crop name" }),
  type: z.enum(["temperature", "humidity", "soilMoisture"]),
  minThreshold: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Min threshold must be a number",
  }),
  maxThreshold: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Max threshold must be a number",
  }),
});

async function postData(
  sendData: z.infer<typeof schema>,
): Promise<CropThreshold> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/resource/threshold?role=admin`,
    {
      method: "POST",
      body: JSON.stringify(sendData),
      next: {
        revalidate: 5,
      },
    },
  );
  const data = (await res.json()) ?? {};
  return data;
}

export default function AddCropDialog({
  setIsTableChange,
}: {
  setIsTableChange: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    const res = await postData(data);
    setIsSubmitting(false);
    toast.success("The crop threshold has been added successfully");
    setIsTableChange((prevState) => !prevState);
    setIsFormVisible(false);
    reset();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Dialog open={isFormVisible} onOpenChange={setIsFormVisible}>
      <DialogTrigger className="focus:outline-none">
        <Button className="flex space-x-2">
          <span>Add Crop</span>
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Threshold Value</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <Label>Crop Name</Label>
              <Input
                type="text"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span role="alert" className="text-red-500">
                  {errors.name.message.toString()}
                </span>
              )}
            </div>
            <div>
              <Label>Select Threshold Type</Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose parameter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="humidity">Humidity</SelectItem>
                      <SelectItem value="soilMoisture">
                        Soil Moisture
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <span role="alert" className="text-red-500">
                  {errors.type.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label>Min Threshold</Label>
              <Input
                type="number"
                {...register("minThreshold")}
                aria-invalid={!!errors.minThreshold}
                placeholder="Type here"
              />
              {errors.minThreshold && (
                <span role="alert" className="text-red-500">
                  {errors.minThreshold.message.toString()}
                </span>
              )}
            </div>
            <div>
              <Label>Max Threshold</Label>
              <Input
                type="number"
                {...register("maxThreshold")}
                aria-invalid={!!errors.maxThreshold}
                placeholder="Type here"
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
                <span>Add Crop</span>
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
