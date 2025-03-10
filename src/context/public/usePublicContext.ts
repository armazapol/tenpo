import { useContext } from "react";
import { PublicContext } from "./PublicContextType";

export const usePublicContext = () => {
  const context = useContext(PublicContext);
  if (context === undefined) {
    throw new Error(
      "Error al usar el PublicContext"
    );
  }
  return context;
}; 