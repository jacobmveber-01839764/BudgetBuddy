import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import './AddExpenseForm.css'

const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		const expense = {
			id: uuidv4(),
			name,
			cost: parseInt(cost),
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});

		setName('');
		setCost('');
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='row alert alert-secondary'>
				{/* <div className='col-sm col-lg-4'>
				<form htmlFor="name">
				<label >Choose a category:</label>
					<select>
						<option required='required'
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}>Rent</option>
					</select>
				</form>
				</div> */}
				<h3>Add Expense</h3>
				<div className='col-sm col-lg-4'>
					<label htmlFor='name'>Name</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
				
				</div>  
				<div className='col-sm col-lg-4'>
					<label htmlFor='cost'>Cost</label>
					<input
						required='required'
						type='number'
						className='form-control'
						id='cost'
						value={cost}
						onChange={(event) => setCost(event.target.value)}
					/>
				</div>
			<div className='row mt-3'>
				<div className='col-sm'>
					<button type='submit' className='btn btn-primary'>
						Save
					</button>
				</div>
			</div></div>
			
		</form>
	);
};

export default AddExpenseForm;
