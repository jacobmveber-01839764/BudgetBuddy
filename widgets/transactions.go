package widgets

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	RecentTransactionAmount = 10
)

type RecentTransactionsResponse struct {
	Status       int              `json:"status"`
	Transactions []db.Transaction `json:"transactions"`
}

func GetRecentTransactions(w http.ResponseWriter, r *http.Request) {
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

	var transactionA []db.Transaction

	i := 0
	j := 0
	for i+j < RecentTransactionAmount {
		// if we are out of transactions, return
		if i >= len(user.Expenses) && j >= len(user.Income) {
			break
		} else if i > len(user.Expenses)-1 { // if we are out of expenses, just use income
			transactionA = append(transactionA, user.Income[j])
			j++
		} else if j > len(user.Income)-1 { // if we are out of income, just use expenses
			transactionA = append(transactionA, user.Expenses[i])
			i++
		} else if user.Expenses[i].Timestamp > user.Income[j].Timestamp {
			transactionA = append(transactionA, user.Expenses[i])
			i++
		} else {
			transactionA = append(transactionA, user.Income[j])
			j++
		}
	}

	response := RecentTransactionsResponse{
		Status:       200,
		Transactions: transactionA,
	}

	ret, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
	}

	w.Write(ret)
}

func NewTransaction(w http.ResponseWriter, r *http.Request) {
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

	r.ParseForm()

	whole, err := strconv.Atoi(r.Form.Get("whole"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect whole value\"}")
		return
	}
	decimal, err := strconv.Atoi(r.Form.Get("decimal"))
	if err != nil || decimal < 0 || decimal > 99 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect decimal value\"}")
		return
	}

	var cat string

	if r.FormValue("category") == "" {
		cat = "uncategorized"
	} else {
		cat = strings.ToLower(r.FormValue("category"))
	}

	newT := db.Transaction{
		Timestamp: time.Now().Unix(),
		Category:  cat,
		Amount: money.Money{
			Currency: money.Currency(r.FormValue("currency")),
			Whole:    whole,
			Decimal:  decimal,
		},
		Type: r.FormValue("type"),
	}

	var newArr []db.Transaction
	var success bool
	if strings.ToLower(r.FormValue("type")) == "income" {
		newArr = append(user.Income, newT)
		success = addToBalance(user, newT.Amount)
	} else if strings.ToLower(r.FormValue("type")) == "expenses" {
		newArr = append(user.Expenses, newT)
		success = subtractFromBalance(user, newT.Amount)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"invalid transaction type - only income or expenses are allowed\"}")
		return
	}

	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"unable to update balance\"}")
		return
	}

	// push the new transaction to db
	filter := bson.D{primitive.E{Key: "session", Value: user.Session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: r.FormValue("type"), Value: newArr}}}}
	userCollection.UpdateOne(context.TODO(), filter, update, opts)

	w.Write([]byte("{\"status\":200}"))
}

func NewRecurring(w http.ResponseWriter, r *http.Request) {
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

	r.ParseForm()

	whole, err := strconv.Atoi(r.Form.Get("whole"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect whole value\"}")
		return
	}
	decimal, err := strconv.Atoi(r.Form.Get("decimal"))
	if err != nil || decimal < 0 || decimal > 99 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"incorrect decimal value\"}")
		return
	}
	period, err := strconv.Atoi(r.Form.Get("period"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"period must be specified\"}")
		return
	}

	var cat string

	if r.FormValue("category") == "" {
		cat = "uncategorized"
	}

	newT := db.Transaction{
		Timestamp: time.Now().Unix(),
		Category:  cat,
		Amount: money.Money{
			Currency: money.Currency(r.FormValue("currency")),
			Whole:    whole,
			Decimal:  decimal,
		},
		Type: r.FormValue("type"),
	}

	newR := db.RecurringTransaction{
		Transaction: newT,
		Period:      period,
		Since:       time.Now().Unix(),
		Until:       int64(0),
	}

	var newArr []db.RecurringTransaction
	var success bool
	if r.FormValue("type") == "income" {
		newArr = append(user.RecurringIncome, newR)
		success = addToBalance(user, newT.Amount)
	} else if r.FormValue("type") == "expenses" {
		newArr = append(user.RecurringExpenses, newR)
		success = subtractFromBalance(user, newT.Amount)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"invalid transaction type - only income or expenses are allowed\"}")
		return
	}

	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"unable to update balance\"}")
		return
	}

	// push the new transaction to db
	filter := bson.D{primitive.E{Key: "session", Value: user.Session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: r.FormValue("type"), Value: newArr}}}}
	userCollection.UpdateOne(context.TODO(), filter, update, opts)

	w.Write([]byte("{\"status\":200}"))

}
