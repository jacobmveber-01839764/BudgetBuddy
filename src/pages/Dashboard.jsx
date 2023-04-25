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
import LoanCalculator from '../components/LoanCalculator';

export default function Dashboard() {

  	return (
		<AppProvider>
			<div>
				<div className='row align-items-stretch'>
					<div className='col mb-3'>
						<FetchAPI />
					</div>
					<div className='col mb-3'>
						<RemainingBudget />
					</div>
					<div className='col mb-3'>
						<ExpenseTotal />
					</div>
				</div>

				<div className='row'>
					<div className='col-12 col-xl-4 mb-3'>
						<AddExpenseForm/>
					</div>
					<div className='col-12 col-xl-8 mb-3'>
						<LoanCalculator/>
					</div>
				</div>

				<div className='row'>
					<div className='col-12 col-md-12 col-lg-4 mb-3'>
						<ExpenseList />
					</div>
					<div className='col-12 col-lg-4 mb-3'>
						<CategorizedExpenses/>
					</div>
					<div className='col-12 col-lg-4 mb-3'>
						<CategorizedIncome/>
					</div>
				</div>
			</div>
		</AppProvider>
	);
 }
