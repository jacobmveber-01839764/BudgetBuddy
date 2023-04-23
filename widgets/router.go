package widgets

import "github.com/go-chi/chi/v5"

func Router() *chi.Mux {
	r := chi.NewRouter()

	// balance widget
	r.Get("/balance", GetBalance)
	r.Post("/balance", SetBalance)

	// transaction widget
	r.Get("/transactions/recent", GetRecentTransactions)
	r.Post("/transactions", NewTransaction)
	r.Post("/transactions/recurring", NewRecurring)

	// budget widget
	r.Get("/budget", GetBudget)
	r.Post("/budget", SetBudget)
	r.Post("/budget/categories", SetCategoryBudget)

	// expenses
	r.Get("/expenses/month", GetMonthExpenses)

	// income
	r.Get("/income/month", GetMonthIncome)
	r.Get("/income", IncomeByCategory)

	return r
}
