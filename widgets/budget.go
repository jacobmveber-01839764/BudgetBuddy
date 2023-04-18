package widgets

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type BudgetResponse struct {
	Status int `json:"status"`
	// total amount allowed to spend in a month
	Budget money.Money `json:"budget"`
	// total amount allowed to spend by category
	BudgetCategories map[string]money.Money `json:"budget_categories"`
	// categories in the budget
	Categories []string `json:"categories"`
	// total expenses by category
	ExpensesByCategory map[string]money.Money `json:"expenses_by_category"`
	// transactions mapped to a category
	Expenses map[string][]db.Transaction `json:"expenses"`
}

func GetBudget(w http.ResponseWriter, r *http.Request) {
	// get session key from request
	session := r.Header.Get("x-session-key")

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	var user = db.UserSchema{}

	err := userCollection.FindOne(context.Background(), bson.D{primitive.E{Key: "session", Value: session}}).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}
	var response BudgetResponse

	response.Budget = user.Budget
	response.BudgetCategories = user.BudgetCategories
	cats := make([]string, len(user.BudgetCategories))
	i := 0
	for k := range user.BudgetCategories {
		cats[i] = k
		i++
	}
	response.Categories = cats
	response.Expenses = make(map[string][]db.Transaction)
	response.ExpensesByCategory = make(map[string]money.Money)
	for _, e := range user.Expenses {
		if response.Expenses[e.Category] == nil {
			response.Expenses[e.Category] = make([]db.Transaction, 0)
		}
		response.Expenses[e.Category] = append(response.Expenses[e.Category], e)
		response.ExpensesByCategory[e.Category] = money.Add(e.Amount, response.ExpensesByCategory[e.Category])
	}

	response.Status = 200

	ret, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
		return
	}

	w.Write(ret)

}
func SetCategoryBudget(w http.ResponseWriter, r *http.Request) {
	// get session key from request
	session := r.Header.Get("x-session-key")

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	var user = db.UserSchema{}

	err := userCollection.FindOne(context.Background(), bson.D{primitive.E{Key: "session", Value: session}}).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	// get form values
	r.ParseForm()
	cat := strings.ToLower(r.FormValue("category"))
	if cat == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"category must be specified\"}")
		return
	}
	newWhole, err := strconv.Atoi(r.Form.Get("whole"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect whole value\"}")
		return
	}
	newDecimal, err := strconv.Atoi(r.Form.Get("decimal"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect decimal value\"}")
		return
	}
	// TODO: figure out how to efficiently determing currency
	newBudget := money.Money{
		Currency: money.Currency(r.FormValue("currency")),
		Whole:    newWhole,
		Decimal:  newDecimal,
	}

	if user.BudgetCategories == nil {
		user.BudgetCategories = make(map[string]money.Money)
		user.Categories = append(user.Categories, cat)
	}

	user.BudgetCategories[cat] = newBudget

	filter := bson.D{primitive.E{Key: "session", Value: session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "categories", Value: user.BudgetCategories}}}}
	_, err = userCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	w.Write([]byte("{\"status\":200}"))
}

func SetBudget(w http.ResponseWriter, r *http.Request) {
	// get session key from request
	session := r.Header.Get("x-session-key")

	// get form values
	r.ParseForm()
	newWhole, err := strconv.Atoi(r.Form.Get("whole"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect whole value\"}")
		return
	}
	newDecimal, err := strconv.Atoi(r.Form.Get("decimal"))
	if err != nil || newDecimal < 0 || newDecimal > 99 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect decimal value\"}")
		return
	}
	// TODO: figure out how to efficiently determing currency
	newBudget := money.Money{
		Currency: money.Currency(r.FormValue("currency")),
		Whole:    newWhole,
		Decimal:  newDecimal,
	}

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	filter := bson.D{primitive.E{Key: "session", Value: session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "budget", Value: newBudget}}}}
	_, err = userCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	w.Write([]byte("{\"status\":200}"))
}
