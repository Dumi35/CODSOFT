import React, { useEffect, useState, useRef } from "react"
import { Typography, Box, FormGroup, FormControl, RadioGroup, FormControlLabel, Radio, Stack, Button, DialogContent, Dialog, DialogActions, Avatar } from "@mui/material"
import { useLocation } from 'react-router-dom';
import CountDownTimer from "../components/countdownTimer";
import axios from "axios"
import { SERVER_HOST } from "../App";
import { purple200 } from "../App";
import { grey200 } from "../App";
import complete from "../assets/images/complete.gif"

export default function QuizView(props) {
    const stylesheet = {
        option: {
            border: "2px solid grey",
            borderRadius: "10px",
            flexBasis: "200px",
            flexGrow: 1,
            marginInline: "0px"
        },
        selected: {
            border: `2px solid ${purple200}`
        }
    }

    const [quizDetails, setQuizDetails] = useState([{}])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [questions, setQuestions] = useState([{ question: "", options: {}, correctAnswer: "" }])
    const [userAnswers, setUserAnswers] = useState([])
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)

    const location = useLocation()

    const handleOnComplete = () => {
        console.log("Completed");
    };

    function changeSelectedRadio(event, value) {
        // Reset border color for all options
        document.querySelectorAll('.option').forEach(option => {
            option.style = stylesheet.option;
        });
        // Apply border color to the selected option
        const selectedOption = document.getElementById(`option-${value}`);
        if (selectedOption) {
            selectedOption.style = stylesheet.selected;
        }
        setCurrentAnswer(value)
        userAnswers[questionNumber] = value
        console.log(userAnswers)
    }

    //load all the questions
    useEffect(() => {
        axios.get(`${SERVER_HOST}/questions?quiz=${location.state.name}`, { params: { name: location.state.name } }).then((res) => {
            console.log(res)
            const { name, questions } = res.data[0];
            setQuizDetails({ name });
            setQuestions(questions);

        }).catch((e) => { console.log(e) })
    }, [])

    function displayNextQuestion(event) {
        var x = () => { setQuestionNumber(questionNumber + 1); setCurrentAnswer("") }
        if (questionNumber + 1 !== questions.length) {
            x()
        }
    }

    function displayPreviousQuestion(event) {
        var x = () => { setQuestionNumber(questionNumber - 1); setCurrentAnswer(userAnswers[questionNumber]) }
        if (questionNumber - 1 !== -1) x()
    }

    function submitAnswers(event) {
        let newScore = 0
        userAnswers.map((item, index) => {
            console.log(item)
            console.log(questions[index].correctAnswer.toUpperCase())
            if (item === questions[index].correctAnswer.toUpperCase()) {
                newScore += 1;
            }
            setScore(newScore)
        })
        setShowScore(true)
    }

    function DisplayScore() {
        return (
            <Dialog open={showScore} PaperProps={{ sx: { padding:"10px 20px"} }}>
                <DialogContent >
                    <Stack gap={1} justifyContent={"center"} alignItems={"center"}>
                        <Avatar src={complete} sx={{ width: "90px", aspectRaio: 1, height: "auto", bgcolor:purple200 }}></Avatar>
                        <Typography>Score: {score}/{questions.length}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setShowScore(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
        )
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
                {/* <CountDownTimer duration={90} colors={["#ff9248", "#a20000"]}
                    colorValues={[20, 10]}
                    onComplete={handleOnComplete} /> */}
                <Typography textAlign={"center"} variant="h5">
                    {quizDetails.name}
                </Typography>

                <Typography textAlign={"center"} variant="h6">
                    <span style={{ color: `${grey200}` }}>Question {questionNumber + 1}/{questions.length}</span> {questions[questionNumber].question}
                </Typography>

                <RadioGroup onChange={changeSelectedRadio} sx={{ display: "flex", flexDirection: "column", gap: "10px" }} value={currentAnswer}>
                    {/* //  * use A,B,C,D for values and option text like paris as label */}
                    {/* //  *TODO selected border should be purpled, unselected grey */}

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-A" label={`A. ${questions[questionNumber].options.a}`} value="A" className="option" sx={stylesheet.option} />
                        <FormControlLabel control={<Radio />} id="option-B" label={`B. ${questions[questionNumber].options.b}`} value="B" className="option" sx={stylesheet.option} />
                    </Box>

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-C" label={`C. ${questions[questionNumber].options.c}`} value="C" className="option" sx={stylesheet.option} />
                        <FormControlLabel control={<Radio />} id="option-D" label={`D. ${questions[questionNumber].options.d}`} value="D" className="option" sx={stylesheet.option} />
                    </Box>
                </RadioGroup>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button variant="contained" onClick={displayPreviousQuestion}>Previous</Button>
                    <Button variant="contained" onClick={submitAnswers}>Submit</Button>
                    <Button variant="contained" onClick={displayNextQuestion}>Next</Button>
                </Stack>
            </FormControl>
            {showScore && <DisplayScore />}
        </Box>
    )
}

