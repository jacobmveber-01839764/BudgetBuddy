package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserInfoResponse struct {
	Status int    `json:"status"`
	Name   string `json:"name" bson:"name"`
	Email  string `json:"email" bson:"email"`
}

func UserInfo(w http.ResponseWriter, r *http.Request) {
	// get session key from request
	session := r.Header.Get("x-session-key")

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	found := userCollection.FindOne(r.Context(), bson.D{primitive.E{Key: "session", Value: strings.ToLower(session)}})
	if found.Err() != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "{\"error\":\"session key invalid\"}")
		return
	}

	var user = db.UserSchema{}

	err := found.Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem decoding user\"}")
		return
	}

	info := UserInfoResponse{
		Status: 200,
		Name:   user.Name,
		Email:  user.Email,
	}

	ret, err := json.Marshal(info)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "{\"error\":\"problem marshalling response\"}")
		return
	}

	w.Write(ret)
}
