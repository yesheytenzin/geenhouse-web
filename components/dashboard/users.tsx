"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icons from "../Icons";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

const getUsersJoinedCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/user/count`,
    {
      method: "GET",
      cache: "no-store",
      next: {
        revalidate: 5,
      },
    },
  );
  const count = await res.json();
  return count;
};
const getUsersRecentJoinedList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users`,
    {
      method: "GET",
      cache: "no-store",
      next: {
        revalidate: 5,
      },
    },
  );
  const list = await res.json();
  return list;
};

const getUsersOnlineCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users/emqx-connected-users`,
    {
      method: "GET",
      cache: "no-store",
      next: {
        revalidate: 5,
      },
    },
  );
  const count = await res.json();
  return count;
};

export const UsersJoinedCard = () => {
  const [usersCount, setUsersCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUsersJoinedCount().then((res) => {
      setUsersCount(res);
      setLoading(false);
    });
  }, [usersCount]);
  return (
    <Card className="w-[200px] h-24 relative">
      <CardHeader className="p-3 font-semibold">Users Joined</CardHeader>
      <CardContent className="p-12">
        {loading ? (
          <Skeleton className="rounded-full w-[20px] h-[20px] absolute bottom-0 right-0 p-4 m-3 dark:bg-muted bg-gray-400" />
        ) : (
          <h3 className="font-bold absolute bottom-0 right-0 text-3xl font-mono m-2">
            {usersCount}
          </h3>
        )}
      </CardContent>
    </Card>
  );
};

export const UsersOnlineCard = () => {
  const [usersOnlineCount, setUsersOnlineCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUsersOnlineCount().then((count) => {
      setUsersOnlineCount(count);
      setLoading(false);
    });
  }, [usersOnlineCount]);
  return (
    <Card className="w-[200px] h-24  relative">
      <CardHeader className="p-3 font-semibold">Users Online</CardHeader>
      <CardContent className="p-3 ">
        {loading ? (
          <Skeleton className="rounded-full w-[20px] h-[20px] absolute bottom-0 right-0 p-4 m-3 dark:bg-muted bg-gray-400" />
        ) : (
          <h3 className="font-bold absolute bottom-0 right-0 text-3xl font-mono m-2">
            {usersOnlineCount}
          </h3>
        )}
      </CardContent>
    </Card>
  );
};

const UsersRecentJoinedCardSkeleton = () => {
  return (
    <div className="relative flex border border-muted rounded-sm p-3 space-x-3">
      <span className="flex flex-col justify-center">
        <Skeleton className="w-10 h-10 rounded-full" />
      </span>
      <span className="flex flex-col space-y-2 justify-center">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </span>
      <span className="flex absolute right-0 flex-col space-y-2 w-fit px-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </span>
    </div>
  );
};
const UserRecentJoinedCard = ({
  name,
  gewog,
  dzongkhag,
  date,
}: {
  name: string;
  gewog: string;
  dzongkhag: string;
  date: string;
}) => {
  return (
    <div className=" flex border border-muted rounded-sm p-3 mt-3 shadow">
      <span className="p-3">
        <Icons.userRound size={28} />
      </span>
      <div>
        <span className="flex-col">
          <h4>{name}</h4>
          <p className="prose">
            {gewog},{dzongkhag}
          </p>
        </span>
        <span className="flex space-x-2">
          <p className="prose">Joined on</p>
          <p>{format(new Date(date), "EEE, do MMM yyyy hh:mm aa")}</p>
        </span>
      </div>
    </div>
  );
};
interface IUserRecentJoined {
  username: string;
  registeredAt: string;
  dzongkhag: string;
  gewog: string;
}
export const RecentlyJoinedList = () => {
  const [users, setUsers] = useState<IUserRecentJoined[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUsersRecentJoinedList()
      .then((data) => {
        setUsers(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="container min-h-[30vh] pb-3 shadow">
      <div className="p-1  flex justify-between items-center">
        {" "}
        <span className="flex space-x-3 p-3 font-semibold">
          <h3>Users Recently Joined</h3>
          <Icons.usersJoined />
        </span>
        <p className="text-muted-foreground text-sm">Scroll Down</p>
      </div>
      <div className="p-3">
        <div className="flex-col justify-center space-y-2">
          {loading ? (
            <>
              <UsersRecentJoinedCardSkeleton />
              <UsersRecentJoinedCardSkeleton />
              <UsersRecentJoinedCardSkeleton />
            </>
          ) : users.length > 0 ? (
            <ScrollArea className="h-[400px] w-[550px]">
              {users.map((item) => (
                <UserRecentJoinedCard
                  key={item.username}
                  date={item?.registeredAt as string}
                  name={item?.username as string}
                  gewog={item?.gewog as string}
                  dzongkhag={item?.dzongkhag as string}
                />
              ))}
            </ScrollArea>
          ) : (
            <>
              <Icons.emptyUsers className="w-8 h-8 mx-auto" />
              <p className="text-muted-foreground text-center">
                No users have registered yet! You may invite them
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
