"use client";

import ButtonGroup from "@/components/NewsFeedBtnGrp";
import NewsFeedContext from "@/context/newsFeedContext";
import { useState } from "react";

export default function NewsFeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  return (
    <NewsFeedContext.Provider value={{ isChanged, setIsChanged }}>
      <ButtonGroup />
      {children}
    </NewsFeedContext.Provider>
  );
}
