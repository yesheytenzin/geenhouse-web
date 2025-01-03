"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { newsfeedSchema } from "@/lib/validations/newsfeed";
import { newsFeedSchemaType } from "@/types";
import { useForm } from "react-hook-form";
import Icons from "../Icons";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useContext } from "react";
import NewsFeedContext from "@/context/newsFeedContext";

export default function NewsFeedForm({
  isNewsFeedFormVisible,
  setIsNewsFeedFormVisible
}: {
  isNewsFeedFormVisible: boolean;
  setIsNewsFeedFormVisible: (bool: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newsFeedSchemaType>({ resolver: zodResolver(newsfeedSchema) });
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsChanged } = useContext(NewsFeedContext);
  const handleSubmittedData = async (data: newsFeedSchemaType) => {
    setLoading(true);
    // convert to form data
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image);
    // send data to server
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feeds`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setLoading(false);
      toast.success("News Feed Posted Successfully");
      setIsChanged(prevState => !prevState);
      setIsNewsFeedFormVisible(false);
    } else {
      toast.error("Something went wrong, please try again");
    }
    setLoading(false);
    reset();
  };

  return (
    <Dialog
      open={isNewsFeedFormVisible}
      onOpenChange={setIsNewsFeedFormVisible}
    >
      <DialogClose />
      <DialogContent className="min-w-[900px] flex-1">
        <form
          className="flex-col space-y-8 min-h-[500px] min-w-[]"
          onSubmit={handleSubmit(handleSubmittedData)}
          encType="multipart/form-data"
        >
          <div className="space-y-2">
            <div>
              <label className="label-text prose text-secondary-foreground">Title for the Feed</label>
            </div>
            <Input className="input border" placeholder="Title" {...register("title")} />
            <p className="text-red-600">{errors.title && errors.title.message}</p>
          </div>
          <div className="space-y-2">
            <div>
              <label className="label-text prose text-secondary-foreground">Content for the Feed</label>
            </div>
            <Textarea className="textarea textarea-bordered h-36 w-full" placeholder="Enter your content" {...register("content")}></Textarea>
            <p className="text-red-600">{errors.content && errors.content.message}</p>
          </div>
          <div className="space-y-1">
            <div>
              <label className="label-text prose text-secondary-foreground">Pick an image for your Feed</label>
              <div className="flex ">
                <label htmlFor="file-input"
                  className={`cursor-pointer flex my-auto ${cn(buttonVariants({
                    variant: "default"
                  }))}`} >
                  <Icons.camera className="mx-auto" />
                </label>
                <Input
                  id="file-input"
                  type="file" className="file-input file-input-md w-full max-w-xs" {...register('image')} />
              </div>
            </div>
            <p className="text-red-600">{errors.image && errors.image.message?.toString()}</p>
          </div>
          <div className='flex justify-end'>
            <Button
              disabled={loading}
              className="p-4"
              type="submit" >{
                loading ? (
                  <span className="flex space-x-2 justify-center">
                    <Icons.spinner className="animate-spin" />
                  </span>
                ) : (
                  <span className="py-8">
                    Post
                  </span>
                )
              }</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
