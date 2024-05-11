import React, { useEffect, useState } from "react"
import { Typography, Box, FormGroup, FormControl, RadioGroup, FormControlLabel, Radio, Stack, Button } from "@mui/material"
import { useLocation } from 'react-router-dom';
import CountDownTimer from "../components/countdownTimer";
import axios from "axios"
import { SERVER_HOST } from "../App";
import { purple200 } from "../App";
import { grey200 } from "../App";


export default function QuizView(props) {
    const stylesheet={
        option:{
            border:"2px solid grey",
            borderRadius:"10px",
            flexBasis: "200px", 
            flexGrow: 1,
            marginInline:"0px"
        },
        selected:{
            border:`2px solid ${purple200}`
        }
    }

    const [quizDetails, setQuizDetails] = useState([{}])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [questions, setQuestions] = useState([{question:"",options:{},correctAnswer:""}])

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
        // event.target.value = null
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
        var x =  ()=>{setQuestionNumber(questionNumber + 1);event.target.disabled=false}
        if (questionNumber+1 !== questions.length) x() 
    }

    function displayPreviousQuestion(event) {
        var x = ()=>{setQuestionNumber(questionNumber - 1);event.target.disabled=false}
        if (questionNumber-1 !== -1 ) x() 
    }

    return (
        <Box display={"flex"} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} minHeight={"99vh"}>
            {/* <CountDownTimer duration={90} colors={["#ff9248", "#a20000"]}
                colorValues={[20, 10]}
            onComplete={handleOnComplete} /> */}
            <FormControl sx={{
                border: `2px solid ${purple200}`, width: "min(100%, 900px)", boxSizing: "border-box",
                paddingBlock:
                    { xs: 3, md: 10 },
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", flexDirection: "column", gap: "20px", borderRadius: 5, boxShadow: { xs: "none", md: "0px 0px 10px grey" }
            }}>
                <Typography textAlign={"center"} variant="h5">
                    {/* {quizDetails[0].questions[questionNumber]} */}
                    <span style={{color:`${grey200}`}}>Question {questionNumber+1}/{questions.length}</span> {questions[questionNumber].question }
                </Typography>

                <RadioGroup onChange={changeSelectedRadio} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* //  * use A,B,C,D for values and option text like paris as label */}
                    {/* //  *TODO selected border should be purpled, unselected grey */}

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-A" label={`${questions[questionNumber].options.a}`} value="A" className="option" sx={stylesheet.option} />
                        <FormControlLabel control={<Radio />} id="option-B" label={`${questions[questionNumber].options.b}`} value="B" className="option" sx={stylesheet.option} />
                    </Box>

                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} gap={1} >
                        <FormControlLabel control={<Radio />} id="option-C" label={`${questions[questionNumber].options.c}`} value="C" className="option" sx={stylesheet.option} />
                        <FormControlLabel control={<Radio />} id="option-D" label={`${questions[questionNumber].options.d}`} value="D" className="option" sx={stylesheet.option} />
                    </Box>
                </RadioGroup>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button variant="contained" onClick={displayPreviousQuestion}>Previous</Button>
                    <Button variant="contained" onClick={displayNextQuestion}>Next</Button>
                </Stack>
            </FormControl>
        </Box>
    )
}

