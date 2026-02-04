import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavMenu from '../nav-menu/nav-menu';
import { blue } from '@mui/material/colors';

import './layout.scss';

const Layout = () => {
    return(
        <div>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <NavMenu />
                    <Typography variant="h5" component="div" color={blue[900]}>
                        <Link to="/" className="logo-link">Hemkraft</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ marginTop: '3.0rem', flexGrow: 1 }}>
                <Outlet />
            </Box>
        </div>
    )
};

export default Layout;