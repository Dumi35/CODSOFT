import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact', 'Login', 'Sign up'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <img src={require("../assets/images/logo.png")} alt="Logo" style={{ height: 'auto' }} />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <Link to={`/${item.toLowerCase()}`} style={{ color: "black", textDecoration: "none" }}>
                        <ListItem key={item} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item} />

                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', zIndex: 2 }}>
            <CssBaseline />
            <AppBar component="nav" >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', alignItems: 'center' } }}
                    >
                        <img src={require("../assets/images/logo.png")} alt="Logo" style={{ height: 'auto' }} />
                    </Typography>
                    {/* <img src={require("../assets/images/logo.png")} alt="Logo" style={{ height: 'auto' }} sx={{ flexGrow: 1 }}/> */}
                    <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}>

                        {navItems.map((item, index) => (

                            <Link to={`/${item.toLowerCase()}`}>

                                <Button

                                    key={item}
                                    sx={{
                                        //color: '#fff',
                                        fontWeight: "bold",
                                        ...(index === 5 && { border: '1px solid black', paddingInline: 2.5 }),
                                    }}
                                >

                                    {item}
                                </Button>
                            </Link>


                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{
                // paddingBlock:
                //     { xs: 3 },
                paddingInline: {
                    xs: 3,
                    md: 10
                }
            }} >
                <Toolbar />

            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;