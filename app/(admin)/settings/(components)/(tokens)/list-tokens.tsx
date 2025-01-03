"use client";
import Icons from "@/components/Icons";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { toast } from "sonner";
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
import { cn } from "@/lib/utils";

function EmptyTokens() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Icons.emptyTokenFolder color="gray" className="w-10 h-10" />
      <p className="text-muted-foreground mt-2 italic">
        Tokens have not been generated
      </p>
    </div>
  );
}

export default function ListTokensPage() {
  const [tokens, setTokens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleTokens, setVisibleTokens] = useState({});
  const [revokingTokens, setRevokingTokens] = useState({});

  const fetchTokens = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/api/user/registrant/token?page=${page}&limit=10`,
      );
      if (!response.ok) {
        toast.error("Failed to fetch tokens");
        return;
      }
      const data = await response.json();
      setTokens(data.tokens);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      toast.error("Error fetching tokens");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const toggleTokenVisibility = (tokenId) => {
    setVisibleTokens((prev) => ({
      ...prev,
      [tokenId]: !prev[tokenId],
    }));
  };

  const revokeToken = async (tokenId) => {
    setRevokingTokens((prev) => ({ ...prev, [tokenId]: true }));
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/api/user/registrant/token/?id=${tokenId}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        toast.error("Failed to revoke token");
      }
      toast.success("Token revoked successfully");
      await fetchTokens(currentPage); // Reload the current page
    } catch (error) {
      toast.error("Error revoking token");
    } finally {
      setRevokingTokens((prev) => ({ ...prev, [tokenId]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="w-16 h-16">
          <Icons.codeGenerationLoading />
        </div>
        <p className="text-muted-foreground">Fetching available tokens</p>
      </div>
    );
  }

  return (
    <div>
      {tokens.length ? (
        <div>
          <h1 className="font-bold py-5">Available Tokens</h1>
          <ul>
            {tokens.map((token: any) => (
              <div
                key={token.id}
                className="flex space-x-4 space-y-2 justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <div>
                    {visibleTokens[token.id] ? token.token : "•".repeat(10)}
                  </div>
                  <Button onClick={() => toggleTokenVisibility(token.id)}>
                    {visibleTokens[token.id] ? "Hide" : "Show"}
                  </Button>
                </div>
                <div className="flex space-x-2 items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="flex justify-center"
                        variant={revokingTokens[token.id] ? "ghost" : "default"}
                        disabled={revokingTokens[token.id]}
                      >
                        {revokingTokens[token.id] ? (
                          <Icons.loader2 className="animate-spin w-4 h-4 mr-2" />
                        ) : (
                          "Revoke"
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Do you want to revoke the token (DELETE)?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.{" "}
                          {token.hasUser &&
                            " The token is being actively used and will affect the user's functionality if deleted!"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => revokeToken(token.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <h1>{token.hasUser ? "Taken" : "Available"}</h1>
                </div>
              </div>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <EmptyTokens />
      )}
    </div>
  );
}
