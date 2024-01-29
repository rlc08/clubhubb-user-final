import { createContext } from "react";
import { INewUser } from "@/types";

export interface IContextType {
    user: INewUser;
    setUser: React.Dispatch<React.SetStateAction<INewUser>>;
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

export const INITIAL_USER = {
    userId: "",
    email: "",
    name: "",
    username: "",
    phoneNumber: "",
    collegeName: "",
    eventsRegistered: [],
};

export const INITIAL_STATE: IContextType = {
    user: INITIAL_USER,
    setUser: () => {},
    isLoading: false,
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default AuthContext;
