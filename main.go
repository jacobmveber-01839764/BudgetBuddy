package main

import (
	"context"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/routes"
)

func main() {

	r := chi.NewRouter()

	// disconnect to DB on application exit
	defer db.Client.Disconnect(context.Background())

	r.Post("/auth/login", routes.Login)
	r.Post("/auth/login/session", routes.Login)
	r.Post("/auth/createaccount", routes.CreateAccount)

	log.Fatal(http.ListenAndServe(":3030", r))
}
