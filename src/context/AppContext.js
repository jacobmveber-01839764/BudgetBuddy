import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};

		default:
			return state;
	}
};

const initialState = {
	budget: 2000,
	expenses: [
		{ id: uuidv4(), name: 'Groceries', cost: 50 },
		{ id: uuidv4(), name: 'Leisure', cost: 300 },
		{ id: uuidv4(), name: 'Pet', cost: 70 },
		{ id: uuidv4(), name: 'Gas', cost: 40 },
		{ id: uuidv4(), name: 'Rent', cost: 500 },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}>
			{props.children}
		</AppContext.Provider>
	);
};
