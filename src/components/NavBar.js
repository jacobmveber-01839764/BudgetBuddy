import React from "react";
import { Menu, MenuItem } from '@mui/material';
import { Toolbar, Typography, Button, IconButton, Link } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../assets/BudgetBuddyLogo.png"
import "./NavBar.css"
import {checkLogin, getFirstName} from "../utils/utils";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    const handleLogin = () => {
        window.location.href='/login';
    }

    const handleSignup = () => {
        window.location.href='/signup';
    }
    
    const handleLogout= () => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.href='/welcome';
    }


    return (
        <Toolbar position="sticky" className="bar">
            <Link href="/" className="nav-brand">
                <img src={logo} className="logo w-100"/>
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
                            <NavDropdown title={`Logged in as ${getFirstName()}`}>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>My account</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    : // Logged Out
                    <span className="mx-0" style={{display: "flex"}}> 
                        <Button  className="mx-0" onClick={handleLogin}>Login</Button>
                        <p style={{marginTop: "9px"}}>or</p>
                        <Button className="mx-0" onClick={handleSignup}>Signup</Button>
                    </span>
                }
            </div>
        </Toolbar>
    )
}