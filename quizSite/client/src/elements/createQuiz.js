import React, { useRef, useState, useEffect } from "react"
import { Typography, Box, FormGroup, FormControl, Button, DialogContent, Dialog, DialogActions, Avatar, TextField, FormLabel } from "@mui/material"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { SERVER_HOST } from "../App"

export default function CreateQuiz() {
    const navigate = useNavigate()
    const email = sessionStorage.getItem("user_email")
    const [questions, setQuestions] = useState([])
    const [quizName, setQuizName] = useState("")
    const [question, setQuestion] = useState("")
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")

    const [correctAnswer, setCorrectAnswer] = useState("")

    function addQuestion(event) {
        const form = document.getElementById("create-quiz-form")
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData)
        
        let {name,question,optionA,optionB,optionC,optionD,correctAnswer}=formJson
        if (name!=="" && question!=="" && optionA!=="" && optionB!=="" && optionC!=="" && optionD!=="" && correctAnswer!==""){
            questions.push({ question: question, options: { a: optionA, b: optionB, c: optionC, d: optionD }, correctAnswer: correctAnswer })
            setQuestion("")
            setOptionA("")
            setOptionB("")
            setOptionC("")
            setOptionD("")
            setCorrectAnswer("")
       }
       console.log(questions)
        
    }

    
    function saveQuiz(event) {   
        event.preventDefault()
        addQuestion() 
        const form = document.getElementById("create-quiz-form")
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData)
        
        let {name}=formJson

        axios.post(`${SERVER_HOST}/quiz`,{name,email,questions}).then((res) => {
            console.log(res)
            navigate("/dashboard")
        }).catch((e) => { console.log(e) })
    }

    return (
        <form onSubmit={saveQuiz} id="create-quiz-form">
            <Box display={"flex"} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} minHeight={"99vh"} paddingBlock={"10px"}>
                <FormControl sx={{
                    width: "min(100%, 900px)", boxSizing: "border-box",
                    paddingBlock:
                        { xs: 3, md: 5 },
                    paddingInline: {
                        xs: 3,
                        md: 10
                    }, display: "flex", flexDirection: "column", gap: "20px", borderRadius: 5, boxShadow: { xs: "none", md: "0px 0px 10px grey" }
                }}>
                    <FormLabel>
                        <Typography variant="h3">Create Quiz</Typography>

                    </FormLabel>
                    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
                        <TextField variant="standard" label="Title" name="name" required sx={{ flexGrow: 1 }} onChange={(event) => { setQuizName(event.target.value) }} />
                        <TextField variant="standard" label="Description" name="description" sx={{ flexGrow: 1 }} />
                    </Box>
                    <TextField label="Question" multiline row={2} maxRows={2} required value={question} onChange={(event) => { setQuestion(event.target.value) }} name="question" />
                    <TextField label="Option A" multiline row={2} maxRows={2} required value={optionA} onChange={(event) => { setOptionA(event.target.value) }} name = "optionA"/>
                    <TextField label="Option B" multiline row={2} maxRows={2} required value={optionB} onChange={(event) => { setOptionB(event.target.value) }} name = "optionB"/>
                    <TextField label="Option C" multiline row={2} maxRows={2} required value={optionC} onChange={(event) => { setOptionC(event.target.value) }} name = "optionC" />
                    <TextField label="Option D" multiline row={2} maxRows={2} required onChange={(event) => { setOptionD(event.target.value) }} value={optionD} name = "optionD"/>
                    <TextField label="Correct Answer (A,B,C,D)" multiline row={2} maxRows={2} required value={correctAnswer} onChange={(event) => { setCorrectAnswer(event.target.value) }} name = "correctAnswer"/>

                    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
                        <Button variant="outlined" type="submit" onClick={addQuestion}>Add Question</Button>
                        <Button variant="outlined" type="submit">Save Quiz</Button>
                    </Box>

                </FormControl>
            </Box>
        </form>
    )
}