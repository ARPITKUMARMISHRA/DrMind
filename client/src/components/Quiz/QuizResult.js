import React, { useContext, useEffect, useState } from 'react';
import AuthState from '../../contexts/auth/authState';
import AuthContext from '../../contexts/auth/authContext';

import {
  Typography,
  Button,
  Box,
  Paper,
  Container
} from '@mui/material';
import Suggestions from './Suggestions';

function QuizResult(props) {
  const [login, setLogin, socket] = useContext(AuthContext);

  const [percentage] = useState(() => {
    let percentage = (props.score / props.totalScore * 100).toFixed(0);
    return percentage;
  });
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('');
  useEffect(() => {
    if (percentage >= 75) {
      setBgColor('#a1f39e');
      setMessage('No symptoms of depression or anxiety');
    } else if (percentage >= 50) {
      setBgColor('#e6eb6b');
      setMessage('Mild symptoms of anxiety, stress or depression');
    } else if (percentage >= 25) {
      setBgColor('#ffad3b');
      setMessage('Moderate symptoms of anxiety, stress or depression');
    } else if (percentage >= 0) {
      setBgColor('#ff5959');
      setMessage('Severe case of depression or extreme anxiety');
    }
  }, [percentage]);

  // Updating the user's group on server
  useEffect(() => {
    if (login) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/user/updateGroup`, {
        method: 'POST',
        body: JSON.stringify({ percentage }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(async (data) => {
        data = await data.clone().json();
        const login2 = new Object(login);
        login2.group = data.group;
        console.log(login2);
        setLogin(login2);
      });
    }
  }, []);

  return (
    <>
      <Container component='main' style={{ maxWidth: '600px', marginTop: '50px' }}>
        <Typography variant='h4' textAlign='center'>Test Results</Typography>
        <Paper elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2em',
            backgroundColor: bgColor,
            color: 'white'
          }}>
          <Box textAlign='center' mb={2}>
            {/* <Typography>Your Score:{props.score}</Typography>
        <Typography>Total Score:{props.totalScore}</Typography> */}
            <Typography mb={0.5}>Your Score: {percentage}%</Typography>
            <Typography>{message}</Typography>
          </Box>
          <Button variant='contained' id="next-button" onClick={props.tryAgain}>Try Again</Button>
        </Paper>
      </Container>
      <Suggestions percentage />
    </>
  );
}

export default QuizResult;