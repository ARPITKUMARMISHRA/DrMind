import { React, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../../hooks/authToken';
import AuthContext from '../../contexts/auth/authContext';

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


const theme = createTheme();

export default function Signin() {
  const nav = useNavigate();
  const [login, setLogin] = useContext(AuthContext);


  const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : '');
  const handleEmail = (e) => {
    localStorage.setItem('email', e.target.value);
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState('');
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    let res = await fetch('https://localhost:8001/auth/createSession', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let result = await res.json();
    if (res.status === 200 && result['auth-token']) {
      setToken('auth-token', result['auth-token']);  //storing jwt token in local storage
      setLogin(true);
      nav('/');
    } else {
      console.log('Could not authenticate');
    }
  }

  const shouldEnable = () => {
    if (password !== '' && email.match("[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}"))
      return true;
    else
      return false;
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleEmail}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handlePassword}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {
              shouldEnable()
                ?
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                :
                <Button
                  disabled
                  type="submit"
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
            }
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}