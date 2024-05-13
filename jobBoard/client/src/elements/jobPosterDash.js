import React from "react";
import { Box, FormControl, TextField, Button } from "@mui/material"
import DashboardAppBar from "../components/dashboardAppBar";
import axios from "axios";
import { SERVER_HOST } from "../App";

function PostJob(event){
    const job_poster = sessionStorage.getItem("user_name")
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())
    axios.post(`${SERVER_HOST}/postJobs`,{...formJson,job_poster: job_poster}).then((res)=>{
        console.log(res)
        window.location.reload()
    }).catch((e)=>{
        console.log(e)
    })
}

export default function JobPosterDash() {
    return (
        <Box>

            <Box sx={{
                paddingBottom:"20px",
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", gap: "20px", flexDirection: "column", position: "relative", overflow: "hidden"
            }}>
                <DashboardAppBar />
                <form onSubmit={PostJob}>

                    <FormControl sx={{display:"flex", gap:4}}>
                        <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                            <TextField
                                required
                                label="Job Title"
                                name="job_title"
                            />
                            <TextField
                                required
                                label="Company"
                                name="company"
                            />
                            <TextField
                                required
                                label="Job Type"
                                name="job_type"
                            />
                            <TextField
                                required
                                label="Location"
                                name = "location"
                            />
                        </Box>
                        <TextField
                            id="outlined-multiline-static"
                            label="About"
                            name="about"
                            multiline
                            required
                            rows={4}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Minimum Requirements"
                            multiline
                            required
                            rows={4}                            
                            name = "minimum_requirements"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Bonus if"
                            multiline
                            rows={4}  
                            name = "bonus_if"                          
                        />
                         <TextField
                            id="outlined-multiline-static"
                            label="Salary Range"
                            required   
                            name = "salary_range"                        
                        />
                        <Button type="submit" variant="contained">Post job</Button>
                    </FormControl>

                </form>
            </Box>
        </Box>
    )
}