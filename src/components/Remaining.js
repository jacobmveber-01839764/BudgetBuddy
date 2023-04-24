import React, {useState, useEffect} from 'react';
import './css/ViewBudget.css'
import logo from './widget_logos/current_balance_logo.png';

export default function Remaining() {
	const [budget, setBudget] = useState('');
	const [whole, setWhole] = useState('');
	const [decimal, setDecimal] = useState('');

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

	async function getBudget() {
		try {
			const response = await fetch('https://api.bb.gabefarrell.com/w/budget', {
			  method: 'GET',
			  headers: {
				'x-session-key': getSessionKey(),
			  },
			});
			const data = await response.json();
			const whole = data.budget.whole;
			const decimal = data.budget.decimal;
			const budget_balance = whole + '.' + decimal;
			console.log(budget_balance); 
			return budget_balance;
		  } catch (error) {
			console.error(error);
		  }
	  }

	  async function getMonthlyExpenses() {
		try {
			const response = await fetch('https://api.bb.gabefarrell.com/w/expenses/month', {
			  method: 'GET',
			  headers: {
				'x-session-key': getSessionKey(),
			  },
			});
			const data = await response.json();
			const whole = data.whole;
			const decimal = data.decimal;
			const total_expenses = whole + '.' + decimal;
			console.log(total_expenses + "<- Total Expenses"); 
			return total_expenses;
		  } catch (error) {
			console.error(error);
		  }
	  }
	async function fetchBudget() {
            const name = await getBudget();
			const expenses = await getMonthlyExpenses();
			const budget_remaining = (name - expenses).toFixed(2);
            setBudget(budget_remaining);
        }
	useEffect(() => {
		
        fetchBudget();
	}, [])
		
	function handleSubmit(event) {
		event.preventDefault();
		const budget = whole.split('.')
		if (budget.length < 2)
			budget.push(0);
		else if (budget[1].length < 1)
			budget.push(0);
	
		var details = {
			// 'currency' : currency,
			'whole' : budget[0],
			'decimal' : budget[1]
		};
		var formBody = []
		for (var property in details) {
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(details[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		  }
		  formBody = formBody.join("&");

		fetch('https://api.bb.gabefarrell.com/w/budget', {
		  method: 'POST',
		  body: formBody,
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'x-session-key': getSessionKey()
		  }
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			if (data.status == 200)
				fetchBudget();
		});
	  }
	return (
		<>
			{/* <img src={logo}></img> 
			<span>Current Balance: ${data}</span> */}
			{/* <button onClick={apiGet()}> TEST</button> */}
			 <h1>{budget}</h1> 
			 <form id="form" onSubmit={handleSubmit}>
      			<input 
				type = "text"
					 className="form-control" 
					 placeholder="Enter Budget" 
					 value={whole} 
					onChange={(event) => setWhole(event.target.value)}
					 required />
      			<button type="submit">Submit</button>
    		</form>
		</>
		
	);
};