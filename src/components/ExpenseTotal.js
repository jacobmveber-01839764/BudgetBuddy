import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import logo from './widget_logos/expenses_logo.png';
import './css/ExpenseTotal.css'

const ExpenseTotal = () => {
	const { expenses } = useContext(AppContext);

	const total = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	return (
		<div class='alert alert-secondary p-4'>
			<img src={logo}></img>
			<span>This Month's Expenses: ${total}</span>
		</div>
	);
};

export default ExpenseTotal;
