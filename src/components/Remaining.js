import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import logo from './widget_logos/budget_logo.png';
import './css/Remaining.css'

const RemainingBudget = () => {
	const { expenses, budget } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

	return (
		<div className={`alert p-4 ${alertType} widget`}>
			<img src={logo}></img> 
			<span>Budget Remaining: ${budget - totalExpenses}</span>
		</div>
	);
};

export default RemainingBudget;
