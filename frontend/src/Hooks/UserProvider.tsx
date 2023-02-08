import React, { createContext, useContext, useLayoutEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { User as FirebaseUser, getAuth} from "firebase/auth";

const auth = getAuth();

interface WrappedUser{
    user: FirebaseUser | null;
    setUser: Dispatch<SetStateAction<FirebaseUser | null>>;
}

const UserContext = React.createContext({} as WrappedUser);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [ user, setUser ] = useState<FirebaseUser | null>(auth.currentUser);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
        
    )
}

export const useUser = () => {
    const { user, setUser } = React.useContext(UserContext);
    return { user, setUser }
}