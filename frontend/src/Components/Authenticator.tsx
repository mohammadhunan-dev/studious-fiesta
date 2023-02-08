import React, {useState, useReducer} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useAlert } from '../Hooks/AlertProvider';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

const firebaseConfig = {
  apiKey: "AIzaSyC0XHSbWAHF1SsiZMMGLQgVB1OxmHj3fts",
  authDomain: "tickethero-d1634.firebaseapp.com",
  projectId: "tickethero-d1634",
  storageBucket: "tickethero-d1634.appspot.com",
  messagingSenderId: "306282224899",
  appId: "1:306282224899:web:2d91e097cfb2e0e7289d36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function Authenticator() {
  const { alertMessage, setAlertMessage } = useAlert();

  console.log(alertMessage);
  const [mode, setMode] = useState('SignUp');

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  
  // react router navigation hook
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    
    if(mode == 'SignUp') {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed Up 
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((error) => {
        setAlertMessage(error.message);
      });
    }else{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((error) => {
        setAlertMessage(error.message);
      });
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const toggleMode = () => { 
    if (mode == 'SignUp') { 
      setMode('SignIn');
    } else {
      setMode('SignUp');
    }
  } 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {
              mode == 'SignUp'? 'Sign Up' : 'Sign In'
            }
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {
                mode == 'SignUp'? 'Sign Up' : 'Sign In'
              }
            </Button>
            <Grid container>
              <Grid item xs>
                <Button href="#" size="small"> Forgot password? </Button>
              </Grid>
              <Grid item>

              <Button href="#" onClick={toggleMode} size="small">
                {
                  mode == 'SignUp'? "Already have an account? Sign In": "Don't have an account? Sign Up" 
                }
              </Button>
  
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}