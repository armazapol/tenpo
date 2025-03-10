import { createContext } from "react";

export interface PublicContextProps {
    publicData: string;
    setPublicData: React.Dispatch<React.SetStateAction<string>>;
}

export const defaultValue: PublicContextProps = {
    publicData: "",
    setPublicData: () => {},
};

export const PublicContext = createContext<PublicContextProps>(defaultValue); 