import React, { createContext, useContext, useLayoutEffect, useRef, useState } from "react";

// create a context that contains the alert state
const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    const [ alertMessage, setAlertMessage ] = useState()

    return (<AlertContext.Provider value={{ alertMessage, setAlertMessage}}>
            {children}
        </AlertContext.Provider>);
} 

export const useAlert = () => {
    const { alertMessage, setAlertMessage } = useContext(AlertContext)
    return { alertMessage, setAlertMessage }
}
