import React, {useState, useEffect} from "react"
import { Box, Button, Typography, Stack, Avatar, Tabs, Tab } from "@mui/material"
import QuizDisplay from "../components/quizDisplay"
import { purple200 } from "../App"
import starfire from "../assets/images/starfire.jpg"
import axios from "axios"
import { SERVER_HOST } from "../App"
import {useNavigate} from "react-router-dom"

function TabPanel({ children, value, index, content }) {
   return (
      <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
         {value === index && (
            <div>
               <QuizDisplay quizzes={content} />
               <Typography>{children}</Typography>
            </div>
         )}
      </div>
   );
}


export default function Dashboard() {
   const navigate = useNavigate()

   function createQuiz(event){
      navigate("/dashboard/create-quiz")
   }

   const userEmail = sessionStorage.getItem("user_email") 
   const [tabValue, setTabValue] = useState(0);
   const [suggestedQuizzes, setSuggestedQuizzes] = useState([{}]);
   const [personalQuizzes, setPersonalQuizzes] = useState([{}]);

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
   };

   useEffect(()=>{
      axios.get(`${SERVER_HOST}/suggested-quizzes?email=${userEmail}`,{params: {userEmail}}).then((res)=>{
         setSuggestedQuizzes(res.data)
      }).catch((e)=>{
         console.log(e)
      })
      axios.get(`${SERVER_HOST}/personal-quizzes?email=${userEmail}`,{params: {userEmail}}).then((res)=>{
         setPersonalQuizzes(res.data)
      }).catch((e)=>{
         console.log(e)
      })
   },[])

   return (
      <Box sx={{
         paddingBlock:
            { xs: 3, md: 7 },
         paddingInline: {
            xs: 2,
            md: 10
         }
      }}>
         <Box id="banner" sx={{ borderRadius: 5, background: purple200, paddingBlock: "max(1rem, 5vh)", paddingInline: "max(1rem, 3vh)" }} display={"flex"} gap={1} justifyContent={"space-between"}>
            <Stack gap={2} flexBasis={"600px"}>
               <Typography color={"secondary"} variant="h6">Welcome to the Quizzler. Create your own quizzes and explore our vast quiz collection</Typography>
               <Button variant="contained" color="secondary">Find friends</Button>
            </Stack>
            <Box position={"relative"} flexBasis={"200px"}>
               <Avatar src={starfire} sx={{ position: "absolute" }}></Avatar>
               <Avatar src={starfire} sx={{ position: "absolute", top: "10%", left: { xs: "60px", md: "90px" }, width: "35px", height: "auto", aspectRatio: 1 }}></Avatar>

               <Avatar src={starfire} sx={{ position: "absolute", top: "50%", left: "-40px" }}></Avatar>
               <Avatar src={starfire} sx={{ position: "absolute", top: "45%", left: "40px", width: "30px", height: "auto", aspectRatio: 1 }}></Avatar>
               <Avatar src={starfire} sx={{ position: "absolute", top: "50%", left: "120px", display: { xs: "none", md: "block" } }}></Avatar>

               <Avatar src={starfire} sx={{ position: "absolute", top: "80%", left: { xs: "-100%", md: "-100px" }, width: "35px", height: "auto", aspectRatio: 1 }}></Avatar>
               <Avatar src={starfire} sx={{ position: "absolute", top: "80%", left: "15px", width: "35px", height: "auto", aspectRatio: 1 }}></Avatar>
               <Avatar src={starfire} sx={{ position: "absolute", top: "90%", left: { xs: "70px", md: "90px" }, width: "35px", height: "auto", aspectRatio: 1 }}></Avatar>

            </Box>
         </Box>

         <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginBottom: 4 }}>
            <Tab label="For you" />
            <Tab label="Your quizzes" />
            <Tab label="Favourites" />
         </Tabs>

         <TabPanel value={tabValue} index={0} content={suggestedQuizzes}>
         </TabPanel>
         <TabPanel value={tabValue} index={1} content={personalQuizzes}>
            <Button variant="contained" sx={{marginTop:"20px"}} onClick={createQuiz}>Create Quiz</Button>
         </TabPanel>
         <TabPanel value={tabValue} index={2} content={suggestedQuizzes}>
         </TabPanel>
         
      </Box>
   )
}