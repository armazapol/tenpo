import { authConfig } from "./authConfig";


export const authenticate = (username: string, password: string): boolean => {
  return (
    username === authConfig.username && password === authConfig.password
  );
};