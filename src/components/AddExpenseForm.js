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
					getCategoryList();
			  	}
			})
		} catch(error) {
			console.error(error);
		}
	}, [transactionType])

	const toggleTransactionType = () => {
		if (transactionType == "expenses") {
			setTransactionType("income");
		} else {
			setTransactionType("expenses");
		}
	}
  
	const getCategoryList = () => {
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
				let categories = [];
				
				Object.values(data.expenses).map((transactions) => {
					transactions.forEach(transaction => {
					  if (transaction.type == transactionType && !categories.includes(transaction.category)) {
						categories.push(transaction.category)
					  }
					});
				});

				if (categories.length == 0) categories = ["Uncategorized"];
				setCategoryList(categories);
				setCategory(categories[0])
		  	}
		})
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
		
		console.log(transactionType);

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

	return (
		<div className='widget'>
			<h4>Add Transaction</h4>
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
						<button type='submit' onClick={onSubmit} className='btn btn-primary' style={{marginRight:"12px"}}>
							Add {transactionType.substring(0, 1).toUpperCase() + transactionType.substring(1)}
						</button>
						<button className='btn btn-primary' onClick={handleAddCategory} style={{marginRight:"12px"}}>
							Add New Category
						</button>
						<button onClick={toggleTransactionType}>
							{transactionType.toUpperCase()}
						</button>
					</div>
				</div>
		</div>
	);
};

export default AddExpenseForm;
