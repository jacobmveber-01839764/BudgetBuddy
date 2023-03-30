import { ProSidebarProvider } from 'react-pro-sidebar'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'

import Dashboard from './pages/Dashboard'
import AboutUs from './pages/About-Us'
import Privacy from './pages/Privacy'
import Settings from './pages/Settings'
import Support from './pages/Support'
import ContactUs from './pages/Contact-Us'
import Error from './pages/Error-Page'
import './styles.css'



export default function Main() {
    let Layout
    switch (window.location.pathname) {
        case "/":
        case "/dashboard":
            Layout = Dashboard
            break;
        case "/about-us":
            Layout = AboutUs
            break;
        case "/privacy":
            Layout = Privacy
            break;
        case "/settings":
            Layout = Settings
            break;
        case "/support":
            Layout = Support
            break;
        case "/contact-us":
            Layout = ContactUs
            break;
        default:
            Layout = Error
            break;
    }

    return (
        <div>
            <NavBar />
            <ProSidebarProvider>
                <div class="main-body">
                    <SideNav />
                    <div class="page-display">
                        <Layout />
                    </div>
                </div>
            </ProSidebarProvider>
        </div>
    )
}