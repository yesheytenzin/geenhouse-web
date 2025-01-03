"use client";

import { format } from "date-fns";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuContent,
} from "@radix-ui/react-context-menu";
import Icons from "./Icons";
import { toast } from "sonner";
import { useContext } from "react";
import NewsFeedContext from "@/context/newsFeedContext";
import { env } from "@/env";

async function DeleteNewsFeed(id: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/feeds/admin/?id=${id}`,
    {
      method: "DELETE",
      cache: "no-store",
    },
  );
  if (res.ok) {
    return res.json();
  }
  return false;
}
export function NewsFeedContainerCard({
  id,
  title,
  content,
  createdAt,
  image,
  author,
}: {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image: string;
  author: string;
}) {
  const { setIsChanged } = useContext(NewsFeedContext);
  const handleDelete = async () => {
    const isDeleted = await DeleteNewsFeed(id);
    if (isDeleted) {
      toast.success(isDeleted.message);
      setIsChanged((prevState: boolean) => !prevState);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-center py-5">
              <Image
                src={image}
                width={300}
                height={400}
                alt="News Feed Image"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-extrabold">{title}</h1>
            </div>
            <div id="date-display" className="flex space-x-2 justify-end">
              <p className="prose">
                {format(new Date(createdAt), "do MMMM yyyy")}
              </p>
              <p className="prose">{format(new Date(createdAt), "h:mm a")}</p>
            </div>
            <div>
              <p>{content}</p>
            </div>
            <div>
              <p className="prose pt-5">By {author}</p>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="border-2 rounded-md w-44 py-5 px-2 space-y-4">
        {" "}
        <div
          className="w-full flex cursor-pointer hover:underline"
          onClick={handleDelete}
        >
          <p>Delete Post</p>
          <Icons.trash className="ml-auto" />{" "}
        </div>
        <div className="w-full flex cursor-pointer hover:underline">
          <p>Edit Post</p>
          <Icons.pencil className="ml-auto" />
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
}
