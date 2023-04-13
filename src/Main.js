import { ProSidebarProvider } from 'react-pro-sidebar'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'

import Dashboard from './pages/Dashboard'
import AboutUs from './pages/About-Us'
import Privacy from './pages/Privacy'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ContactUs from './pages/Contact-Us'
import Welcome from './pages/Welcome'
import Error from './pages/Error-Page'

import {checkLogin} from './utils/utils.js'

import './styles.css'

export default function Main() {
    let Layout
    switch (window.location.pathname) {
        case "/":
            if (checkLogin()) {
                Layout = Dashboard;
            } else {
                Layout = Welcome;
            }
            break;
        case "/dashboard":
            Layout = Dashboard;
            break;
        case "/about-us":
            Layout = AboutUs;
            break;
        case "/privacy":
            Layout = Privacy;
            break;
        case "/settings":
            Layout = Settings;
            break;
        /*
        case "/support":
            Layout = Support
            break;
        */
        case "/contact-us":
            Layout = ContactUs;
            break;

        case "/welcome":
            Layout = Welcome;
            break;
        
        case "/login":
            Layout = Login;
            break;
        
        case "/signup":
            Layout = Signup;
            break;

        default:
            Layout = Error;
            break;
    }

    return (
        <div className="full-page">
            <NavBar />
            {checkLogin() ?
                <ProSidebarProvider>
                    <div className="main-body">
                        <SideNav />
                        <div className="page-display elevated">
                            <Layout />
                        </div>
                    </div>
                </ProSidebarProvider>
            : <Layout />}
        </div>
    )
}