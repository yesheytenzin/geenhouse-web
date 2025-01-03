"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@/env";
import Icons from "@/components/Icons";

const formSchema = z
  .object({
    currentPassword: z.string().min(8, { message: "Password too short" }),
    newPassword: z.string().min(8, { message: "Password too short" }),
    confirmPassword: z.string().min(8, { message: "Password too short" }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

const updatePassword = async (data: z.infer<typeof formSchema>) => {
  const formData = new FormData();
  formData.append("password", data.currentPassword);
  formData.append("newPassword", data.newPassword);
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth/password`, {
    method: "PATCH",
    body: formData,
  });
  return res;
};

const ChangeForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await updatePassword(values);
    const msg = await res.json();
    if (res.ok) {
      toast.success(msg.message);
    } else {
      toast.error(msg.message);
    }
    setLoading(false);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The old password will be used to confirm your identity
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {loading ? (
            <span className="flex justify-center">
              <Icons.spinner className="animate-spin" />
            </span>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default function PasswordChangeForm() {
  return <ChangeForm />;
}
