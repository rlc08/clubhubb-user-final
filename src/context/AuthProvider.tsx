import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { INITIAL_USER, IContextType } from "./AuthContext";
import { useVerifyuserMutation } from "@/store/api/authApi";
import { INewUser} from "@/types";


interface AuthProviderProps {
    children: React.ReactNode;
}

/*
type EventItem = {
    eventId: string;
    // other properties if there are any
  };
*/

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<INewUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use the useVerifyClubMutation hook
    const [verifyuser, {  isError, isSuccess }] = useVerifyuserMutation();
    console.log("verifyclub")
 


    const checkAuthUser = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
 

            if (!token) {
                throw new Error("Token not found");
            }

            // Use the verifyuserMutation function instead of the query
            const session = await verifyuser({ token });
            if (isError) {
                navigate("/sign-in");
                return false;
            }
            if('data' in session){
            const {data} =session;
            setIsAuthenticated(isSuccess);
            console.log(data)
            const { user } = data;
            
            // Check if user.eventsRegistered is an array
            if (Array.isArray(user.eventsRegistered)) {
                // Extract eventIds from eventsRegistered array
          //      const eventIds = user.eventsRegistered
         //         .filter((event: EventItem) => 'eventId' in event) // Specify the type of event
         //         .map((event: EventItem) => event.eventId);

          //        console.log(eventIds)
            
                // Set the extracted eventIds to eventsRegistered in setUser
                setUser({
                    userId: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    collegeName: user.collegeName,
                    phoneNumber: user.phoneNumber,
                    eventsRegistered: user.eventsRegistered,
                });
            }
            console.log("user")
            console.log(user);
              
            return true;
        }
        return false
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            navigate("/sign-up");
 
        } else {
            checkAuthUser();
         }
    }, []);
    const value: IContextType = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
