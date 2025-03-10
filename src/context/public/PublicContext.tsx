import { useState } from "react";
import { PublicContext } from "./PublicContextType";

interface Props {
  children: React.ReactNode;
}

export const PublicContextProvider = ({ children }: Props) => {
    const [publicData, setPublicData] = useState("Datos públicos");

    return (
        <PublicContext.Provider value={{ publicData, setPublicData }}>
            {children}
        </PublicContext.Provider>
    );
};
