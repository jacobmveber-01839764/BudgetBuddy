package widgets

import (
	"context"

	"github.com/jacobmveber-01839764/BudgetBuddy/db"
	"github.com/jacobmveber-01839764/BudgetBuddy/money"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func addToBalance(user db.UserSchema, amount money.Money) bool {

	newBalance := money.Add(amount, user.Balance)

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	filter := bson.D{primitive.E{Key: "session", Value: user.Session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "balance", Value: newBalance}}}}
	_, err := userCollection.UpdateOne(context.TODO(), filter, update, opts)
	return err == nil
}

func subtractFromBalance(user db.UserSchema, amount money.Money) bool {

	// create money object to store in db
	newBalance := money.Subtract(amount, user.Balance)

	// get collection handle from db
	var userCollection = db.Client.Database("budgetbuddy").Collection("users")

	filter := bson.D{primitive.E{Key: "session", Value: user.Session}}
	opts := options.Update().SetUpsert(true)
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "balance", Value: newBalance}}}}
	_, err := userCollection.UpdateOne(context.TODO(), filter, update, opts)
	return err == nil
}
