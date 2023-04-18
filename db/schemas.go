package db

import (
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
)

type UserSchema struct {
	Name              string                 `json:"name" bson:"name"`
	Email             string                 `json:"email" bson:"email"`
	Password          string                 `json:"password" bson:"password"`
	Session           string                 `json:"session" bson:"session"`
	Balance           money.Money            `json:"balance" bson:"balance"`
	Budget            money.Money            `json:"budget" bson:"budget"`
	BudgetCategories  map[string]money.Money `json:"categories" bson:"categories"`
	Categories        []string               `json:"categories_list" bson:"categories_list"`
	Expenses          []Transaction          `json:"expenses" bson:"expenses"`
	Income            []Transaction          `json:"income" bson:"income"`
	RecurringExpenses []RecurringTransaction `json:"recurring_expenses" bson:"recurring_expenses"`
	RecurringIncome   []RecurringTransaction `json:"recurring_income" bson:"recurring_income"`
}

type Transaction struct {
	Timestamp int64       `json:"timestamp" bson:"timestamp"`
	Category  string      `json:"category" bson:"category"`
	Amount    money.Money `json:"amount" bson:"amount"`
	Type      string      `json:"type" bson:"type"`
}

type RecurringTransaction struct {
	Transaction `json:"transaction" bson:"transaction"`
	Period      int   `json:"period" bson:"period"` // in days
	Since       int64 `json:"since" bson:"since"`   // unix timestamp
	Until       int64 `json:"until" bson:"until"`   // 0 for no end date
}
