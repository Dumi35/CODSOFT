import React, { useEffect, useState, useRef } from "react"
import { Typography, Box, FormGroup, FormControl, RadioGroup, FormControlLabel, Radio, Stack, Button, IconButton, Tooltip } from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom';
import { purple200 } from "../App";
import { grey200 } from "../App";
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function QuizReview(props) {
    const stylesheet = {
        option: {
            border: "2px solid grey",
            borderRadius: "10px",
            flexBasis: "200px",
            flexGrow: 1,
            marginInline: "0px"
        },
        right: {
            border: `2px solid green`
        },
        wrong: {
            border: "2px solid red"
        }
    }

    const [quizDetails, setQuizDetails] = useState([{}])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [questions, setQuestions] = useState([{ question: "", options: {}, correctAnswer: "" }])
    const [userAnswers, setUserAnswers] = useState([])
    const [currentAnswer, setCurrentAnswer] = useState("")

    const location = useLocation()
    const navigate = useNavigate()

    function openDashboard() {
        navigate("/dashboard")
    }

    function changeSelectedRadio(userAnswer, correctAnswer) {
        // Reset border color for all options
        document.querySelectorAll('.option').forEach(option => {
            option.style = "border: 2px solid grey";
        });
        // Apply border color to the selected option
        const selectedOption = document.getElementById(`option-${userAnswer}`);
        if (selectedOption) {
            selectedOption.style = "border: 2px solid red"
        }

        const rightOption = document.getElementById(`option-${correctAnswer}`);
        if (rightOption) {
            rightOption.style = "border: 2px solid green"
        }

    }

    //load all the questions
    useEffect(() => {
        const { name } = location.state.quizDetails;
        const { questions, userAnswers } = location.state;
        setQuizDetails({ name });
        setQuestions(questions);
        setUserAnswers(userAnswers);
        setCurrentAnswer(userAnswers[questionNumber])
        changeSelectedRadio(userAnswers[questionNumber], questions[questionNumber].correctAnswer.toUpperCase())
    }, [])

    function displayNextQuestion(event) {
        if (questionNumber + 1 !== questions.length) { //if not end of questions
            setQuestionNumber(questionNumber + 1);
            setCurrentAnswer(userAnswers[questionNumber + 1])
            changeSelectedRadio(userAnswers[questionNumber + 1], questions[questionNumber + 1].correctAnswer.toUpperCase())
        }
    }

    function displayPreviousQuestion(event) {
        if (questionNumber - 1 !== -1) { //if not last question
            setQuestionNumber(questionNumber - 1);
            setCurrentAnswer(userAnswers[questionNumber - 1])
            changeSelectedRadio(userAnswers[questionNumber - 1], questions[questionNumber - 1].correctAnswer.toUpperCase())
        }
    }

    return (
        <Box display={"flex"} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} minHeight={"99vh"}>

            <FormControl sx={{
                width: "min(100%, 900px)", boxSizing: "border-box",
                paddingBlock:
                    { xs: 3, md: 10 },
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", flexDirection: "column", gap: "20px", borderRadius: 5, boxShadow: { xs: "none", md: "0px 0px 10px grey" }
            }}>
                <Tooltip title="Return to dashboard">
                    <IconButton
                        onClick={openDashboard}
                        size="small"
                        sx={{
                            ml: 0, padding: 0, '&:hover': {
                                backgroundColor: 'transparent', // Custom hover background color
                            },
                        }}
                    >
                        <DashboardIcon />
                    </IconButton>
                </Tooltip>

                <Typography textAlign={"center"} variant="h5">
                    {quizDetails.name}
                </Typography>

                <Typography textAlign={"center"} variant="h6">
                    <span style={{ color: `${grey200}` }}>Question {questionNumber + 1}/{questions.length}</span> {questions[questionNumber].question}
                </Typography>

                <RadioGroup sx={{ display: "flex", flexDirection: "column", gap: "10px" }} value={currentAnswer} disabled={true}>

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-A" label={`A. ${questions[questionNumber].options.a}`} value="A" sx={stylesheet.option} className="option" />
                        <FormControlLabel control={<Radio />} id="option-B" label={`B. ${questions[questionNumber].options.b}`} value="B" sx={stylesheet.option} className="option" />
                    </Box>

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-C" label={`C. ${questions[questionNumber].options.c}`} value="C" sx={stylesheet.option} className="option" />
                        <FormControlLabel control={<Radio />} id="option-D" label={`D. ${questions[questionNumber].options.d}`} value="D" sx={stylesheet.option} className="option" />
                    </Box>
                </RadioGroup>
                <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
                    <Button variant="contained" onClick={displayPreviousQuestion}>Previous</Button>
                    <Button variant="contained" onClick={displayNextQuestion}>Next</Button>
                </Stack>
            </FormControl>
        </Box>
    )
}

