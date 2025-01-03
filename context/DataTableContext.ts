import { createContext, useContext } from "react";

export interface DataTableUserType {
  isChanged: boolean,
  setIsChanged: React.Dispatch<boolean>
}
const DataTableUserContext = createContext<DataTableUserType>({
  isChanged: false,
  setIsChanged: (isChanged: boolean) => !isChanged,
});

export const useTableChangeState = () => useContext(DataTableUserContext);
export default DataTableUserContext;
