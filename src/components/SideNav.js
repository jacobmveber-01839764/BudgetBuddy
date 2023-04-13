import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Typography } from '@material-ui/core';
import { Link, Divider } from '@material-ui/core';
import './SideNav.css'


export default function SideNav() {
    return(
        <Sidebar className="sidebar" backgroundColor='transparent' style={{border:"none"}}>
            <div className='sidebar-header'>
                <div className='sidebar-avatar'>
                    <Avatar />
                </div>
                <div className='sidebar-text'>
                    <Typography className='sidebar-welcome' variant='h6'>Welcome, Jacob</Typography>
                    <Typography variant='subtitle2'> Your Budget Overiew</Typography>
                </div>
            </div>
            <Menu>
                <MenuItem
                    component={<Link href="/dashboard" />}
                    icon={<DashboardOutlinedIcon/>}>
                    Dashboard
                </MenuItem>
                <MenuItem 
                    component={<Link href="/settings" />}
                    icon={<SettingsOutlinedIcon/>}>
                    Settings
                </MenuItem>
                {/*
                <MenuItem 
                    component={<Link href="/support" />}
                    icon={<ContactSupportOutlinedIcon/>}>
                    Support
                </MenuItem>
                */}
                {/*
                <MenuItem 
                    component={<Link href="/privacy" />}
                    icon={<PrivacyTipOutlinedIcon/>}>
                    Privacy
                </MenuItem>
                */}
                <MenuItem
                    component={<Link href="/about-us" />}
                    icon={<SupervisedUserCircleOutlinedIcon/>}>
                    About Us
                </MenuItem>
                {/*
                <MenuItem 
                    component={<Link href="/contact-us" />}
                    icon={<ContactPageOutlinedIcon/>}>
                    Contact Us
                </MenuItem>
                */}
                <MenuItem
                    icon={<LogoutIcon/>}>
                    Sign Out
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}