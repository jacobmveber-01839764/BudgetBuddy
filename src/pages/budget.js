import React from 'react'
import './budget.css'
import logo from './widget_logos/budget_logo.png';

export default function Budget() {
    return (
        <>
            <div class="budget_widget">
                <h4 class="widget_header">Budget Remaining</h4> 
                <img src={logo} />          
                <h1>$456.78</h1>
                <h6>Still on budget</h6>
            </div>
        </>
        
    )
}