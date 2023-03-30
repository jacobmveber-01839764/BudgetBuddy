import React from 'react'
import './Income.css'
import logo from './widget_logos/income_logo.png';

export default function Income() {
    return (
        <>
            <div class="income_widget">
                <h4 class="widget_header">This Month's Income</h4> 
                <img src={logo} />          
                <h1>$1,525.00</h1>
                <h6>+ $1,037.51 (42%) last month</h6>
            </div>
        </>
        
    )
}