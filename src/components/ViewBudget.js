import React from 'react';
import './css/ViewBudget.css'
import logo from './widget_logos/current_balance_logo.png';

const ViewBudget = (props) => {
	return (
		<>
			<img src={logo}></img> 
			<span>Current Balance: ${props.budget}</span>
			<button type='button' className='btn btn-primary' onClick={props.handleEditClick}>
				Edit
			</button>
		</>
	);
};

export default ViewBudget;
