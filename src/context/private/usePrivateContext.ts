import { useContext } from "react";
import { PrivateContext } from "./PrivateContextType";

export const usePrivateContext = () => {
  const context = useContext(PrivateContext);
  if (context === undefined) {
    throw new Error(
      "Error al usar el PrivateContext"
    );
  }
  return context;
}; 