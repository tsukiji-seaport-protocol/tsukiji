import { createContext } from "react";

export const SeaportContext = createContext();

export default function SeaportProvider({ children }: any) {
  return (
    <SeaportContext.Provider value="Reed">{children}</SeaportContext.Provider>
  );
}
