import "@fontsource/montserrat"
import "@fontsource/outfit"
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import DrawerAppBar from "./components/AppBar";
import Home from "./elements/Home";
import Footer from "./components/Footer";
import SignUp from "./elements/signUp"

//design variables
export const blue200 = "#0F1640"
const blue100 = "#0B69C1"
export const grey200 = "#A09696"
export const grey100 = "#E6F0F9"

const theme = createTheme({
  palette: {
    primary: {
      main: blue200, 
      contrastText: "white"
    },
    secondary: {
      main: blue100, 
      contrastText: "white"
    },

  },

  typography: {
    fontFamily: [
      'Outfit'
    ],
    appBar: {
      color: 'blue',
    },
    h3:{
      color: blue200
    },
  
    h6:{
      color: grey200
    },
  
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
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-root.MuiCard-root': {
            justifyContent: "start"
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "white"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "20px",
          width:"150px"
        },
        containedPrimary: {
          backgroundColor: blue200,
          color: 'white',
          '&:hover': {
            backgroundColor: 'white',
            color: blue200,
          },
        },
        containedSecondary: { // Overrides for secondary contained buttons
          backgroundColor: 'D56D52', // purple background for secondary buttons
          color: 'white', // white text color for secondary buttons
          '&:hover': {
            backgroundColor: 'white', // purple background for secondary buttons
            color: '#D56D52',
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
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/sign up" element={<SignUp/>} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
