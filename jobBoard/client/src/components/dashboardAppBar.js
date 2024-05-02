import React from "react";
import { Stack } from "@mui/material";
import logo from "../assets/images/logo.png"
import AccountMenu from "../components/accountMenu";

export default function DashboardAppBar() {
    return (
        <Stack direction={"row"} justifyContent={"space-between"} marginTop={4}>
            <img src={logo} width={"100px"} />
            <AccountMenu />
        </Stack>
    )
}