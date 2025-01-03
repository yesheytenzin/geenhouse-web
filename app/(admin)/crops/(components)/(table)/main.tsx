"use client";

import { useEffect, useState } from "react";
import { CropThreshold, columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { EnvironmentParameterContext } from "../context";
import { env } from "@/env";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(): Promise<CropThreshold[]> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/resource/threshold?role=admin`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (res.ok) {
    const data = (await res.json()) ?? [];
    return data;
  }
  return [];
}

const SkeletonTable = () => (
  <div className="grid grid-cols-4 gap-5">
    <div className="w-full flex-col">
      <Skeleton className="w-full h-6 dark:bg-muted bg-gray-300" />
      <div className="space-y-5 mt-5">
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
      </div>
    </div>
    <div className="w-full flex-col">
      <Skeleton className="w-full h-6 dark:bg-muted bg-gray-300" />
      <div className="space-y-5 mt-5">
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
      </div>
    </div>
    <div className="w-full flex-col">
      <Skeleton className="w-full h-6 dark:bg-muted bg-gray-300" />
      <div className="space-y-5 mt-5">
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
      </div>
    </div>
    <div className="w-full flex-col">
      <Skeleton className="w-full h-6 dark:bg-muted bg-gray-300" />
      <div className="space-y-5 mt-5">
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
        <Skeleton className="w-full h-4 dark:bg-muted bg-gray-300" />
      </div>
    </div>
  </div>
);

const getDataFor = (
  data: CropThreshold[],
  type: "humidity" | "temperature" | "soilmoisture",
) => {
  switch (type) {
    case "humidity":
      return data.filter((item) => item.type === "humidity");
    case "temperature":
      return data.filter((item) => item.type === "temperature");
    case "soilmoisture":
      return data.filter((item) => item.type === "soilMoisture");
  }
};

export default function CropsThresholdTable() {
  const [data, setData] = useState<CropThreshold[]>([]);
  const { value } = useContext(EnvironmentParameterContext);
  const [tableData, setTableData] = useState<CropThreshold[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isTableChange, setIsTableChange] = useState<boolean>(false);
  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setFetching(false);
    });
  }, [isTableChange]);
  useEffect(() => {
    setTableData(getDataFor(data, value));
  }, [value, data]);
  return (
    <div className="container mx-auto py-10">
      {fetching ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          isTableChange={isTableChange}
          setIsTableChange={setIsTableChange}
        />
      )}
    </div>
  );
}
