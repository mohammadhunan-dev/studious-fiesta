import React, { createContext, useContext, useLayoutEffect, useRef, useState, Dispatch, SetStateAction, useEffect } from "react";
import { User as FirebaseUser, getAuth} from "firebase/auth";
import { firebaseApp } from "../Firebase/firebase-app";

const auth = getAuth(firebaseApp);

type User = FirebaseUser | null;
type ContextState = { user: User};
const UserContext = createContext<ContextState | null>(null);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [ user, setUser ] = useState<User>(null);
    const value = { user }; 
    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return unsubscribe;
    }, []);

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
        
    )
}

export const useUser = () => {
    const context = React.useContext(UserContext);

    if (context === undefined) {
        throw new Error(
          "useUser hook must be used within a UserProvider"
        );
    }

    return context?.user;
}

