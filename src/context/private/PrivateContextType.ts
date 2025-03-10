import { createContext } from "react";

export interface PrivateContextProps {
    privateData: string;
    setPrivateData: React.Dispatch<React.SetStateAction<string>>;
}

export const defaultValue: PrivateContextProps = {
    privateData: "",
    setPrivateData: () => {},
};

export const PrivateContext = createContext<PrivateContextProps>(defaultValue); 