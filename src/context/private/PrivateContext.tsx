import { useState } from "react";
import { PrivateContext } from "./PrivateContextType";

interface Props {
  children: React.ReactNode;
}

export const PrivateContextProvider = ({ children }: Props) => {
    const [privateData, setPrivateData] = useState("Datos públicos");

    return (
        <PrivateContext.Provider value={{ privateData, setPrivateData }}>
            {children}
        </PrivateContext.Provider>
    );
};
