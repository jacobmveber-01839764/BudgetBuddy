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
			<div className='container-fluid'>
				<div className='row align-items-stretch'>
					<div className='col-sm'>
						<FetchAPI />
					</div>
					<div className='col-sm widget d-flex align-items-center justify-content-between'>
						<RemainingBudget />
					</div>
					<div className='col-sm'>
						{/* <ExpenseTotal /> */}
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
					<div className='col-12 col-md-12 col-lg-4'>
						<LoanCalculator/>
					</div>
					<div className='col-12 col-lg-4'>
						<CategorizedExpenses/>
					</div>
					<div className='col-12 col-lg-4'>
						<CategorizedIncome/>
					</div>
				</div>
			</div>
		</AppProvider>
	);
 }
