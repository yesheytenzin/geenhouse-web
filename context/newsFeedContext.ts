import { createContext } from "react";

interface NFType {
  isChanged: boolean,
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>
}
const NewsFeedContext = createContext<NFType>({
  isChanged: false,
  setIsChanged: (isChanged: boolean) => !isChanged,
});

export default NewsFeedContext;

