import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import wave1 from "../assets/images/sign_up_wave.svg"
import signup from "../assets/images/sign_up.png"
import { blue200 } from "../App";
import logo from "../assets/images/logo.png"
import { Link, useNavigate } from "react-router-dom"

import axios from "axios";

import { SERVER_HOST } from "../App";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";

import bcrypt from 'bcryptjs'

export default function LogIn() {
    const email = useRef("")
    const password = useRef("")

    const [showPassword, setShowPassword] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.get(`${SERVER_HOST}/login`, {
            params: { email: email.current }
        }).then((res) => {
            const salt = res.data[0].salt
            const hashedPassword = bcrypt.hashSync(password.current, salt)
            if (hashedPassword === res.data[0].hashedPassword) {
                setShowEmailError(false)
                sessionStorage.setItem("user_name",res.data[0].name)
                sessionStorage.setItem("user_email",res.data[0].email)
                sessionStorage.setItem("company",res.data[0].company)
                sessionStorage.setItem("phone_number",res.data[0].phone_number)
                sessionStorage.setItem("role",res.data[0].role)
                navigate("/dashboard")

            } else {
                setShowEmailError(true)
            }
        }).catch((e) => {
            if (e.response && e.response.status === 400) {
                setShowEmailError(true)
            }
        })

    }

    return (
        <Box display={"flex"} flexWrap={"wrap"} maxHeight={"100vh"} gap={4} sx={{ overflow: "hidden", position: "relative", background: blue200, zIndex: 0 }}>
            <form style={{
                flexBasis: 450, flexGrow: 1, maxHeight: "100vh"
            }} onSubmit={handleSubmit}>
                <FormControl sx={{
                    paddingBlock:
                        { xs: 3, md: 0 },
                    paddingInline: {
                        xs: 3,
                        md: 10
                    }, display: "flex", gap: "20px", flexDirection: "column", justifyContent: "center", height: "100%", background: "white"
                }}>
                    <Link to="/home">
                        <img src={logo} width={"100px"} />
                    </Link>

                    <FormLabel>
                        <Typography variant="h3">Log in to your account</Typography>
                    </FormLabel>
                    <TextField sx={ {zIndex:2}} label={"Email"} required fullWidth type="email" name="email" onChange={(event) => { email.current = event.target.value }} error={showEmailError} helperText={showEmailError ? "Invalid email/password" : ""} />
                    <TextField label={"Password"} sx={ {zIndex:2}}
                        required fullWidth
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => { password.current = event.target.value }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography>Don't have an account? Sign up</Typography>
                    <Button variant="contained" type="submit">Log In</Button>
                </FormControl>

            </form>
            <Box sx={{ flexBasis: 500, flexGrow: { md: 1 }, display: { xs: "none", lg: "block" } }}>
                <Box position={"absolute"} left={{ lg: "24%", xl: "30%" }} zIndex={1} sx={{ display: { xs: "none", lg: "block" } }}  >
                    <img src={wave1} />
                </Box>
                <img src={signup} width={"100%"} zIndex={2} />
            </Box>
        </Box>

    )
}