import React from 'react';
import  { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from '../context/AppContext';
import FetchAPI from '../components/Budget';
import ExpenseTotal from '../components/ExpenseTotal';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import RemainingBudget from '../components/Remaining';
import AddIncome from '../components/AddIncome'
import QuickTransaction from '../components/QuickTransaction'
import CategorizedExpenses from '../components/CategorizedExpenses';
import CategorizedIncome from '../components/CategorizedIncome';
import { Typography } from '@mui/material';

export default function Dashboard() {

  	return (
		<AppProvider>
			<div className='container-fluid'>
				<div className='row align-items-stretch'>
					<div className='col-sm'>
						<FetchAPI />
					</div>
					<div className='col-sm'>
						<RemainingBudget />
					</div>
					<div className='col-sm'>
						<ExpenseTotal />
					</div>
				</div>
				
				<div className='row mt-3'>
					<div className='col'>
						<AddExpenseForm/>
					</div>
					<div className='col'>
						<ExpenseList />
					</div>
				</div>

				<div className='row mt-3'>
					<div className='col-12 col-lg-6'>
						<CategorizedExpenses/>
					</div>
					<div className='col-12 col-lg-6'>
						<CategorizedIncome/>
					</div>
				</div>
			</div>
		</AppProvider>
	);
 }