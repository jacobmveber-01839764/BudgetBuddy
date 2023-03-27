package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"strings"

	"github.com/google/uuid"
	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
)

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	// prepare DB
	err := db.Client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		db.Connect()
	}
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	// var v contains POST credentials
	var v Credentials
	r.ParseForm()
	v.Email = r.FormValue("email")
	v.Password = r.FormValue("password")
	if v.Email == "" || v.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if len(v.Password) < 8 || len(v.Password) > 255 || !EmailIsValid(v.Email) {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "{\"error\":\"there was a problem with your request. Please try again with different values\"}")
		return
	}

	// search if user with that username already exists
	find := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "email", Value: strings.ToLower(v.Email)}})
	if find.Err() == nil {
		w.WriteHeader(http.StatusConflict)
		fmt.Fprint(w, "{\"error\":\"user already exists with that email\"}")
		return
	}

	// create a new session for the new user
	sessionID := uuid.NewString()
	session := &http.Cookie{
		Name:     "session",
		Value:    sessionID,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   0,
	}
	http.SetCookie(w, session)

	// hash and store the user's hashed password
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(v.Password), 8)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"internal server error, please try again later\"}")
	}

	// add the new user to the database
	v.Session = sessionID
	v.Password = string(hashedPass)
	_, err = userCollection.InsertOne(r.Context(), v)
	if err != nil {
		log.Println("* Error inserting new user")
	}

	// return the account information to the user
	ret, err := json.Marshal(LoginResponse{
		Email:   v.Email,
		Session: v.Session,
	})
	if err != nil {
		fmt.Println("* Error marshalling bson.D response")
	}
	fmt.Fprint(w, string(ret))
}

func EmailIsValid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
