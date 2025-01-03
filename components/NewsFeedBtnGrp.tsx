"use client";

import { Button } from "./ui/button";
import Icons from "./Icons";
import NewsFeedForm from "./forms/NewsFeed";
import { useState } from "react";
import { AlertHelper } from "./NewsFeedHelpDialog";

export default function ButtonGroup() {
  const [isNewsFormVisible, setIsNewsFormVisible] = useState<boolean>(false);
  return (
    <div className="absolute right-2  ml-auto mr-2 w-fit flex flex-col space-y-5 lg:max-w-[130px]">
      <Button
        className="rounded-sm space-x-2 hover:scale-105 w-full"
        onClick={() => setIsNewsFormVisible(true)}
        variant="default"
      >
        <p>Add Feed</p>
        <Icons.addNews />
      </Button>
      <AlertHelper />
      <NewsFeedForm
        isNewsFeedFormVisible={isNewsFormVisible}
        setIsNewsFeedFormVisible={setIsNewsFormVisible}
      />
    </div>
  );
}
