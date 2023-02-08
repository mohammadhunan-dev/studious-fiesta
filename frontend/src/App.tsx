import React from 'react';
import { Link } from "react-router-dom";
import Authenticator from './Components/Authenticator';
import Typography from '@mui/material/Typography';
import './Styles/GlobalStyles.css';
import { AlertProvider } from './Hooks/AlertProvider';
import { UserProvider } from './Hooks/UserProvider';
import AlertDisplay from './Components/AlertDisplay';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="#">
        tickerhero.app
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <div className="View-wrapper">
          <header className="App-header">
            <p>
              Ticket Hero
            </p>
            <Authenticator />
            <Link to={`/home`}>Home</Link>
            <AlertDisplay />
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </header>
        </div>
      </AlertProvider>
    </UserProvider>
  );
}

export default App;
