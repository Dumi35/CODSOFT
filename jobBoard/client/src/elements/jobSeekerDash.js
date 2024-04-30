import React, { useEffect } from "react";
import { Box, Typography, TextField, Stack, Autocomplete, Popper, Page, List, ListItem, Paper, InputAdornment, Button } from "@mui/material";
import logo from "../assets/images/logo.png"
import { blue200 } from "../App";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountMenu from "../components/accountMenu";
import { LocationOn } from "@mui/icons-material";
import locationIcon from "../assets/icons/location_icon.svg"
import searchIcon from "../assets/icons/search_icon_grey.svg"
import categoryIcon from "../assets/icons/tabler_category_icon.svg"

import "../App.css"


export default function JobSeekerDash() {

    function clearTextField(event) {
        event.target.value = ""
    }

    //var userEmail = sessionStorage.getItem("user")
    var userEmail = "hi"

    return (

        <Box>

            <Box sx={{
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", gap: "20px", flexDirection: "column", position: "relative", overflow: "hidden"
            }}>
                <Stack direction={"row"} justifyContent={"space-between"} marginTop={4}>
                    <img src={logo} width={"100px"} />
                    <AccountMenu />
                </Stack>

                {/* search bar */}
                <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"space-between"} boxShadow={"0px 10px 2px #F5F5F5"} borderRadius={8} paddingInline={1.2} paddingBottom={1} gap={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px",flexGrow:1 }}>
                        <img src={searchIcon} width={"30px"} />
                        <TextField id="input-with-sx" label="Job title or keyword" variant="standard" InputProps={{
                            disableUnderline: true
                        }} sx={{ position: "relative", top: "-7px" }} fullWidth />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px", flexGrow:1  }}>
                        <img src={locationIcon} width={"30px"} />

                        <Autocomplete
                            id="combo-box-demo"
                            sx={{ width: "200px", flexGrow:1, position: "relative", top: "-10px" }}
                            options={["allDestinations"]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Location"
                                    variant="standard"
                                    InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                    }}
                                fullWidth/>
                            )}
                        />

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px", flexGrow:1  }}>
                        <img src={categoryIcon} width={"30px"} />

                        <Autocomplete
                            id="combo-box-demo"
                            sx={{ width: "200px", flexGrow:1, position: "relative", top: "-10px" }}
                            options={["allDestinations"]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    variant="standard"
                                    InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                    }}
                                    fullWidth
                                />
                            )}
                        />

                    </Box>

                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexGrow={1} gap={1} flexWrap={"wrap"}>
                        <Button>Clear</Button>
                        <Button variant="contained">Search</Button>
                    </Box>
                </Box>

                <Typography>hii</Typography>
            </Box>

        </Box>
    )
}