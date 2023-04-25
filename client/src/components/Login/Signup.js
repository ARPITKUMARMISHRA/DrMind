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

export default function Signup() {
    const nav = useNavigate();
    const [login, setLogin] = useContext(AuthContext);

    const [name, setName] = useState(localStorage.getItem('name') ? localStorage.getItem('name') : '');
    const handleName = (e) => {
        localStorage.setItem('name', e.target.value);
        setName(e.target.value);
    }

    const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : '');
    const handleEmail = (e) => {
        localStorage.setItem('email', e.target.value);
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const [password2, setPassword2] = useState('');
    const handlePassword2 = (e) => {
        setPassword2(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
            confirm_password: password2,
        }
        let res = await fetch('https://localhost:8001/auth/create', {
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
        if (name !== '' && password !== '' && password2 !== '' && email.match("[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}"))
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="fullName"
                                    value={name}
                                    onChange={handleName}
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={handleEmail}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    value={password2}
                                    onChange={handlePassword2}
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                        </Grid>
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
                                    Sign Up
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
                                    Sign Up
                                </Button>

                        }
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}