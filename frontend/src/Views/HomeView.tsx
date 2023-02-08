import React, {useState} from 'react';
import AddNewCarForm from '../Components/AddNewCarForm';
import TicketList from '../Components/TicketList';
import '../Styles/GlobalStyles.css';

const HomeView = () => {
    return (
        <div className="Home-header">
            <AddNewCarForm />
            <TicketList />
        </div>
    );    
};

export default HomeView;