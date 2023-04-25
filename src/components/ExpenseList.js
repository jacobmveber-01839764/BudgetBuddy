import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import './css/ExpenseList.css'

const ExpenseList = () => {
	const [whole, setWhole] = useState('');
	const [decimal, setDecimal] = useState('');
	const [transaction, setTransactions] = useState('');
	const [category, setCategories] = useState('');
	const [time, setTime] = useState('');

	function getSessionKey() {
		var cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
		  const cookie = cookies[i].trim(); // Remove any leading or trailing whitespace
		  if (cookie.startsWith('session=')) {
			return cookie.substring('session='.length, cookie.length); // Extract the value of the cookie
		  }
		}
		return null;
	  }

	

	  async function getTransactionsBalance() {
		try {
		  const response = await fetch('https://api.bb.gabefarrell.com/w/transactions/recent', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  });
		  const data = await response.json();
		  let whole = data.transactions.map((item)=>item.amount.whole);
		  let decimal = data.transactions.map((item)=>item.amount.decimal);
		  let balance = [];
		  for (let i = 0; i < whole.length; i++) {
				let expense_balance = whole[i] + '.' + decimal[i];
				balance.push(expense_balance);
		  }

		  //console.log(whole + decimal +  "<- total recent transacations");
		  //console.log(whole, decimal, balance);
		  //const transactions_balance = whole + '.' + decimal;
		   //console.log(whole, decimal, category); 
		  return balance;
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function getTransactionsCategory() {
		try {
		  const response = await fetch('https://api.bb.gabefarrell.com/w/transactions/recent', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  });
		  const data = await response.json();
		  const category = data.transactions.map((item)=>item.category);
		 
		   //console.log(category); 
		  return category;
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function getDate() {
		try {
		  const response = await fetch('https://api.bb.gabefarrell.com/w/transactions/recent', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  });
		  const data = await response.json();
		  const timestamp = data.transactions.map((item)=>item.timestamp);
		  let dateFormat = [];
		  let date, month, day;
		  for (let i = 0; i < timestamp.length; i++) {
			date = new Date(timestamp[i]);
			month = date.getMonth();
			day = date.getDay();
			console.log(month, day);
			dateFormat.push(month + '/' + day);
		  }
		 //let dateFormat = new Date(timestamp[0]);
		//    console.log(date); 
		  return dateFormat;
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function buildTable(data1, data2, data3){
			var table = document.getElementById('myTable')
	
			for (var i = 0; i < data1.length; i++){
				var row = `<tr>
								<td>${data1[i]}</td>
								<td>$${data2[i]}</td>
								
						  </tr>`
				table.innerHTML += row
	
	
			}
		}
		
		buildTable(category, transaction, time);

	  async function fetchTransactions() {
		const categories = await getTransactionsCategory();
		const transaction_balance = await getTransactionsBalance();
		const date = await getDate();
		
			

		setCategories(categories);
		setTransactions(transaction_balance);
		setTime(date);
	}
	
	useEffect(() => {
		fetchTransactions(); //b36efa01-7824-4f61-a274-63131b58d8fe		
	}, [])


	return (
		<div className='widget'>
			{/* <input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Type to search...'
				onChange={handleChange}
			/>  */}
			
			<h4>Recent Transactions</h4>
			{/* <h4>{category}</h4>
			<h4>{transaction}</h4>	 */}
			<table><tbody id="myTable">
        
    		</tbody></table>
			
		</div>
	);
};

export default ExpenseList;
