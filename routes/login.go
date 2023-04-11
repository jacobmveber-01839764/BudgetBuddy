package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
)

type LoginResponse struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Session string `json:"session"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	log.Println("* /auth/login")
	// prepare DB
	err := db.Client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		db.Connect()
	}
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	// var v contains POST credentials
	var v db.UserSchema
	r.ParseForm()
	v.Email = r.FormValue("email")
	v.Password = r.FormValue("password")
	if v.Email == "" || v.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// cmp struct will be compared with v to verify credentials
	var cmp db.UserSchema

	found := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "email", Value: strings.ToLower(v.Email)}})
	if found.Err() != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"account with that email does not exist\"}")
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

	// prepare ReturnedAccount struct to be sent back to the client
	var account LoginResponse
	err = found.Decode(&account)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// set new session cookie for user, either persistent (remember me) or temporary
	sessionID := uuid.NewString()
	var session = &http.Cookie{
		Name:     "session",
		Value:    sessionID,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   0,
	}
	http.SetCookie(w, session)

	// update the new user session in the DB
	filter := bson.D{primitive.E{Key: "email", Value: strings.ToLower(account.Email)}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "session", Value: sessionID}}}}
	userCollection.UpdateOne(context.TODO(), filter, update, opts)

	acc, err := json.Marshal(account)
	if err != nil {
		fmt.Println("Error marshalling bson.D response")
	}
	fmt.Fprint(w, string(acc))
	// fmt.Println("logged in user successfully")
}
