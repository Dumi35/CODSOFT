import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Stack, Autocomplete, Button, Checkbox, FormGroup, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Avatar, Pagination, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { blue200, grey200 } from "../App";
import locationIcon from "../assets/icons/location_icon.svg"
import searchIcon from "../assets/icons/search_icon_grey.svg"
import categoryIcon from "../assets/icons/tabler_category_icon.svg"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../App.css"
import axios from "axios";
import { SERVER_HOST, lightGreen, darkGreen } from "../App";
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noResult from "../assets/images/no_results.png"
import DashboardAppBar from "../components/dashboardAppBar";

export default function JobSeekerDash() {
    const userName = sessionStorage.getItem("user_name")
    const userEmail = sessionStorage.getItem("user_email")

    const [height, setHeight] = useState(0);
    const [allJobs, setAllJobs] = useState([])

    const [jobDetails, setJobDetails] = useState({})
    const [openApplicationForm, setOpenApplicationForm] = useState(false);
    const [chosenFile, setChosenFile] = useState({});
    const [chosenFileName, setChosenFileName] = useState("");

    const [showApplicationAlert, setShowApplicationAlert] = useState(false)
    const [applicationAlertDetails, setApplicationAlertDetails] = useState({})

    const handleClickOpenApplicationForm = (item) => (event) => {
        setJobDetails({ job_poster: item.job_poster, job_title: item.job_title, company: item.company })
        setOpenApplicationForm(true);
    };

    const handleCloseApplicationForm = () => {
        setOpenApplicationForm(false);
    };

    //function to assign filter div height
    var header;
    useEffect(() => {
        header = document.getElementById("header")
        setHeight(header.offsetHeight + 60)
    }, [header, showApplicationAlert])

    function searchJobCriteria(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries())

        Object.keys(formJson).forEach(key => {
            // Update the value of each key with the new value
            formJson[key] = formJson[key] == ""? " ":formJson[key]
        });
        const job_title = formJson.job_title
        const location = formJson.location

        if (job_title === " " && location===" "){
            axios.get(`${SERVER_HOST}/searchAllJobs`).then((res) => {
                setAllJobs(res.data)
            }).catch((e) => { console.log(e) })
        }else{
            console.log(formJson)
            console.log(`my${location}is a place`)
            axios.get(`${SERVER_HOST}/searchJobCriteria?job_title=${job_title}&location=${location}`, { ...formJson }).then((res) => {
                setAllJobs(res.data)
            }).catch((e) => { console.log(e) })
        }

    }

    //pagination function
    // State to store the current page
    const [page, setPage] = useState(1);

    // Number of items per page
    const itemsPerPage = 10;

    // Sample data array (you can replace this with your own data)
    const data = allJobs

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Event handler for page changes
    const handlePageChange = (event, value) => {
        // Update the current page state
        setPage(value);
    };

    // Calculate start and end index for current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the data for the current page
    const currentPageData = data.slice(startIndex, endIndex);

    //only one accordion open at a time
    const [expanded, setExpanded] = React.useState('panel0');

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    function uploadResume(event) {
        console.log(event.target.files[0].size)//file size in bytes
        setChosenFile(event.target.files[0])
        setChosenFileName(event.target.files[0].name)
    }

    function submitApplicationForm(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.resume = chosenFile

        axios.post(`${SERVER_HOST}/apply`, { ...formJson, ...jobDetails }, {
            headers: { "Content-Type": " multipart/form-data" }
        }).then((res) => {
            console.log(res)
            setShowApplicationAlert(true)
            setApplicationAlertDetails({ title: "Application Successful", message: "Your application has been sent to the hiring team. Goodluck on your application" })
        }).catch((e) => {
            console.log(e)
            setShowApplicationAlert(true)
            setApplicationAlertDetails({ title: "Application Failed to Send", message: "We ran into an issue. Please try again later" })
        })
        handleCloseApplicationForm();
    }

    function DisplayApplicationAlert() {
        return (
            <Dialog open={showApplicationAlert}>
                <DialogTitle>
                    <Typography>{applicationAlertDetails.title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>{applicationAlertDetails.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowApplicationAlert(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (

        <Box>

            <Box sx={{
                paddingInline: {
                    xs: 3,
                    md: 10
                }, display: "flex", gap: "20px", flexDirection: "column", position: "relative", overflow: "hidden"
            }}>
                <div id="header">
                    <DashboardAppBar />

                    {/* search bar */}
                    <form onSubmit={searchJobCriteria}>
                        <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"space-between"} boxShadow={"0px 10px 2px #F5F5F5"} borderRadius={8} paddingInline={1.2} paddingBottom={1} gap={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px", flexGrow: 1 }}>
                                <img src={searchIcon} width={"30px"} alt="search icon" />
                                <TextField id="input-with-sx" label="Job title or keyword" variant="standard" InputProps={{
                                    disableUnderline: true
                                }} sx={{ position: "relative", top: "-7px" }} fullWidth name="job_title" />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px", flexGrow: 1 }}>
                                <img src={locationIcon} width={"30px"} alt="location icon" />

                                <Autocomplete
                                    id="combo-box-demo"
                                    sx={{ width: "200px", flexGrow: 1, position: "relative", top: "-10px" }}
                                    options={["Remote"]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Location"
                                            variant="standard"
                                            name="location"
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                            }}
                                            fullWidth />
                                    )}
                                />

                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: "3px", flexGrow: 1 }}>
                                <img src={categoryIcon} width={"30px"} alt="category icon"/>

                                <Autocomplete
                                    id="combo-box-demo"
                                    sx={{ width: "200px", flexGrow: 1, position: "relative", top: "-10px" }}
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

                            <Box display={"flex"} justifyContent={{ xs: "center", lg: "space-between" }} alignItems={"center"} flexGrow={1} gap={1} flexWrap={"wrap"}>
                                <Button>Clear</Button>
                                <Button variant="contained" type="submit">Search</Button>
                            </Box>
                        </Box>
                    </form>

                </div>
                <Box display={"flex"} gap={2} paddingBottom={"30px"}>
                    <Stack flexBasis={200} flexGrow={1} display={{ xs: "none", lg: "block" }} position={"sticky"} spacing={1} height={`calc(100vh - ${height}px)`} sx={{ overflowY: "scroll", scrollbarWidth: "thin" }} id="filters">
                        <Typography color={"primary"} variant="h6">Filter</Typography>
                        <Stack>
                            <Typography variant="subtitle1" textTransform={"uppercase"} color={grey200}>Job Type</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Full Time" />
                                <FormControlLabel control={<Checkbox />} label="Part Time" />
                                <FormControlLabel control={<Checkbox />} label="Intern" />
                                <FormControlLabel control={<Checkbox />} label="Contract" />
                            </FormGroup>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle1" textTransform={"uppercase"} color={grey200}>Career Level</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Manager" />
                                <FormControlLabel control={<Checkbox />} label="Senior" />
                                <FormControlLabel control={<Checkbox />} label="Student" />
                                <FormControlLabel control={<Checkbox />} label="Executive" />
                                <FormControlLabel control={<Checkbox />} label="Director" />
                            </FormGroup>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle1" textTransform={"uppercase"} color={grey200}>Experience Level</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Fresh" />
                                <FormControlLabel control={<Checkbox />} label="1 - 2 Years" />
                                <FormControlLabel control={<Checkbox />} label="3 - 5 Years" />
                                <FormControlLabel control={<Checkbox />} label="5+ Years" />

                            </FormGroup>
                        </Stack>
                    </Stack>
                    <Stack flexGrow={9} flexBasis={700} spacing={1}>
                        <Typography color={"primary"} variant="h6">{allJobs.length} jobs</Typography>

                        <Stack spacing={3}>
                            {
                                allJobs.length > 0 ?
                                    currentPageData.map((item, index) => {
                                        return (
                                            <div key={index} style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)", borderRadius: "4px" }}>

                                                <Accordion sx={{ boxShadow: "none", borderRadius: "0px" }} expanded={expanded === `panel${index}`} onChange={handleAccordionChange(`panel${index}`)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        <Stack alignItems={"center"} justifyContent={"center"} spacing={1} direction={"row"}>
                                                            <Avatar>{item.job_poster.slice(0, 1)}</Avatar>
                                                            <Stack>
                                                                <Typography>
                                                                    {item.job_title}
                                                                </Typography>
                                                                <Typography>
                                                                    by {item.job_poster} in <span style={{ color: blue200 }}>{item.company} </span>
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Stack spacing={2}>
                                                            <Box>
                                                                <Typography color={grey200}>About</Typography>
                                                                <Typography sx={{ whiteSpace: "pre-line" }}>{item.about}</Typography>

                                                            </Box>
                                                            <Box>
                                                                <Typography color={grey200}>Minimum Requirements</Typography>
                                                                <Typography sx={{ whiteSpace: "pre-line" }}>{item.minimum_requirements}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Stack direction={"row"} justifyContent={"space-between"} paddingBottom={"10px"} paddingInline={"16px"} alignItems={"center"} >
                                                    <Stack direction={"row"} flexWrap={"wrap"} flexBasis={"500px"} gap={1}>
                                                        <Stack direction={"row"} spacing={1} bgcolor={"lightblue"} justifyContent={"center"} alignItems={"center"} paddingInline={"5px"} height={"25px"} borderRadius={"5px"}>
                                                            <Typography variant="caption" sx={{ color: blue200, overflow: "hidden", textOverflow: "ellipsis", textAlign: "left", textWrap: "nowrap" }} >
                                                                {item.job_type}
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction={"row"} spacing={1} bgcolor={"#B7A2F1"} justifyContent={"center"} alignItems={"center"} paddingInline={"5px"} height={"25px"} borderRadius={"5px"}>
                                                            <Typography variant="caption" sx={{ color: "#342856", overflow: "hidden", textOverflow: "ellipsis", textAlign: "left", textWrap: "nowrap" }} >
                                                                {item.location}
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction={"row"} spacing={1} bgcolor={lightGreen} justifyContent={"center"} alignItems={"center"} paddingInline={"5px"} height={"25px"} borderRadius={"5px"}>
                                                            <Typography variant="caption" sx={{ color: darkGreen, overflow: "hidden", textOverflow: "ellipsis", textAlign: "left", textWrap: "nowrap" }} >
                                                                {item.salary_range}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Button onClick={handleClickOpenApplicationForm(item)}>Apply</Button>
                                                </Stack>
                                                <React.Fragment>
                                                    <Dialog
                                                        open={openApplicationForm}
                                                        onClose={handleCloseApplicationForm}
                                                        PaperProps={{
                                                            component: 'form',
                                                            onSubmit: submitApplicationForm,
                                                            encType: "multipart/form-data",
                                                        }}
                                                    >
                                                        <DialogTitle variant="subtitle1" color={"primary"} textTransform={"capitalise"} >Application Form</DialogTitle>
                                                        <IconButton
                                                            aria-label="close"
                                                            onClick={handleCloseApplicationForm}
                                                            sx={{
                                                                position: 'absolute',
                                                                right: 8,
                                                                top: 8,
                                                                color: (theme) => theme.palette.grey[500],
                                                            }}
                                                        >
                                                            <Close />
                                                        </IconButton>

                                                        <DialogContent>
                                                            <Box display={"flex"} flexDirection={"column"} gap={2} >
                                                                <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                                                                    <TextField
                                                                        autoFocus
                                                                        required
                                                                        margin="dense"
                                                                        id="name"
                                                                        name="full_name"
                                                                        label="Full Name"
                                                                        type="text"
                                                                        fullWidth
                                                                        defaultValue={`${userName}`}
                                                                        sx={{ flexGrow: 1 }}
                                                                        variant="outlined"
                                                                    />

                                                                    <TextField
                                                                        autoFocus
                                                                        required
                                                                        margin="dense"
                                                                        id="email"
                                                                        name="email"
                                                                        label="Email Address"
                                                                        type="email"
                                                                        defaultValue={`${userEmail}`}
                                                                        fullWidth
                                                                        sx={{ flexGrow: 1 }}
                                                                        variant="outlined"
                                                                    />

                                                                </Box>
                                                                <Typography>Resume</Typography>
                                                                <Button
                                                                    component="label"
                                                                    role={undefined}
                                                                    variant="outlined"
                                                                    tabIndex={-1}
                                                                    size="large"
                                                                    //startIcon={<CloudUploadIcon />}
                                                                    sx={{ width: "100%", minHeight: "100px", fontSize: "1.2rem", border: "1px solid rgba(0, 0, 0, 0.87)", borderRadius: "4px", display: "flex", flexDirection: "column", textAlign: "center", textTransform: "none" }}
                                                                >
                                                                    <CloudUploadIcon />
                                                                    {chosenFileName == "" ? "Upload File" : chosenFileName}

                                                                    <VisuallyHiddenInput type="file" accept=".pdf,.doc,.docx" onChange={uploadResume} name="resume" />
                                                                </Button>
                                                                <TextField
                                                                    autoFocus
                                                                    required
                                                                    margin="dense"
                                                                    id="linkedIn_profile"
                                                                    name="linkedIn_profile"
                                                                    label="LinkedIn Profile Link"
                                                                    defaultValue="https://www.freecodecamp.org/news/upload-files-with-javascript/"
                                                                    type="url"
                                                                    fullWidth
                                                                    sx={{ flexGrow: 1 }}
                                                                    variant="outlined"
                                                                />
                                                            </Box>

                                                        </DialogContent>
                                                        <DialogActions sx={{ justifyContent: "center" }}>
                                                            <Button onClick={handleCloseApplicationForm}>Cancel</Button>
                                                            <Button type="submit" formEncType="multipart/form-data">Apply</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </React.Fragment>

                                                {showApplicationAlert && <DisplayApplicationAlert />}
                                            </div>
                                        )
                                    }) :
                                    <Stack alignItems={"center"}>
                                        <img src={noResult} style={{ width: "min(90%,500px)" }} />
                                    </Stack>


                            }


                        </Stack>

                        <Stack alignItems={"center"} direction={"row"} spacing={2} sx={{ paddingTop: "40px" }}>
                            <Pagination
                                count={totalPages} // Total number of pages
                                page={page} // Current page
                                onChange={handlePageChange} // Event handler for page changes
                                //variant="outlined"
                                color="primary"
                            />
                        </Stack>
                    </Stack>

                </Box>
            </Box>

        </Box >
    )
}