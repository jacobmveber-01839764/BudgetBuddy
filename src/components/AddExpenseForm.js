import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import './AddExpenseForm.css'
import { getSessionKey } from '../utils/utils.js'

const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [cost, setCost] = useState('');
	const [category, setCategory] = useState('');
	const [categoryList, setCategoryList] = useState([]);
	const [transactionType, setTransactionType] = useState('expenses');

	useEffect(() => {
        getCategoryList();
	}, [transactionType])

	const toggleTransactionType = () => {
		if (transactionType == "expenses") {
			setTransactionType("income");
		} else {
			setTransactionType("expenses");
		}
	}
  
	const getCategoryList = () => {
		if (transactionType == "expenses") {
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
					let categories = Object.keys(data.expenses_by_category).length > 0 ? Object.keys(data.expenses_by_category) : ["Uncategorized"];
					
					setCategoryList(categories);
					setCategory(categories[0])
				}
			})
		} else {
			fetch('https://api.bb.gabefarrell.com/w/income', {
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
					let categories = Object.keys(data.income_by_category).length > 0 ? Object.keys(data.income_by_category) : ["Uncategorized"];
					
					setCategoryList(categories);
					setCategory(categories[0])
				}
			})			
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData();

		let currency = "USD"
		let whole = 0;
		let decimal = 0;


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
		formData.append('type', transactionType)

		try {
			fetch(`https://api.bb.gabefarrell.com/w/transactions?whole=${whole}&decimal=${decimal}&currency=${currency}&category=${category}&type=${transactionType}`, {
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

	const quickSet = (event) => {
		setCost(event.target.value)
	}

	return (
		<div className='widget'>
			<h4>Add Transaction</h4>
			<div style={{height: "85%"}} className='d-flex flex-column justify-content-between'>
				<div className='row'>
					<div className='col'>
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
					<div className='col'>
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
				
				<div className='row'>
					<div className='btn-group mt-2' role="group">
						<button className='btn btn-outline-success m-right' value={1} onClick={quickSet}>
							$1
						</button>
						<button className='btn btn-outline-success m-right' value={5} onClick={quickSet}>
							$5
						</button>
						<button className='btn btn-outline-success m-right' value={10} onClick={quickSet}>
							$10
						</button>
						<button className='btn btn-outline-success m-right' value={15} onClick={quickSet}>
							$15
						</button>
						<button className='btn btn-outline-success m-right' value={20} onClick={quickSet}>
							$20
						</button>
						<button className='btn btn-outline-success m-right' value={50} onClick={quickSet}>
							$50
						</button>
					</div>
				</div>

				<div className='row'>
					<div className='col-sm'>
						<button className='btn btn-dark m-right  mt-2' onClick={toggleTransactionType}>
							{transactionType.toUpperCase()}
						</button>
						<button type='submit' onClick={onSubmit} id="add-transaction-button" className='btn btn-primary m-right mt-2'>
							Add Transaction
						</button>
						<button className='btn btn-primary  mt-2' onClick={handleAddCategory}>
							Add New Category
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddExpenseForm;
