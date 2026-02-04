import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';

const NavMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const paperProps = {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        }
    };

    return(
        <>
            <IconButton
                onClick={handleClick}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls={open ? 'app-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ mr: 2 }}
                >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="app-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={paperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/" className="nav-link">
                    <MenuItem>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        Home
                    </MenuItem>
                </Link>
                <Link to="/add-household" className="nav-link">
                    <MenuItem>
                        <ListItemIcon>
                            <PostAddIcon fontSize="small" />
                        </ListItemIcon>
                        Enter Household Data
                    </MenuItem>
                </Link>
                <Link to="/view-reports" className="nav-link">
                    <MenuItem>
                        <ListItemIcon>
                            <AssessmentIcon fontSize="small" />
                        </ListItemIcon>
                        View Reports
                    </MenuItem>
                </Link>
            </Menu>
        </>
    )
};

export default NavMenu;