import React, { useState, useEffect } from 'react';
import { getSessionKey } from "../utils/utils";
import logo from './widget_logos/expenses_logo.png';
import './css/ExpenseTotal.css'

const ExpenseTotal = () => {
	const [expense, setExpense] = useState(0.0);

	useEffect(() => {
		fetch('https://api.bb.gabefarrell.com/w/expenses/month', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		})
		.then(data => data.json())
		.then((data) => {
			let monthExpense = data.whole
			monthExpense += (data.decimal / 100)
			setExpense(monthExpense)
		})
		.catch(console.log)
	}, [])

	return (
		<div className='widget p-4'>
			<img src={logo} className='expenseTotalIcon'></img>
			<span className='widgetText'>This Month's Expenses: ${expense}</span>
		</div>
	);
};

export default ExpenseTotal;
