"use client";

import { NewsFeedType } from "@/types";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import Link from "next/link";
import { NewsFeedContainerCard } from "./NewsFeedContainer";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type PaginationLinkProps = React.ComponentProps<typeof Link>;

const PaginationLink = (props: PaginationLinkProps) => {
  return <Link {...props} />;
};

const PaginatedNewsFeed = ({ newsFeeds }: { newsFeeds: NewsFeedType[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(newsFeeds.length / itemsPerPage);

  return (
    <>
      {newsFeeds
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((newsFeed) => (
          <NewsFeedContainerCard
            key={newsFeed.id}
            id={newsFeed.id}
            image={newsFeed.image}
            title={newsFeed.title}
            author={newsFeed.author}
            content={newsFeed.content}
            createdAt={newsFeed.createdAt}
          />
        ))}
      <Pagination className="">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem
              className={`mx-3 ${cn(
                buttonVariants({
                  variant: "default",
                }),
              )}`}
              key={index + 1}
            >
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "underline" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : undefined}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginatedNewsFeed;
