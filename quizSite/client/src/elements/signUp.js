import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box, IconButton, InputAdornment, FormControlLabel, FormGroup, Checkbox } from "@mui/material";

import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

import hello from "../assets/images/hello.gif"

import { SERVER_HOST } from "../App";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";

import bcrypt from 'bcryptjs'

export default function SignUp() {
    const email = useRef("")
    const password = useRef("")

    const [showPassword, setShowPassword] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password.current, salt)

        axios.get(`${SERVER_HOST}/signup`, {
            params: { email: email.current }
        }).then((res) => {
            console.log(res.data)
            if (res.data.length > 0) {
                setShowEmailError(true)
            } else {
                setShowEmailError(false)
                axios.post(`${SERVER_HOST}/signup`, {
                    email: email.current,
                    hashedPassword: hashedPassword,
                    salt: salt,
                }).then(() => {
                    navigate("/login")
                }).catch((error) => {
                    console.error("error ", error)
                })
            }
        }).catch((e) => console.log(e))

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
                            <Typography variant="h3">Hello there <img src={hello} width={"70px"}/></Typography>
                            
                        </FormLabel>
                        <TextField label={"Email"} required type="email" name="email" onChange={(event) => { email.current = event.target.value }} error={showEmailError} helperText={showEmailError ? "Email already in use" : ""} variant="standard" />
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

                        <Typography>Already have an account? <Link to={"/login"}>Log In</Link></Typography>
                    </Box>
                    <Button variant="contained" type="submit" sx={{width:{xs:"100%", md:"150px"}, paddingBlock:{xs:"10px",md:"6px"}}}>Sign Up</Button>
                </FormControl>

            </form>
        </Box>

    )
}