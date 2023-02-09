import React, {useState} from 'react';
import AddNewCarForm from '../Components/AddNewCarForm';
import TicketList from '../Components/TicketList';
import '../Styles/GlobalStyles.css';
import Button from '@mui/material/Button';
import { getAuth, signOut} from "firebase/auth";
import { firebaseApp } from '../Firebase/firebase-app';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

const HomeView = () => {
    const LogOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed Out");
        });
    }
    return (
        <>
            <Button variant="text" color="primary" onClick={LogOutUser}>Sign Out</Button>
            <div className="Home-header">
                <AddNewCarForm />
                <TicketList />
            </div>
        </>
    );    
};

export default HomeView;