"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { userTableColumnSchemaType } from "@/types";
import { useEffect, useState } from "react";
import Icons from "@/components/Icons";
import { env } from "@/env";

async function getData(): Promise<userTableColumnSchemaType[]> {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/user-list`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
export default function UsersPage() {
  const [data, setData] = useState<userTableColumnSchemaType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container mx-auto ">
      {loading ? (
        <div className="container flex items-center flex-col  justify-center space-y-2 lg:mt-40">
          <Icons.userListLoading width={72} height={72} />
          <p className="animate-pulse delay-1000 font-mono">
            Generating User Analytics
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
