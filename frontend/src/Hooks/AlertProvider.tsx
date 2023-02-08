import React, { createContext, useContext, useLayoutEffect, useRef, useState, Dispatch, SetStateAction } from "react";

interface Alert{
    alertMessage: string;
    setTemporaryAlertMessage: (message: string) => void;
}

// create a context that contains the alert state
const AlertContext = React.createContext({} as Alert);

export const AlertProvider = ({children}: {children: React.ReactNode}) => {
    const [ alertMessage, setAlertMessage ] = React.useState('')

    const setTemporaryAlertMessage = (message: string) => {

        setAlertMessage(message);

        setTimeout(() => {
            setAlertMessage('');
        }, 5000);
    }

    return (<AlertContext.Provider value={{ alertMessage, setTemporaryAlertMessage}}>
            {children}
        </AlertContext.Provider>);
} 

export const useAlert = () => {
    const { alertMessage, setTemporaryAlertMessage } = React.useContext(AlertContext)
    return { alertMessage, setTemporaryAlertMessage }
}
