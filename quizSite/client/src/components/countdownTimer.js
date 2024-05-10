import React from "react"
import { Typography, Box, LinearProgress, CircularProgress } from "@mui/material"
import { findIndex, forEach } from "lodash";
import { useEffect, useState, useMemo } from "react";


export default function CountDownTimer(props) {
    const { duration, colors = [], colorValues = [], onComplete } = props;

    const [timeDuration, setTimeDuration] = useState(duration);
    const [countdownText, setCountdownText] = useState();
    const [countdownPercentage, setCountdownPercentage] = useState(100);
    const [countdownColor, setCountdownColor] = useState("#004082");

    useEffect(() => {
        let intervalId = setInterval(() => {
            setTimeDuration((prev) => {
                const newTimeDuration = prev - 1;
                console.log(newTimeDuration)
                const percentage = Math.ceil((newTimeDuration / timeDuration) * 100);
                setCountdownPercentage(percentage);
                console.log(percentage)
                if (newTimeDuration === 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    onComplete();
                }

                return newTimeDuration;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
            intervalId = null;
        };
    }, []);

    useEffect(() => {
        const minutes = Math.floor(timeDuration / 60);
        const seconds = timeDuration % 60;
        setCountdownText(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    }, [timeDuration]);

    useEffect(() => {
        for (let i = 0; i < colorValues.length; i++) {
            const item = colorValues[i];
            if (timeDuration === item) {
                setCountdownColor(colors[i]);
                break;
            }
        }
    }, [timeDuration]);

    return (
        <>
            <Box sx={{ width: '500px' }}>
                <LinearProgress variant="determinate" value={countdownPercentage} />
                <Typography>{countdownText} hm</Typography>
            </Box>

        </>
    );
};
