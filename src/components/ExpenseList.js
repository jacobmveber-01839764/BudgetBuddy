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
	const [data, setData] = useState([]);
	const [type, setType] = useState('');

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

	  async function fetchData() {
		
		  fetch('https://api.bb.gabefarrell.com/w/transactions/recent', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  })
		  .then((response) => response.json())
		  .then((actualData) => {
			console.log(actualData);
			setData(actualData);
			console.log(data);
		  })
		  .catch((err) => {
			console.log(err.message);
		  });
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

	  async function getType() {
		try {
		  const response = await fetch('https://api.bb.gabefarrell.com/w/transactions/recent', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  });
		  const data = await response.json();
		  const type = data.transactions.map((item)=>item.type);
		  

		  //console.log(whole + decimal +  "<- total recent transacations");
		  //console.log(whole, decimal, balance);
		  //const transactions_balance = whole + '.' + decimal;
		   //console.log(whole, decimal, category); 
		  return type;
		} catch (error) {
		  console.error(error);
		}
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
			//console.log(month, day);
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
		const type = await getType();

		setCategories(categories);
		//console.log(category + "CATEGORIES");
		setTransactions(transaction_balance);
		setTime(date);
		setType(type);
	}
	
	useEffect(() => {
		fetchTransactions(); //b36efa01-7824-4f61-a274-63131b58d8fe		
		//fetchData();
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
			<table class="table table-striped"><tbody>
				<tr >
					<td style={{color: type[0]==='expenses' ? 'red' : 'green' }}>{category[0]}</td>
					<td style={{color: type[0]==='expenses' ? 'red' : 'green' }}>{transaction[0]}</td>
					<td style={{color: type[0]==='expenses' ? 'red' : 'green' }}>{type[0]}</td>
				</tr>
				<tr>
					<td style={{color: type[1]==='expenses' ? 'red' : 'green' }}>{category[1]}</td>
					<td style={{color: type[1]==='expenses' ? 'red' : 'green' }}>{transaction[1]}</td>
					<td style={{color: type[1]==='expenses' ? 'red' : 'green' }}>{type[1]}</td>
				</tr>
				<tr>
					<td style={{color: type[2]==='expenses' ? 'red' : 'green' }}>{category[2]}</td>
					<td style={{color: type[2]==='expenses' ? 'red' : 'green' }}>{transaction[2]}</td>
					<td style={{color: type[2]==='expenses' ? 'red' : 'green' }}>{type[2]}</td>
				</tr>
				<tr>
					<td style={{color: type[3]==='expenses' ? 'red' : 'green' }}>{category[3]}</td>
					<td style={{color: type[3]==='expenses' ? 'red' : 'green' }}>{transaction[3]}</td>
					<td style={{color: type[3]==='expenses' ? 'red' : 'green' }}>{type[3]}</td>
				</tr>
				<tr>
					<td style={{color: type[4]==='expenses' ? 'red' : 'green' }}>{category[4]}</td>
					<td style={{color: type[4]==='expenses' ? 'red' : 'green' }}>{transaction[4]}</td>
					<td style={{color: type[4]==='expenses' ? 'red' : 'green' }}>{type[4]}</td>
				</tr>
				<tr>
					<td style={{color: type[5]==='expenses' ? 'red' : 'green' }}>{category[5]}</td>
					<td style={{color: type[5]==='expenses' ? 'red' : 'green' }}>{transaction[5]}</td>
					<td style={{color: type[5]==='expenses' ? 'red' : 'green' }}>{type[5]}</td>
				</tr>
				<tr>
					<td style={{color: type[6]==='expenses' ? 'red' : 'green' }}>{category[6]}</td>
					<td style={{color: type[6]==='expenses' ? 'red' : 'green' }}>{transaction[6]}</td>
					<td style={{color: type[6]==='expenses' ? 'red' : 'green' }}>{type[6]}</td>
				</tr>
    		</tbody></table>
			
		</div>
	);
};

export default ExpenseList;
