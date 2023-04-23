# General
## GET /userinfo
Headers: x-session-key

Response:
```json
{
    "name": string,
    "email": string,
}
```

# Auth (/auth) router
Prepend all request under the auth router with '/auth'

e.g. `/auth/login`
## POST /login
Form: email (string), password (string)

Response:
```json
{
    "name": string,
    "email": string,
    "session": string,
}
```
## POST /createaccount
Form: name (string), email (string), password (string)

Response:
```json
{
    "name": string,
    "email": string,
    "session": string,
}
```
## POST /deleteaccount
Form: password (string)

Requires x-session-key

Response:
```json
{
    "status": int,
}
```
## POST /changename
Form: name (string)

Requires x-session-key

Response:
```json
{
    "status": int,
}
```
## POST /changepassword
Form: old (string), new (string)

Requires x-session-key

Response:
```json
{
    "status": int,
}
```

# Widget (/w) router
**IMPORTANT!** All requests for the widget router require the x-session-key header be set
to the user's current session token.


Prepend all request under the widget router with '/w'

e.g. `/w/balance`
## GET /balance
Return the current balance of the account

Response:
```json
{
    "status": int,
    "balance": {
        "currency": string,
        "whole": int,
        "decimal": int,
    }
}
```
## POST /balance
Set the current balance to a value
Form: currency (string), whole (int), decimal (int)

Response:
```json
{
    "status": int,
    "balance": {
        "currency": string,
        "whole": int,
        "decimal": int,
    }
}
```
## GET /transactions/recent
Get the most recent 10 transactions

Response:
```json
{
    "status": int,
    "transactions": [
        {
            "timestamp": unix,
            "category": string,
            "amount": {
                "currency": string,
                "whole": int,
                "decimal": int,
            },
            "type": expenses/income
        },
        ...
    ]
}
```
## POST /transactions
Add a new transaction, either "income" or "expense"

Form: category (string), currency (string), whole (int), decimal (int), type (expenses/income)

Response: 
```json
{
    "status": int
}
```
## POST /transactions/recurring
Add a recurring transaction (bill, paycheck, etc)

Form: category (string), currency (string), whole (int), decimal (int), type (expenses/income), period (in days)(int)

Response: 
```json
{
    "status": int
}
```
## GET /budget
Get current budget information including total and catagorized budget, as well
as total expenses in each budget category

Response: 
```json
{
  "status": int,
  // total monthly budget
  "budget": {
    "currency": string,
    "whole": int,
    "decimal": int,
  },
  // budgets for each category
  "budget_categories": {
    "example_category": {
        "currency": string,
        "whole": int,
        "decimal": int,
    },
    ...
  },
  // an array of all defined categories
  "categories": [ string ],
  // month expense totals by category
  "expenses_by_category": {
    "example_category": {
      "currency": string,
      "whole": int,
      "decimal": int
    },
    ...
  }
  // list of all expenses by category
  "expenses": {
    "example_category": [
      {
        "timestamp": unix,
        "category": string,
        "amount": {
          "currency": string,
          "whole": int,
          "decimal": int
        },
        "type": expenses/income
      },
      ...
    ]
  }
}

```
## POST /budget
Set a new total budget

Form: currency (string), whole (int), decimal (int)

Response:
```json
{
    "status": int
}
```
## POST /budget/categories
Set a budget for a specific category

Form: currency (string), whole (int), decimal (int), category (string)

Response:
```json
{
    "status": int
}
```
## GET /expenses/month
Get the total amount of expenses in the last month

Response:
```json
{
  "currency": string,
  "whole": int,
  "decimal": int,
}
```
## GET /income/month
Get the total amount of income in the last month

Response:
```json
{
  "currency": string,
  "whole": int,
  "decimal": int,
}
```
## GET /income
Get the total amount of income in each category

Response:
```json
{
  "status": int,
  "income_by_category": {
    "example_category": {
      "currency": string,
      "whole": int,
      "decimal": int,
    },
    ...
  }
}
```
