import React from "react";
import { FormControl, TextField, Button, FormLabel, Typography, Box } from "@mui/material";


export default function SignUp() {
    return (
        <Box>
            <form style={{

            }}>
                <FormControl sx={{
                    paddingBlock:
                        { xs: 3, md: 0 },
                    paddingInline: {
                        xs: 3,
                        md: 10
                    }, display: "flex", gap: "60px", flexDirection: "column", position: "relative"
                }}>
                    <FormLabel>
                        <Typography variant="h3">Create an account</Typography>
                    </FormLabel>
                </FormControl>

            </form>
        </Box>

    )
}