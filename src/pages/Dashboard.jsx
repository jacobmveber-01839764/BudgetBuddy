import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from '../context/AppContext';
import Budget from '../components/Budget';
import ExpenseTotal from '../components/ExpenseTotal';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import RemainingBudget from '../components/Remaining';
import AddIncome from '../components/AddIncome'

export default function Dashboard() {
  return (
		<AppProvider>
			<div className='container-fluid'>
				<h1 className='mt-3'>My Budget Planner</h1>
				<div className='row mt-3'>
					<div className='col-sm'>
						<Budget />
					</div>
					<div className='col-sm'>
						<RemainingBudget />
					</div>
					<div className='col-sm'>
						<ExpenseTotal />
					</div>
				</div>
				
				<div className='row mt-3'>
					<div className='col-sm alert alert-secondary'>
						<h3 className='mt-3'>Expenses</h3><ExpenseList />
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-sm'>
						<AddExpenseForm />
					</div>
				</div>
				
				<div className='row mt-3'>
					<div className='col-sm'>
						{/*<h3 className='mt-3'>Add Income</h3><AddIncome /> */}
					</div>
				</div>
			</div>
		</AppProvider>
	);
 }