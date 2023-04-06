import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
			<span>Current Balance: ${props.budget}</span>
			<button type='button' class='btn btn-primary' onClick={props.handleEditClick}>
				Edit
			</button>
		</>
	);
};

export default ViewBudget;
