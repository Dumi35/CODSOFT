import "@fontsource/outfit"
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import SignUp from "./elements/signUp"
import LogIn from "./elements/logIn";
import Dashboard from "./elements/dashboard";
import QuizView from "./elements/quizView";


//design variables
export const purple200 = "#775DF6"
const blue100 = "#0B69C1"
export const grey200 = "#A09696"
export const grey100 = "#E6F0F9"

export const SERVER_HOST = process.env.SERVER_HOST || "http://localhost:4000"

const theme = createTheme({
  palette: {
    primary: {
      main: purple200,
      contrastText: "white"
    },
    secondary: {
      main: "#fff",
      contrastText:  purple200
    },

  },

  typography: {
    fontFamily: [
      'Outfit'
    ],
    h3: {
      color: purple200
    },

    // h6: {
    //   color: grey200
    // },

  },


  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white', // Change background color of app bar
          //boxShadow:"none",
          color: "#000"
        },
      },
    },
    MuiTab:{
      styleOverrides:{
        root:{
          textTransform:"none"
        }
      }
    },
    MuiAvatar:{
      styleOverrides:{
        root:{
          background:"#EDFCFC"
        }
      }
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          color:purple200
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-root.MuiCard-root': {
            justifyContent: "start"
          },
          '&.MuiPaper-root.MuiDialog-paper': {
            borderRadius:"10px"
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: purple200,
          border:`1px solid ${purple200}`
        }

      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "20px",
          width: "150px"
        },
        containedPrimary: {
          backgroundColor: purple200,
          color: 'white',
          '&:hover': {
            backgroundColor: 'white',
            color: purple200,
          },
        },
        containedSecondary: { // Overrides for secondary contained buttons
          backgroundColor:"#fff", // purple background for secondary buttons
          color: purple200, // white text color for secondary buttons
          '&:hover': {
            backgroundColor: 'white', // purple background for secondary buttons
            color: purple200,
          },
        },
      },
    },
  },

});


function App() {
  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/quiz" element={<QuizView />} />

        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
