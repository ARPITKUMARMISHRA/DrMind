import { React } from 'react';
import {
    Typography,
    Button,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function NotFound() {
    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography variant="h1" align="center" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Sorry, the page you are looking for could not be found.
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Go to Home Page
                </Button>
            </Box>
        </>
    );
};

export default NotFound;
