"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { toast } from "sonner";
import { useState } from "react";
import Icons from "@/components/Icons";

const FormSchema = z.object({
  tokenCount: z.coerce.number().min(1),
  remarks: z.string().min(1),
});

export default function GenerateTokenForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const postURL = env.NEXT_PUBLIC_BASE_URL + "/api/user/registrant/token";
    const request = await fetch(postURL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const msg = await request.json();
    setIsSubmitting(false);
    if (request.ok) {
      toast.success(msg?.message);
      return;
    }
    toast.error(msg?.message);
    return;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-3 ml-2"
      >
        <div>
          <h1 className="font-bold text-xl">Generate Registrant Tokens</h1>
        </div>
        <FormField
          control={form.control}
          name="tokenCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of tokens to be generated</FormLabel>
              <FormControl>
                <Input
                  pattern="[0-9]"
                  type="number"
                  className="max-w-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the number of tokens you want to generate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your remarks</FormLabel>
              <FormControl>
                <Textarea className="max-w-sm" {...field}></Textarea>
              </FormControl>
              <FormDescription>
                Remarks for the token generation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-10 mt-7 w-1/2">
          {isSubmitting ? (
            <span className="flex items-center">
              <Icons.loader2 className="animate-spin w-5 h-5" />
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
    </Form>
  );
}
