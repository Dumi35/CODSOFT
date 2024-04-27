import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import wave1 from "../assets/images/home_wave.svg"
import {blue200} from "../App"
import "../App.css"

export default function Footer() {
    return (
        <footer style={{background:"transparent",overflow:"hidden"}}>
            <img src={wave1} width={"100%"} />
            <Box sx={{
                display: "flex",
                gap: "4rem",//clamp
                flexWrap: "wrap",
                // marginBlock: "max(4.8vh,5rem)",
                marginTop: "-10px",
                paddingInline: {
                    xs: 3,
                    md: 15
                }, backgroundColor: blue200, paddingBlock: "10px 50px"
            }}>
                <Stack direction="column" width={300} spacing={1}>
                    <img src={require("../assets/images/logo.png")} alt="Logo" width={75} fit="contain" />
                    <Typography color={"#98979C"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </Typography>
                </Stack>

                <Box sx={{
                    display: "flex",
                    gap: "4rem",//clamp
                    flexWrap: "wrap",
                }}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h6" color="white">
                            Company
                        </Typography>
                        <Stack direction="column" spacing={0.5} color={"#98979C"}>
                            <Typography>
                                About
                            </Typography>
                            <Typography>
                                Careers
                            </Typography>
                            <Typography>
                                Mobile
                            </Typography>
                        </Stack>

                    </Stack>


                    <Stack direction="column" spacing={1}>
                        <Typography variant="h6" color="white">
                            Contact
                        </Typography>
                        <Stack direction="column" spacing={0.5} color={"#98979C"}>
                            <Typography>
                                Help/FAQ
                            </Typography>
                            <Typography>
                                Press
                            </Typography>
                            <Typography>
                                Affiliates
                            </Typography>
                        </Stack>

                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h6" color="white">
                            More
                        </Typography>
                        <Stack direction="column" spacing={0.5} color={"#98979C"}>
                            <Typography>
                                Lorem
                            </Typography>
                            <Typography>
                                Lorem
                            </Typography>
                            <Typography>
                                Lorem
                            </Typography>
                        </Stack>

                    </Stack>
                    {/* <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={1}>
                            <Avatar alt="Facebook" src={facebookLogo} sx={{ width: 45, height: 45, boxShadow: "0px 8px 2px 2px #F8F8F8", padding: "10px" }} variant="circular" />

                            <Avatar alt="Facebook" src={instagramLogo} sx={{ width: 45, height: 45, boxShadow: "0px 10px 2px #F5F5F5", }} variant="circular" />

                            <Avatar alt="Facebook" src={twitterLogo} sx={{ width: 45, height: 45, boxShadow: "0px 10px 2px #F5F5F5", padding: "10px" }} variant="circular" />

                        </Stack>
                        <Typography color={"#98979C"}>
                            Discover our app
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Button sx={{ background: "black", color: "white", width: "120px", borderRadius: "30px", display: "flex", gap: "7px" }}>
                                <img src={googlePlayLogo} width={20} alt="Google Play Logo" />
                                <Stack direction={"column"} spacing={-0.5} alignItems={"flex-start"}>
                                    <Typography sx={{ fontSize: "0.6rem" }}>GET IT ON</Typography>
                                    <Typography sx={{ fontSize: "0.6rem" }}>Google Play</Typography>
                                </Stack>
                            </Button>
                            <Button sx={{ background: "black", color: "white", width: "120px", borderRadius: "30px", display: "flex", gap: "7px" }}>
                                <img src={googlePlayLogo} width={20} alt="Google Play Logo" />
                                <Stack direction={"column"} spacing={-0.5} alignItems={"flex-start"}>
                                    <Typography sx={{ fontSize: "0.6rem" }}>GET IT ON</Typography>
                                    <Typography sx={{ fontSize: "0.6rem" }}>Google Play</Typography>
                                </Stack>
                            </Button>

                        </Stack>

                    </Stack> */}
                </Box>

            </Box>
        </footer>
    )
}