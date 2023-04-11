package money

type Money struct {
	Currency Currency `json:"currency" bson:"currency"`
	Whole    int      `json:"whole" bson:"whole"`
	Decimal  int      `json:"decimal" bson:"decimal"`
}

// add x to y
func Add(x, y Money) Money {
	x.Decimal += y.Decimal
	if x.Decimal >= 100 {
		x.Whole++
		x.Decimal -= 100
	}
	x.Whole += y.Whole

	return x
}

// subtract x from y
func Subtract(x, y Money) Money {
	x.Decimal = y.Decimal - x.Decimal
	if x.Decimal < 0 {
		x.Whole++
		x.Decimal += 100
	}
	x.Whole = y.Whole - x.Whole

	return x
}
