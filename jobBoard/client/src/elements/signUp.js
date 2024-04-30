import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box, RadioGroup, FormControlLabel, Radio, IconButton, InputAdornment } from "@mui/material";
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

export default function SignUp() {
    const email = useRef("")
    const password = useRef("")
    const role = useRef("Job seeker")

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
                    role: role.current
                }).then(() => {
                    navigate("/login")
                }).catch((error) => {
                    console.error("error ", error)
                })
            }
        }).catch((e) => console.log(e))

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
                        <Typography variant="h3">Create an account</Typography>
                    </FormLabel>
                    <TextField sx={ {zIndex:2}} label={"Email"} required fullWidth type="email" name="email" onChange={(event) => { email.current = event.target.value }} error={showEmailError} helperText={showEmailError ? "Email already in use" : ""} />
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
                    <FormLabel id="demo-radio-buttons-group-label">
                        <Typography variant="h5">
                            What would you use jobify for?
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Job seeker"
                        name="radio-buttons-group"
                        row
                        onChange={(event) => { role.current = event.target.value }}
                    >
                        <FormControlLabel value="Job seeker" control={<Radio />} label="Job seeker" />
                        <FormControlLabel value="Job poster" control={<Radio />} label="Job poster" />
                    </RadioGroup>

                    <Typography>Already have an account? Log In</Typography>
                    <Button variant="contained" type="submit">Sign Up</Button>
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