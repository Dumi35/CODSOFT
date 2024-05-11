import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box, IconButton, InputAdornment, FormGroup, FormControlLabel,Checkbox } from "@mui/material";
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
                sessionStorage.setItem("user_email",res.data[0].email)
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
        <Box display={"flex"} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} minHeight={"99vh"}>
        <form style={{
        }} onSubmit={handleSubmit}>
            <FormControl sx={{
                boxSizing:"border-box",
                paddingBlock:
                    { xs: 3, md: 10 },
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", gap: "20px", flexDirection: "column", justifyContent: "space-between", borderRadius: 5, boxShadow: { xs: "none", md: "0px 0px 10px grey" }, width: "min(100vw,500px)", height: { xs: "80%", md: "100%" },
            }}>
                <Box sx={{display: "flex", gap: "20px", flexDirection: "column", justifyContent: { xs: "start", md: "center" },  width: "100%"
            }}>
                    <FormLabel>
                        <Typography variant="h3">Log in to your account</Typography>
                    </FormLabel>
                    <TextField label={"Email"} required type="email" name="email" onChange={(event) => { email.current = event.target.value }} error={showEmailError} helperText={showEmailError ? "Invalid email/password" : ""} variant="standard" />
                    <TextField label={"Password"} sx={{ zIndex: 2 }}
                        variant="standard"
                        required
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

                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>

                    <Typography>Don't have an account? <Link to={"/signup"}>Sign Up</Link></Typography>
                </Box>
                <Button variant="contained" type="submit" sx={{width:{xs:"100%", md:"150px"}, paddingBlock:{xs:"10px",md:"6px"}}}>Log In</Button>
            </FormControl>

        </form>
    </Box>

    )
}