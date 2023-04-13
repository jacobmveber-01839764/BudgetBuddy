import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				<span className='text-primary badge badge-primary badge-pill mr-3'>${props.cost}</span>
			</div>
		</li>
	);
};

export default ExpenseItem;
