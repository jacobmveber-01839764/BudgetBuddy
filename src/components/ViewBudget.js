import React, {useState, useEffect} from 'react';
import './css/ViewBudget.css'
import logo from './widget_logos/current_balance_logo.png';

export default function FetchAPI() {
	const [whole, setWhole] = useState('');
	const [decimal, setDecimal] = useState('')
	const [balance, setBalance] = useState('');

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

	async function getBalance() {
		try {
		  const response = await fetch('https://api.bb.gabefarrell.com/w/balance', {
			method: 'GET',
			headers: {
			  'x-session-key': getSessionKey(),
			},
		  });
		  const data = await response.json();
		  const whole = data.balance.whole;
		  const decimal = data.balance.decimal;
		  const balance = whole + '.' + decimal;
		  console.log(balance); 
		  return balance;
		} catch (error) {
		  console.error(error);
		}
	  }
	async function fetchBalance() {
            const name = await getBalance();
            setBalance(name);
        }
	useEffect(() => {
		
        fetchBalance();
	}, [])
		
	function handleSubmit(event) {
		// const form = document.getElementById('form');
		event.preventDefault();
		// const payload = new FormData(form);
		const balance = whole.split('.')
		if (balance.length < 2)
			balance.push(0);
		else if (balance[1].length < 1)
			balance.push(0);
		// console.log([...payload])
		// const formData = new FormData();
        // formData.append('whole', whole);
		// console.log(formData)
		var details = {
			// 'currency' : currency,
			'whole' : balance[0],
			'decimal' : balance[1]
		};
		var formBody = []
		for (var property in details) {
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(details[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		  }
		  formBody = formBody.join("&");

		fetch('https://api.bb.gabefarrell.com/w/balance', {
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
				fetchBalance();
		});
	  }
	return (
		<>
			{/* <img src={logo}></img> 
			<span>Current Balance: ${data}</span> */}
			{/* <button onClick={apiGet()}> TEST</button> */}
			 <h1>{balance}</h1> 
			 <form id="form" onSubmit={handleSubmit}>
      			<input 
				type = "text"
					 className="form-control" 
					 placeholder="Enter Balance" 
					 value={whole} 
					onChange={(event) => setWhole(event.target.value)}
					 required />
      			<button type="submit">Submit</button>
    		</form>
		</>
		
	);
};