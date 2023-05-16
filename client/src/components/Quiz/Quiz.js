import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

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

import { QuizData } from './QuizData'
import QuizResult from './QuizResult';
// import Popup from './Popup';
import './quiz.css';
import Navbar from '../Navbar/Navbar';
import Popup from './Popup';

import AuthState from '../../contexts/auth/authState';
import AuthContext from '../../contexts/auth/authContext';


const theme = createTheme();



function Quiz() {
    const [login, setLogin, socket] = useContext(AuthContext);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [page, setPage] = useState(1);

    const { state } = useLocation();
    const [modalVisible, setModalVisible] = useState((login && state) ? (state.hint === true) : false);

    useEffect(() => {
        const func = (event) => {
            if (document.hasFocus()) {
                if (clickedOption >= 1 && clickedOption <= 4)
                    document.getElementById('next-button').click();
            }
        };
        document.addEventListener('keypress', func);
        return () => { document.removeEventListener('keypress', func); };
    }, [clickedOption]);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < QuizData.length - 1) {
            setPage(currentQuestion + 1)
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true)
        }
    }
    const updateScore = () => {
        if (clickedOption) {
            let temp = QuizData[currentQuestion].answer[Number.parseInt(clickedOption) - 1];
            setScore(score + temp);
            let temp2 = QuizData[currentQuestion].answer[0];
            setTotalScore(totalScore + temp2);
        }
    }

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
        setTotalScore(0);
    }


    const handleModalVisibility = (visibility) => {
        setModalVisible(visibility);
    }

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            {
                showResult ?
                    <QuizResult score={score} totalScore={totalScore} tryAgain={resetAll} />
                    :
                    <Container component='main' style={{ maxWidth: '600px', marginTop: '50px' }}>

                        {modalVisible ?
                            <Popup handleModalVisibility={handleModalVisibility} />
                            : null}

                        <Typography variant='h4' textAlign='center'>Mental Health Test</Typography>
                        <Paper elevation={3}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '2em'
                            }}>
                            {/* Question */}
                            <Container className="question" style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                <Typography component='div' variant='h4'>{currentQuestion + 1}.&nbsp;</Typography>
                                <Typography component='div' variant='h5'>{QuizData[currentQuestion].question}</Typography>
                            </Container>
                            {/* Options */}
                            <Paper className="option-container" elevation={0}>
                                {QuizData[currentQuestion].options.map((option, i) => {
                                    return (
                                        <Paper
                                            elevation={1}
                                            className={`${clickedOption === i + 1 ? "checked" : null} option-btn `}
                                            key={i}
                                            onClick={() => setClickedOption(i + 1)} >
                                            {option}
                                        </Paper>
                                    )
                                })}
                            </Paper>
                            {/* Submit button */}
                            {
                                clickedOption === 0 ?
                                    <Button id="next-button" onClick={changeQuestion} variant='contained' size='small' style={{ width: 'fit-content' }} disabled>Next</Button>
                                    :
                                    <Button id="next-button" onClick={changeQuestion} variant='contained' size='small' style={{ width: 'fit-content' }}>Next</Button>
                            }
                        </Paper>
                        <Stack mt={2} spacing={2}>
                            <Box display='flex' justifyContent='center'>
                                <Pagination style={{ justifyContent: 'center' }} count={QuizData.length} page={currentQuestion + 1} hidePrevButton hideNextButton siblingCount={1} boundaryCount={1} />
                            </Box>
                        </Stack>
                    </Container>
            }
        </ThemeProvider >
    )
}

export default Quiz;