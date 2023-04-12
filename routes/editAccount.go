package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
)

func ChangePassword(w http.ResponseWriter, r *http.Request) {
	log.Println("* /auth/changepassword")
	// get session key from request
	session := r.Header.Get("x-session-key")
	// prepare DB
	err := db.Client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		db.Connect()
	}
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	// var v contains POST credentials
	r.ParseForm()
	newpass := r.FormValue("new")
	oldpass := r.FormValue("old")
	if newpass == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"password must be provided\"}")
		return
	}

	// cmp struct will be compared with v to verify credentials
	var cmp db.UserSchema
	found := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "session", Value: session}})
	if found.Err() != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}
	err = found.Decode(&cmp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(cmp.Password), []byte(oldpass))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid password\"}")
		return
	}

	if len(newpass) < 8 || len(newpass) > 255 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "{\"error\":\"password must be 8 characters or greater\"}")
		return
	}

	// hash and store the user's hashed password
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(newpass), 8)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"internal server error, please try again later\"}")
	}

	filter := bson.D{primitive.E{Key: "session", Value: session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "password", Value: string(hashedPass)}}}}
	_, err = userCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	w.Write([]byte("{\"status\": 200}"))

}

func ChangeName(w http.ResponseWriter, r *http.Request) {
	log.Println("* /auth/changename")
	// get session key from request
	session := r.Header.Get("x-session-key")

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	r.ParseForm()

	if r.FormValue("name") == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "{\"error\":\"name cannot be blank\"}")
		return
	}

	found := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "session", Value: session}})
	if found.Err() != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	filter := bson.D{primitive.E{Key: "session", Value: session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "name", Value: r.FormValue("name")}}}}
	_, err := userCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"invalid session key\"}")
		return
	}

	w.Write([]byte("{\"status\": 200}"))
}
