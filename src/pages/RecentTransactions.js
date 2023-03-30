import React from 'react'
import './RecentTransaction.css'

export default function RecentTransactions() {
    return (
        <>
            <div class="transactions_widget">
                <h4 class="widget_header">Recent Transactions</h4> 
                <div class="transaction_table">
                    <p>Bill</p>
                    <p>$35.00</p>
                    <p>2/15/23</p>
                    <p>Food</p>
                    <p>$29.95</p>
                    <p>2/11/23</p>
                    <p>Wage</p>
                    <p>$723.40</p>
                    <p>2/10/23</p>
                    <p>Pet</p>
                    <p>$56.98</p>
                    <p>2/5/23</p>
                    <p>Leisure</p>
                    <p>$60.04</p>
                    <p>2/03/23</p>
                </div>
            </div>
        </>
        
    )
}