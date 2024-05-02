import React from "react"
import { Box, FormControl, TextField, Typography, Button, Avatar, Stack, FormGroup, Badge } from "@mui/material"
import DashboardAppBar from "../components/dashboardAppBar"
import starfire from "../assets/images/starfire.jpg"
import camera from "../assets/icons/camera.svg"
import { styled } from '@mui/material/styles';
import axios from "axios"
import { SERVER_HOST } from "../App"

import { blue200 } from "../App";
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 45,
    height: 45,
    border: `2px solid ${blue200}`,
    position:"absolute",
    right:"40px"
}));

const user_email = sessionStorage.getItem("user_email")

function editProfile(event){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())
    axios.post(`${SERVER_HOST}/edit-profile`,{...formJson,user_email:user_email}).then((res)=>{
        console.log(res)
    }).catch((e)=>{
        console.log(e)
    })
}

export default function UserProfile() {
    return (
        <Box sx={{
            paddingInline: {
                xs: 3,
                md: 10
            }, display: "flex", gap: "20px", flexDirection: "column", position: "relative", overflow: "hidden"
        }}>
            <DashboardAppBar />
            <form style={{ display: "flex", gap: 20, flexWrap: "wrap-reverse" }} onSubmit={editProfile}>
                <Stack sx={{
                    paddingBlock:
                        { xs: 3, md: "0px 30px" },
                    display: "flex", gap: "20px", justifyContent: "center", alignItems: "start", flexBasis: "500px",
                    flexGrow: 1
                }}>
                    <Typography variant="h3">Edit profile</Typography>
                    <FormGroup sx={{ width: "100%", gap: 2 }} >
                        <TextField
                            label="Full Name"
                            name = "name"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            name = "email"
                        />
                        <TextField
                            label="Company"
                            fullWidth
                            name = "company"
                        />
                        <TextField
                            label="Phone Number"
                            type="tel"
                            name = "phone_number"
                            fullWidth
                        />

                        <Button variant="contained" type="submit">Save changes</Button>
                    </FormGroup>
                </Stack>
                <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"} flexBasis={"300px"}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={
                            <SmallAvatar alt="Change profile pic" src={camera} sx={{bgcolor: blue200, cursor:"pointer"}} />
                        }
                    >
                        <Avatar sx={{ width: "80%", aspectRatio: 1, height: "auto", maxWidth: "400px", objectFit: "cover" }} alt="Profile picture" src={starfire}>H</Avatar>
                    </Badge>
                </Stack>
            </form>
        </Box>
    )
}