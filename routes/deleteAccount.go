package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
)

func DeleteAccount(w http.ResponseWriter, r *http.Request) {
	log.Println("* /auth/deleteaccount")
	// get session key from request
	session := r.Header.Get("x-session-key")
	// prepare DB
	err := db.Client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		db.Connect()
	}
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	// var v contains POST credentials
	var v db.UserSchema
	r.ParseForm()
	v.Password = r.FormValue("password")
	if v.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"password must be provided\"}")
		return
	}

	// cmp struct will be compared with v to verify credentials
	var cmp db.UserSchema
	found := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "session", Value: session}})
	if found.Err() != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"session key invalid\"}")
		return
	}
	err = found.Decode(&cmp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(cmp.Password), []byte(v.Password))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid password\"}")
		return
	}

	_, err = userCollection.DeleteOne(context.TODO(), bson.D{primitive.E{Key: "session", Value: session}})

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"unable to delete account\"}")
		return
	}
	w.Write([]byte("{\"status\": 200}"))
}
