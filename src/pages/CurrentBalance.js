import React from 'react'
import './CurrentBalance.css'
import logo from './widget_logos/current_balance_logo.png';

export default function CurrentBalance() {
    return (
        <>
            <div class="current_balance_widget">
                <h5 class="widget_header">Current Balance</h5> 
                <img src={logo} />          
                <h1>$1238.56</h1>
                <h6>+ $179.97 (17%) last month</h6>
            </div>
        </>
        
    )
}