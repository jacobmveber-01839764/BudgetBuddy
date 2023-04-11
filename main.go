package main

import (
	"context"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
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

	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Post("/auth/login", routes.Login)
	r.Post("/auth/login/session", routes.Login)
	r.Post("/auth/createaccount", routes.CreateAccount)
	r.Get("/userinfo", routes.UserInfo)

	r.Mount("/w", widgets.Router())

	log.Println("* Listening on " + _PORT)
	log.Fatal(http.ListenAndServe(_PORT, r))
}
