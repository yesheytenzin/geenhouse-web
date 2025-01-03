"use client";
import { useContext, useEffect, useState } from "react";
import { NewsFeedCardSkeleton } from "./NewsFeedSkeleton";
import { NewsFeedType } from "@/types";
import NewsFeedContext from "@/context/newsFeedContext";
import PaginatedNewsFeed from "./NewsFeedPagination";

const fetchNewsFeed = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feeds/admin`, {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return data;
}

export default function NewsFeedListPage() {
  const [newsFeed, setNewsFeed] = useState<NewsFeedType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isChanged } = useContext(NewsFeedContext);
  useEffect(() => {
    fetchNewsFeed().then((contents) => {
      setNewsFeed(contents);
      setIsLoading(false);
    })
  }, [isChanged])
  return (
    <div className="lg:w-[600px] mx-auto">
      {
        isLoading ? (
          <section className="skeleton-container space-y-3 ">
            <NewsFeedCardSkeleton />
            <NewsFeedCardSkeleton />
          </section>
        ) : (
          <section className="flex flex-col gap-5">
            <PaginatedNewsFeed newsFeeds={newsFeed} />
          </section>
        )
      }
      {
        newsFeed.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="lg:text-2xl text-xl font-semibold text-muted-foreground prose">News Feed List Empty</p>
            <p className="text-gray-500">You can add one by clicking the right plus icon</p>
          </div>
        )
      }
    </div>
  )
}
