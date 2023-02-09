import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button, Stack, Box } from '@mui/material';
import { useUser } from '../Hooks/UserProvider';

const stubCarsData = [
    {
        name: "Nissan Sentra",
        licensePlateNumber: "ABC123",
        tickets: [
            {
                id: 13224,
                type: "Speeding",
                date: "2021-09-01",
                amount: 100,
                paid: false
            },
            {
                id: 94124,
                type: "Parking",
                date: "2021-11-08",
                amount: 50,
                paid: false
            }
        ]
    },
    {
        name: "Toyota Camry",
        licensePlateNumber: "DEF456",
        tickets: [
            {
                id: 81423,
                type: "Parking",
                date: "2021-02-15",
                amount: 50,
                paid: false
            }
        ]
    }
]

const baseGridColumn = { 
    width: 150,
    editable: false,
}

const columns: GridColDef[] = [
    {
        ...baseGridColumn,
        field: 'summons_number',
        headerName: 'Summons Number',
    },
    {
        ...baseGridColumn,
        field: 'violation',
        headerName: 'Violation',
    },
    {
        ...baseGridColumn,
        field: 'issue_date',
        headerName: 'Issue Date',
    },
    {
        ...baseGridColumn,
        field: 'fine_amount',
        headerName: 'Fine Amount',
    },
    {
        ...baseGridColumn,
        field: 'penalty_amount',
        headerName: 'Penalty Amount',
    },
    {
        ...baseGridColumn,
        field: 'payment_amount',
        headerName: 'Payment Amount',
    },
    {
        ...baseGridColumn,
        field: 'amount_due',
        headerName: 'Amount Due (Still Owed)',
    },
    {
        ...baseGridColumn,
        field: 'amount_due',
        headerName: 'Amount Due (Still Owed)',
    },
    {
        ...baseGridColumn,
        field: 'summons_image.url',
        headerName: 'Summons Image URL',
    },
];

interface Car {
    carName: string;
    user_id: string;
    carLicensePlate: string;
    tickets: Tickets;
}

interface Cars extends Array<Car> { }

interface Ticket {
    summons_number: string;
    violation: string;
    issue_date: string;
    fine_amount: string;
    penalty_amount: string;
    payment_amount: string;
    amount_due: string;
    summons_image: {
        url: string;
    }
}

interface Tickets extends Array<Ticket> { }

const TicketList = () => {
    const user = useUser();  
    const usersCarsURL = `https://us-central1-tickethero-d1634.cloudfunctions.net/cars/${user?.uid}`;
    const [cars, setCars] = useState<Cars>([]);

    useEffect(() => {
        let tempCarsList: Cars = [];

        const fetchCars = async (url: string) => {
            const data = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json; charset=UTF-8',}
            })
            const json = await data.json();
            tempCarsList = json;
        }

        const fetchTickets = async (url: string) => {
            const data = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json; charset=UTF-8',}
            })
            const json = await data.json();
            return json;
        }

        fetchCars(usersCarsURL)
        .then(()=> {
            const urls: Array<string> = [];

            tempCarsList.forEach((car) => {
                car.tickets = [];
                const url = `https://data.cityofnewyork.us/resource/nc67-uf89.json?plate=${car.carLicensePlate}`;
                urls.push(url);
            })
            Promise.all(urls.map(url => fetch(url)))
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(tickets => {
                const newCars: Cars = [];
                
                tempCarsList.forEach((car, index) => {
                    const tempCar = car;
                    tempCar.tickets = tickets[index];
                    newCars.push(tempCar);
                })
                setCars(newCars)
            })
            .catch((err) =>{
                console.log('an error occurred while getting your tickets', err);
            })

        })
        .catch((err) => {
            console.log('an error occurred while getting your cars', err);
        })

    }, []);

    return (
        <div>
 
            {
                cars?.map((car: Car, index) => {
                    return(
                        <div key={`${car.carLicensePlate}-${index}`}>
                            <p>{car.carName}</p>
                            <p>{car.carLicensePlate}</p>
                            <p>{car.tickets.length}</p>
                            <div>
                                {/* <Box sx={{ height: 400, width: 750 }}>
                                    <DataGrid
                                        rows={car.tickets}
                                        columns={columns}
                                        disableSelectionOnClick
                                        experimentalFeatures={{ }}
                                        getRowId={(row) => row.summons_number}
                                    />
                                </Box> */}
                            </div>

                            {
                                // car.tickets.map((ticket: Ticket, index) => {
                                //     return (
                                //         <div key={ticket.summons_number + '-' + index}>
                                //             <Box sx={{ height: 400, width: 750 }}>
                                //                 <DataGrid
                                //                     rows={tickets}
                                //                     columns={columns}
                                //                     disableSelectionOnClick
                                //                     experimentalFeatures={{ }}
                                //                 />
                                //             </Box>
                                //         </div>
                                //     )
                                // })
                            }
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default TicketList;