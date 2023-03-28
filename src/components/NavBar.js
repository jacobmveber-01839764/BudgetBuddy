import { Toolbar, Typography } from "@material-ui/core";
import React from "react";
import "./NavBar.css"
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from "@material-ui/core/Button";

import logo from "../assets/BudgetBuddyLogo.png"


export default function NavBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogin = () => {
        setAuth(true);
        handleClose();
    }
    
    const handleLogout= () => {
        setAuth(false);
        handleClose();
    }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Toolbar position="sticky" className="bar">
            <img src={logo} className="logo"/>
            <Typography 
                className="nav-header"
                variant="h5" >
                BudgetBuddy
            </Typography>
            <div className="nav-login-control">
                {auth
                    ? // Logged In
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit" >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose} >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    : <Button onClick={handleLogin}>Login or Sign Up</Button>  // Logged Out
                }
            </div>
        </Toolbar>
    )
}