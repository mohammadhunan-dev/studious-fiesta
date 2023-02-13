import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthView from './Views/AuthView';
import HomeView from './Views/HomeView';
import reportWebVitals from './reportWebVitals';

import { HashRouter,Route, Routes, Navigate} from "react-router-dom"
import { AlertProvider } from './Hooks/AlertProvider';
import { UserProvider } from './Hooks/UserProvider';
import { useUser } from './Hooks/UserProvider';
import AlertDisplay from './Components/AlertDisplay';
import Copyright from './Components/CopyRight';


const AppWrapper = () => {
  return (
    <div className="View-wrapper">
    <header className="App-header">
      <p>
        Ticket Hero
      </p>
      <Routes>
        <Route path="/" element={<AuthView />} />
        <Route path="/home" element={<HomeViewWrapper />} />
      </Routes>
      <AlertDisplay />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </header>
  </div>
  )
}

const HomeViewWrapper = () => {
  const user = useUser();
  if(!user) return (<Navigate to="/" />);
  return (
    <HomeView />
  );
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <HashRouter>
          <AppWrapper />
        </HashRouter>
      </AlertProvider>
    </UserProvider>
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
