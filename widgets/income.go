package widgets

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetMonthIncome(w http.ResponseWriter, r *http.Request) {
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

	if user.Income == nil {
		user.Income = make([]db.Transaction, 0)
	}

	total := money.Money{}
	total.Currency = user.Balance.Currency

	for i := 0; i < len(user.Income); i++ {
		// stop if/when we get past a month ago
		if user.Income[i].Timestamp < time.Now().Add(-30*24*time.Hour).Unix() {
			break
		}
		total = money.Add(total, user.Income[i].Amount)
	}

	ret, err := json.Marshal(total)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
		return
	}

	w.Write(ret)
}
