package main

import (
	"context"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/routes"
	"github.com/jacobmveber-01839764/BudgetBuddy/widgets"
)

// TODO: expire transactions after one month on login
// TODO: perform recurring transactions on login
// TODO: give transactions ids so you can delete them

const (
	_PORT = ":3030"
)

func main() {

	r := chi.NewRouter()

	// disconnect to DB on application exit
	defer db.Client.Disconnect(context.Background())

	r.Post("/auth/login", routes.Login)
	r.Post("/auth/login/session", routes.Login)
	r.Post("/auth/createaccount", routes.CreateAccount)
	r.Get("/userinfo", routes.UserInfo)

	r.Mount("/w", widgets.Router())

	log.Println("* Listening on " + _PORT)
	log.Fatal(http.ListenAndServe(_PORT, r))
}
