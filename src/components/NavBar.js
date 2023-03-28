import { makeStyles, Toolbar, Typography } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import React from "react";
import "./NavBar.css"

import logo from "../assets/BudgetBuddyLogo.png"

function NavBar() {
    return (
        <Toolbar position="sticky" className="bar">
            <img src={logo} className="logo"/>
            <Typography variant="h6" className="nav-header">
                BudgetBuddy
            </Typography>
        </Toolbar>
    )
}

export default NavBar