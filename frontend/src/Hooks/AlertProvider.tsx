import React, { createContext, useContext, useLayoutEffect, useRef, useState, Dispatch, SetStateAction } from "react";

interface Alert{
    alertMessage: string;
    setAlertMessage: Dispatch<SetStateAction<string>>;
}

// create a context that contains the alert state
const AlertContext = React.createContext({} as Alert);

export const AlertProvider = ({children}: {children: React.ReactNode}) => {
    const [ alertMessage, setAlertMessage ] = React.useState('')

    return (<AlertContext.Provider value={{ alertMessage, setAlertMessage}}>
            {children}
        </AlertContext.Provider>);
} 

export const useAlert = () => {
    const { alertMessage, setAlertMessage } = React.useContext(AlertContext)
    return { alertMessage, setAlertMessage }
}
