import React, {useEffect, useState} from 'react';
import '../Styles/GlobalStyles.css';
import { TextField, Button, Stack } from '@mui/material';
import { useUser } from '../Hooks/UserProvider';

const AddNewCarForm = () => {
    const [carName, setCarName] = useState<string>("");
    const [carLicensePlate, setCarLicensePlate] = useState<string>("");
    let user = useUser();

    const onNewCarNameChange = (e: any) => setCarName(e.target.value);
    const onNewLicensePlateChange = (e: any) => setCarLicensePlate(e.target.value);

    const handleSubmit = async () => {
        const post = await fetch('https://us-central1-tickethero-d1634.cloudfunctions.net/cars/new', {
            method: 'POST',
            body: JSON.stringify({
                carName,
                carLicensePlate,
                userEmail: user?.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const text = await post.text();
    }   
    return (
        <Stack className="Stack" spacing={2} sx={{
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            maxWidth: 400,
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            
        }}>
            <h1>User: {user?.email}</h1>
            <h3>Add car to keep track of</h3>
            <TextField
                onChange={onNewCarNameChange}
                value={carName}
                label={"Car Name (make and model)"}
            />
            <TextField
                onChange={onNewLicensePlateChange}
                value={carLicensePlate}
                label={"License Plate #"}
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Stack>
    );    
};

export default AddNewCarForm;