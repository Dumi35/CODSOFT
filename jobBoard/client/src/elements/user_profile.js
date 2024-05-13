import React, { useEffect, useState } from "react"
import { Box, TextField, Typography, Button, Avatar, Stack, FormGroup, Badge } from "@mui/material"
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
    position: "absolute",
    right: "40px"
}));


export default function UserProfile() {

    const userEmail = sessionStorage.getItem("user_email")
    const userName = sessionStorage.getItem("user_name")
    const phoneNumber = sessionStorage.getItem("phone_number")
    const company = sessionStorage.getItem("company")
    //const [formJson,setFormJson] = useState({})
    var formData

    const [disableEditBtn, setDisableEditBtn] = useState(true)

    function enableEditBtn() {
        setDisableEditBtn(false)
    }

    //edit and reset user details
    function editProfile(event) {
        event.preventDefault()
        formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries())
        axios.post(`${SERVER_HOST}/edit-profile`, { ...formJson, user_email: userEmail }).then((res) => {
            sessionStorage.setItem("user_name", formJson.name)
            sessionStorage.setItem("user_email", formJson.email)
            sessionStorage.setItem("phone_number", formJson.phone_number)
            sessionStorage.setItem("company", formJson.company)
            window.location.reload()
        }).catch((e) => {
            console.log(e)
        })
    }


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
                            name="name"
                            fullWidth
                            defaultValue={`${userName}`}
                            onChange={enableEditBtn}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            name="email"
                            defaultValue={`${userEmail}`}
                            onChange={enableEditBtn}
                        />
                        <TextField
                            label="Company"
                            fullWidth
                            name="company"
                            defaultValue={`${company}`}
                            onChange={enableEditBtn}
                        />
                        <TextField
                            label="Phone Number"
                            type="tel"
                            name="phone_number"
                            fullWidth
                            defaultValue={`${phoneNumber}`}
                            onChange={enableEditBtn}
                        />

                        <Button variant="contained" type="submit" disabled={disableEditBtn}>Save changes</Button>
                    </FormGroup>
                </Stack>
                <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"} flexBasis={"300px"}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallAvatar alt="Change profile pic" src={camera} sx={{ bgcolor: blue200, cursor: "pointer" }} />
                        }
                    >
                        <Avatar sx={{ width: "80%", aspectRatio: 1, height: "auto", maxWidth: "400px", objectFit: "cover" }} alt="Profile picture" src={starfire}>H</Avatar>
                    </Badge>
                </Stack>
            </form>
        </Box>
    )
}