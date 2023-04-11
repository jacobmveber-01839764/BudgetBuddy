import React from "react";
import { Menu, MenuItem } from '@mui/material';
import { Toolbar, Typography, Button, IconButton, Link } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../assets/BudgetBuddyLogo.png"
import "./NavBar.css"
import checkLogin from "../utils/utils";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogin = () => {
        handleClose();
        window.location.href='/login';
    }

    const handleSignup = () => {
        handleClose();
        window.location.href='/signup';
    }
    
    const handleLogout= () => {
        handleClose();
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.href='/welcome';
    }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Toolbar position="sticky" className="bar">
            <Link href="/" class="nav-brand">
                <img src={logo} className="logo"/>
                <Typography 
                    className="nav-header"
                    variant="h5" >
                    BudgetBuddy
                </Typography>
            </Link>
            <div className="nav-login-control">
                {checkLogin()
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
                    : // Logged Out
                    <span style={{display: "flex"}}> 
                        <Button onClick={handleLogin}>Login</Button>
                        <p style={{marginTop: "9px"}}>or</p>
                        <Button onClick={handleSignup}>Signup</Button>
                    </span>
                }
            </div>
        </Toolbar>
    )
}