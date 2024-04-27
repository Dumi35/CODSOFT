import React from "react";
import { Box, Typography, Stack, Grid, Card, CardContent } from "@mui/material";
import heroBg from "../assets/images/hero_img_bg.svg"
import heroImg from "../assets/images/hero_img.png"
import googleLogo from "../assets/images/google_logo_grey.png"
import searchIcon from "../assets/icons/search.svg"
import chat from "../assets/icons/fluent_chat-12-filled.svg"
import employee from "../assets/images/Employee of the month-pana.png"

import DrawerAppBar from "../components/AppBar";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import SignUp from "./signUp";

import { grey100 } from "../App";
import { grey200 } from "../App";
import "../App.css"
import Footer from "../components/Footer";

export default function Home() {
    return (
        <Box>
            <DrawerAppBar />

            <Box sx={{
                paddingBlock:
                    { xs: 3, md: 0 },
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", gap: "60px", flexDirection: "column", position: "relative", overflow: "hidden"
            }}>
                <Box id="hero-section" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "clamp(5px,5vh + 0.5rem,20px)", justifyContent: "center" }}>
                    <Box id="hero-content" sx={{ flexBasis: 450, flexGrow: 1 }}>
                        <Stack spacing={2}>
                            <Typography variant="h2" color={"primary"} sx={{fontSize:{xl:"70px"}}}>Find the perfect job for you</Typography>
                            <Typography variant="h6">Search your career opportunity </Typography>
                            <div className="searchBar">
                                <input placeholder="Add title or keyword "></input>
                                <button><img src={searchIcon} alt="search icon" /></button>
                            </div>
                        </Stack>
                        <Box sx={{ display: "flex", marginTop: "20px", flexWrap: "wrap", alignItems: "center" }}>
                            <Stack alignItems={"center"} justifyContent={"center"} direction={"row"}>
                                <img src={googleLogo} alt="Google Logo" />
                                <Typography>Google</Typography>
                            </Stack>
                            <Stack alignItems={"center"} justifyContent={"center"} direction={"row"}>
                                <img src={googleLogo} alt="Google Logo" />
                                <Typography>Google</Typography>
                            </Stack>
                            <Stack alignItems={"center"} justifyContent={"center"} direction={"row"}>
                                <img src={googleLogo} alt="Google Logo" />
                                <Typography>Google</Typography>
                            </Stack>
                            <Stack alignItems={"center"} justifyContent={"center"} direction={"row"}>
                                <img src={googleLogo} alt="Google Logo" />
                                <Typography>Google</Typography>
                            </Stack>

                        </Box>
                    </Box>
                    <Box id="hero-image" sx={{ flexBasis: 550, overflow: "hidden" }}>
                        <Box sx={{
                            position: "absolute", top: -400, right: -250, zIndex: -1, display: {
                                xs: "none", lg: "block"
                            }
                        }}>
                            <img src={heroBg} />
                        </Box>
                        <img src={heroImg} width={"100%"} />
                    </Box>
                </Box>

                <Box component={"section"}>
                    <Typography variant="h4">Explore Various Categories</Typography>
                    <Typography variant="h6">Lorem ipsum is a boy that ate</Typography>
                    <Grid container sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px,100%), 1fr))", gap: "clamp(10px, calc(10% + 0.5rem), 30px)", placeItems: "center" }} marginTop={"20px"}>
                        <Grid>
                            <Card sx={{ width: 200, alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "none", background: grey100, borderRadius: "30px", paddingTop: 3 }} >
                                <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={chat} alt="chat icon" />
                                </Stack>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                        Customer Service
                                    </Typography>
                                    <Typography variant="body2" color={grey200} textAlign={"center"}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid>
                            <Card sx={{ width: 200, alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "none", background: grey100, borderRadius: "30px", paddingTop: 3 }} >
                                <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={chat} alt="chat icon" />
                                </Stack>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                        Customer Service
                                    </Typography>
                                    <Typography variant="body2" color={grey200} textAlign={"center"}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid>
                            <Card sx={{ width: 200, alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "none", background: grey100, borderRadius: "30px", paddingTop: 3 }} >
                                <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={chat} alt="chat icon" />
                                </Stack>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                        Customer Service
                                    </Typography>
                                    <Typography variant="body2" color={grey200} textAlign={"center"}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid>
                            <Card sx={{ width: 200, alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "none", background: grey100, borderRadius: "30px", paddingTop: 3 }} >
                                <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={chat} alt="chat icon" />
                                </Stack>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                        Customer Service
                                    </Typography>
                                    <Typography variant="body2" color={grey200} textAlign={"center"}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid>
                            <Card sx={{ width: 200, alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "none", background: grey100, borderRadius: "30px", paddingTop: 3 }} >
                                <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={chat} alt="chat icon" />
                                </Stack>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                        Customer Service
                                    </Typography>
                                    <Typography variant="body2" color={grey200} textAlign={"center"}>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>

                <Box component={"section"} marginBlock={"70px 10px"}>
                    <Typography>WHY CHOOSE US</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "clamp(5px,5vh + 0.5rem,20px)" }}>
                        <Box id="content" sx={{ flexBasis: 400, flexGrow: 1 }}>
                            <Box alignItems={{ xs: "center", lg: "flex-start" }} justifyContent={{ xs: "center", lg: "flex-start" }} display={"flex"} flexWrap={"wrap"} gap={2}>
                                <Typography variant="h4" textTransform={"capitalize"}>We know just what you want and we can give it to you</Typography>
                                <Card sx={{ width: "min(100%,350px)", alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "0px 10px 2px #F5F5F5", borderRadius: "30px", paddingTop: 3 }} >
                                    <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                        <img src={chat} alt="chat icon" />
                                    </Stack>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                            Personalised Recommendations
                                        </Typography>
                                        <Typography variant="body2" color={grey200} textAlign={"center"}>
                                            Get matched with your dream job. Personalized recommendations based on your skills and interests.
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ width: "min(100%,350px)", alignItems: "center", display: "flex", flexDirection: "column", boxShadow: "0px 10px 2px #F5F5F5", borderRadius: "30px", paddingTop: 3 }} >
                                    <Stack sx={{ background: "#fff", borderRadius: "10px", padding: "5px 10px", alignItems: "center", justifyContent: "center" }}>
                                        <img src={chat} alt="chat icon" />
                                    </Stack>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textAlign={"center"} textTransform={"capitalize"}>
                                            Personalised Recommendations
                                        </Typography>
                                        <Typography variant="body2" color={grey200} textAlign={"center"}>
                                            Get matched with your dream job. Personalized recommendations based on your skills and interests.
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Box>

                        </Box>

                        <Box sx={{ flexBasis: 600, alignSelf: "center" }}>
                            <img src={employee} width={"100%"} />
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}