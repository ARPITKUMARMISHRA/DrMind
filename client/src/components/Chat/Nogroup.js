import React from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    Paper,
    Stack,
    Pagination
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme();

function Nogroup() {
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' style={{ maxWidth: '600px', marginTop: '50px' }}>

                <Paper elevation={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2em'
                    }}>
                    <Typography component='p' variant='p' width='100%'>It seems you have not taken your first mental health assessment test.</Typography>
                    <Typography component='p' variant='p' width='100%' marginBottom='10px'>Please take your first 'Quiz' to access the Chat.</Typography>
                    {/* Submit button */}
                    {
                        <Link to='/quiz' state={{ hint: true }}><Button id="next-button" variant='contained' size='small' style={{ width: 'fit-content' }}>Quiz</Button></Link>
                    }
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Nogroup;