import React from 'react'
import './AddNewBill.css'

export default function AddNewBill() {
    return (
        <>
            <div class="add_bill_widget">
                <h5 class="widget_header">Add New Bill</h5>
                <input type="number"></input> 
                <div class="buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Categories</button>
                        <div class="dropdown-content">
                            <p>Bills</p>
                            <p>Groceries</p>
                            <p>Rent</p>
                            <p>Leisure</p>
                            <p>Gas</p>
                        </div>
                    
                </div>
                <button>Add Bill</button>  
                </div>
                
            </div>
        </>
        
    )
}