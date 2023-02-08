import React, {useState} from 'react';
import '../Styles/GlobalStyles.css';
import { TextField, Button, Stack } from '@mui/material';

const AddNewCarForm = () => {
    const [newCarName, setNewCarName] = useState<string>("");
    const [newLicensePlateNumber, setNewLicensePlateNumber] = useState<string>("");

    const onNewCarNameChange = (e: any) => setNewCarName(e.target.value);
    const onNewLicensePlateChange = (e: any) => setNewLicensePlateNumber(e.target.value);

    const handleSubmit = () => console.log({
        newCarName,
        newLicensePlateNumber
    });

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
            <h3>Add car to keep track of</h3>
            <TextField
                onChange={onNewCarNameChange}
                value={newCarName}
                label={"Car Name (make and model)"}
            />
            <TextField
                onChange={onNewLicensePlateChange}
                value={newLicensePlateNumber}
                label={"License Plate #"}
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Stack>
    );    
};

export default AddNewCarForm;