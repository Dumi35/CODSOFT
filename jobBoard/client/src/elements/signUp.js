import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box, RadioGroup, FormControlLabel, Radio, IconButton, InputAdornment } from "@mui/material";
import wave1 from "../assets/images/sign_up_wave.svg"
import signup from "../assets/images/sign_up.png"
import { blue200 } from "../App";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom"

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";

import bcrypt from 'bcryptjs'

export default function SignUp() {
    const email = useRef("")
    const password = useRef("")

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = () => {
        const salt = bcrypt.genSaltSync(10)
    }

    return (
        <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} maxHeight={"100vh"} gap={4} sx={{ overflow: "hidden", position: "relative" }}  >
            <form style={{
                flexBasis: 500, flexGrow: 1,
            }}>
                <FormControl sx={{
                    paddingBlock:
                        { xs: 3, md: 0 },
                    paddingInline: {
                        xs: 3,
                        md: 10
                    }, display: "flex", gap: "20px", flexDirection: "column"
                }}>
                    <Link to="/home">
                        <img src={logo} width={"100px"} />
                    </Link>

                    <FormLabel>
                        <Typography variant="h3">Create an account</Typography>
                    </FormLabel>
                    <TextField label={"Email"} required fullWidth type="email" name="email" onChange={(event)=>{email.current=event.target.value}} />
                    <TextField label={"Password"}
                        required fullWidth
                        type={showPassword ? "text" : "password"}
                        onChange={(event)=>{password.current=event.target.value}}
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
                    >
                        <FormControlLabel value="Job seeker" control={<Radio />} label="Job seeker" />
                        <FormControlLabel value="Job poster" control={<Radio />} label="Job poster" />
                    </RadioGroup>

                    <Typography>Already have an account? Log In</Typography>
                    <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
                </FormControl>

            </form>
            <Box sx={{ flexBasis: 500, flexGrow: { md: 1 }, background: blue200, display: { xs: "none", lg: "block" } }}>
                <Box position={"absolute"} left={"29%"} zIndex={-1} sx={{ display: { xs: "none", lg: "block" } }}  >
                    <img src={wave1} />
                </Box>
                <img src={signup} width={"100%"} />
            </Box>
        </Box>

    )
}