import React from 'react';
import Alert from '@mui/material/Alert';
import { useAlert } from '../Hooks/AlertProvider';

const AlertDisplay = () => {
    const {alertMessage} = useAlert();
    if(!alertMessage) return null;
    return (
        <div>
            <Alert severity="error">{alertMessage}</Alert>
        </div>
    );
};

export default AlertDisplay;