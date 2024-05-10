import React, { useState } from "react"
import { Box, Card, CardContent, CardMedia, Typography, Pagination, Dialog, DialogContent, DialogActions, Button, Stack, DialogTitle, Avatar } from "@mui/material"
import mountain from "../assets/images/m3.jpg"
import TimerIcon from '@mui/icons-material/Timer';
import ListIcon from '@mui/icons-material/List';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import QuizView from "../elements/quizView";
import { useNavigate } from "react-router-dom"

export default function QuizDisplay(props) {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [openQuizDetailsIndex, setOpenQuizDetailsIndex] = useState(null);

    let quizzes = props.quizzes
    let itemsPerPage = 5

    const totalPages = Math.ceil(quizzes.length / itemsPerPage)

    // Calculate start and end index for current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let currentPageData = quizzes.slice(startIndex, endIndex)
    // Event handler for page changes
    const handlePageChange = (event, value) => {
        // Update the current page state
        setPage(value);
    };

    // Function to handle opening dialog for a specific item
    const handleOpenQuizDetails = (index) => {
        setOpenQuizDetailsIndex(index);
    };

    // Function to handle closing dialog
    const handleCloseQuizDetails = () => {
        setOpenQuizDetailsIndex(null);
    };

    const startQuiz = () => {
        navigate(
             '/dashboard/quiz',
              {state: {name:"wow"}} // your data array of objects
        )
    }

    return (
        <Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 2 }}>
                {
                    currentPageData.map((item, index) => {
                        return (
                            <div key={index}>
                                <Card sx={{ display: 'flex', alignItems: "center", justifyContent: "center", background: "none", cursor: "pointer", borderRadius: "10px" }} onClick={() => handleOpenQuizDetails(index)}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100, aspectRatio: 1, borderRadius: "10px 0px 0px 10px" }}
                                        image={mountain}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h6">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {item.by}
                                            </Typography>
                                        </CardContent>
                                    </Box>

                                </Card>

                                <Dialog open={openQuizDetailsIndex === index}>
                                    <DialogTitle variant="h6" color={"primary"} textTransform={"capitalise"}>
                                        {item.name}
                                    </DialogTitle>
                                    <DialogContent>
                                        <Stack gap={1}>
                                            <Stack direction="row" alignItems={"center"} gap={1}>
                                                <Avatar>
                                                    <TimerIcon />
                                                </Avatar>
                                                <Typography>{item.name}</Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems={"center"} gap={1}>
                                                <Avatar>
                                                    <ListIcon />
                                                </Avatar>
                                                <Typography>{item.name}</Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems={"center"} gap={1}>
                                                <Avatar>
                                                    <MilitaryTechIcon />
                                                </Avatar>
                                                <Typography>{item.name}</Typography>
                                            </Stack>
                                        </Stack>
                                        {/* <Stack>
                                            <Typography>Before you start</Typography>
                                        </Stack> */}
                                    </DialogContent>
                                    <DialogActions sx={{ justifyContent: "center" }}>
                                        <Button onClick={handleCloseQuizDetails}>Cancel</Button>
                                        <Button onClick={startQuiz}>Start Quiz</Button>
                                    </DialogActions>
                                </Dialog>

                            </div>

                        )
                    })
                }
            </Box>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} sx={{ marginTop: "20px" }} />
        </Box>
    )
}