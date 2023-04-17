import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import './AddExpenseForm.css'
import { getSessionKey } from '../utils/utils.js'

const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [category, setCategory] = useState('');
	const [categoryList, setCategoryList] = useState([]);

	useEffect(() => {
        try {
			fetch('https://api.bb.gabefarrell.com/w/budget', {
			  method: 'GET',
			  headers: {
				'x-session-key' : getSessionKey(),
			  }
			})
			.then(response => response.json())
			.then(data => {
				if (data.status != 200) {
					console.log(data.error);
			  	} else {
					setCategoryList(data.categories);
			  	}
			})
		} catch(error) {
			console.error(error);
		}
	}, [])

	const onSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData();

		let currency = "USD"
		let whole = 0;
		let decimal = 0;
		let type = 'expenses';


		if (cost.includes(".")) {
			whole = parseInt(cost.split(".")[0]);
			decimal = parseInt(cost.split(".")[1]);
		} else {
			whole = parseInt(cost);
		}
		formData.append('category', category)
		formData.append('currency', currency);
		formData.append('whole', whole);
		formData.append('decimal', decimal);
		formData.append('type', type)

		try {
			fetch(`https://api.bb.gabefarrell.com/w/transactions?whole=${whole}&decimal=${decimal}&currency=${currency}&category=${category}&type=${type}`, {
			  method: 'POST',
			  body: formData,
			  headers: {
				'x-session-key' : getSessionKey(),
			  }
			})
			.then(response => response.json())
			.then(data => {
				if (data.status != 200) {
					console.log(data.error);
			  	} else {
					
			  	}
			})
		} catch(error) {
			console.error(error);
		}

		/*
		const expense = {
			id: uuidv4(),
			name,
			cost: parseInt(cost),
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});
		*/

		setName('');
		setCost('');
	};

	const handleAddCategory = () => {
		const newCategory = prompt('Enter the new category name:');
		if (newCategory) {
			if (categoryList.indexOf(newCategory) == -1) {
		  		const newCategories = [...categoryList, newCategory];
				setCategoryList(newCategories);
			}
		 	setCategory(newCategory);
		}
	}

	return (
		<div className='widget'>
			<h4>Add Expense</h4>
			<form onSubmit={onSubmit}>
				<div className='row'>
					{/*
					<div className='col-md col-lg-4'>
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
					*/}
				</div>
				<div className='row'>
					<div className='col-md col-lg-4'>
						<label htmlFor='cost'>Cost</label>
						<input
							required='required'
							type='number'
							className='form-control'
							id='cost'
							min="0.00"
							step=".01"
							value={cost}
							onChange={(event) => setCost(event.target.value)}
						/>
					</div>
					<div className='col-md col-lg-4'>
						<label htmlFor='category-select'>Category</label>
						<select className="form-select" id='category-select'
							value={category} 
							onChange={(event) => setCategory(event.target.value)}>
								
							{categoryList.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-sm'>
						<button type='submit' className='btn btn-primary'>
							Add Expense
						</button>
						<button className='btn btn-primary mx-3' onClick={handleAddCategory}>
							Add New Category
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddExpenseForm;
