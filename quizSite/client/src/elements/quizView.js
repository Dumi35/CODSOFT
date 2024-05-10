import React from "react"
import { Typography, Box } from "@mui/material"
import { useLocation } from 'react-router-dom';
import CountDownTimer from "../components/countdownTimer";

export default function QuizView(props) {
    const location = useLocation()
    const handleOnComplete = () => {
        console.log("Completed");
    };
    return (
        // <Typography>{props.quizName}</Typography>
        <Box>
            <Typography>i am quiz vuew {location.state.name}</Typography>
            <CountDownTimer duration={90} colors={["#ff9248", "#a20000"]}
                colorValues={[20, 10]}
                onComplete={handleOnComplete} />
        </Box>
    )
}