package widgets

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// TODO: Put user info fetching code into middleware

type GetBalanceResponse struct {
	Status  int         `json:"status"`
	Balance money.Money `json:"balance"`
}

func GetBalance(w http.ResponseWriter, r *http.Request) {
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

	response := GetBalanceResponse{
		Status: 200,
		Balance: money.Money{
			Currency: user.Balance.Currency,
			Whole:    user.Balance.Whole,
			Decimal:  user.Balance.Decimal,
		},
	}
	ret, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
		return
	}

	w.Write(ret)
}

func SetBalance(w http.ResponseWriter, r *http.Request) {
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
	newBalance := money.Money{
		Currency: "USD",
		Whole:    newWhole,
		Decimal:  newDecimal,
	}

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	filter := bson.D{primitive.E{Key: "session", Value: session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "balance", Value: newBalance}}}}
	_, err = userCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	response := GetBalanceResponse{
		Status: 200,
		Balance: money.Money{
			Currency: newBalance.Currency,
			Whole:    newBalance.Whole,
			Decimal:  newBalance.Decimal,
		},
	}
	ret, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
		return
	}

	w.Write(ret)
}
