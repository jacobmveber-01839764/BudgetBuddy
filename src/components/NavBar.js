import React from "react";
import { Menu, MenuItem } from '@mui/material';
import { Toolbar, Typography, Button, IconButton, Link } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../assets/BudgetBuddyLogo.png"
import "./NavBar.css"
import {checkLogin, getName, handleLogout} from "../utils/utils";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import { async } from "q";

export default function NavBar() {
    const [name, setName] = useState(null);
    

    useEffect(() => {
        async function fetchName() {
            const name = await getName();
            setName(name);
        }
        fetchName();
    }, []);

    return (
        <Toolbar position="sticky" className="navbar mb-2 py-3 px-4">
            <Link href="/" className="nav-brand" underline="none">
                <img src={logo} className="logo w-100"/>
                <Typography 
                    variant="h4"
                    className="nav-header">
                    BudgetBuddy
                </Typography>
            </Link>
            <div className="nav-login-control">
                {checkLogin()
                    ? // Logged In
                        <div>
                            <NavDropdown title={`Logged in as ${name}`}>
                                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="/about-us">About Us</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    : // Logged Out
                    <span className="mx-0" style={{display: "flex"}}> 
                        <Button  className="mx-0" href="/login">Login</Button>
                        <p style={{marginTop: "9px"}}>or</p>
                        <Button className="mx-0" href="/signup">Signup</Button>
                    </span>
                }
            </div>
        </Toolbar>
    )
}