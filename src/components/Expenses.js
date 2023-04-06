import React from 'react'
import './Expenses.css'
import logo from '../assets/widget_logos/expenses_logo.png';

export default function Expenses() {
    return (
        <>
            <div class="expenses_widget">
                <h4 class="widget_header">This Month's Expenses</h4> 
                <img src={logo} />          
                <h1>$456.78</h1>
                <h6>+ $359.97 (26%) last month (17%)</h6>
            </div>
        </>
        
    )
}