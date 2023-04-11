# Auth (/auth) router
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
## GET /userinfo
Headers: x-session-key

Response:
```json
{
    "name": string,
    "email": string,
}
```

# Widget (/w) router
**IMPORTANT!** All requests for the widget router require the x-session-key header be set
to the user's current session token.
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
  "budget": {
    "currency": string,
    "whole": int,
    "decimal": int,
  },
  "budget_categories": {
    "category": {
        "currency": string,
        "whole": int,
        "decimal": int,
    },
    ...
  },
  "categories": [ string ],
  "expenses": {
    "category": [
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
