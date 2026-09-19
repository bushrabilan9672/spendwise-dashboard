# SpendWise — Personal Budget Tracker

A responsive dashboard for tracking personal spending, built with HTML, CSS, and JavaScript. The project will grow over time into a full budgeting application.

## What SpendWise Does

SpendWise helps users track a monthly budget and expenses. The dashboard displays a summary of their financial situation — remaining balance, percent spent, and overall status — along with category cards for Food, Transport, Rent, Entertainment, Savings, and Utilities.

## Project Structure

- `index.html` — the dashboard layout
- `style.css` — all styling, theming, and responsive rules
- `script.js` — JavaScript logic for data, input, and calculations
- `screenshots/` — screenshots of the dashboard and console output
- `README.md` — this file

## JavaScript Concepts Implemented

### Variables
- **`const`** is used for values that shouldn't change: `APP_NAME`, `CURRENCY`, `categories`
- **`let`** is used for values that change: `monthlyBudget`, `totalExpenses`

### Data Types
- **String** — `"SpendWise"`, `"$"`
- **Number** — `5000`, `2500`
- **Array** — `["Food", "Transport", ...]`
- **Object** — the summary object returned by `buildSummary()`

### User Input
- **`prompt()`** asks the user for their budget and expenses
- Since `prompt()` returns a **string**, the input is converted with **`Number()`**
- Invalid input is checked with **`isNaN()`** and falls back to a sensible default

### Calculations
- **Remaining balance** = `budget - expenses`
- **Percent spent** = `(expenses / budget) * 100`, rounded to 1 decimal
- **Currency formatting** using `toLocaleString()` for thousands separators and 2 decimals
- **Status** determined with a conditional: `balance >= 0 ? "On track" : "Over budget"`

### Functions
Functions organize the code into small, focused pieces:
- **`calculateBalance(budget, expenses)`** — returns the remaining balance
- **`calculateSpentPercent(budget, expenses)`** — returns the percent spent
- **`formatCurrency(amount)`** — returns a formatted currency string
- **`buildSummary(budget, expenses)`** — builds an object with all key figures
- **`printSummary(summary)`** — prints the summary to the console
- **`askForBudget()` / `askForExpenses()`** — collect and validate user input
- **`main()`** — runs the whole flow

Each function does **one job** and can be reused or tested independently.

## How to Run

1. Open `index.html` in a browser (or use Live Server at `127.0.0.1:5500`)
2. Enter your budget when prompted
3. Enter your expenses when prompted
4. Open the browser's DevTools (`F12`) and view the **Console** tab to see the calculated summary

## Coming Next

Future weeks will connect this JavaScript logic to the dashboard UI — replacing static numbers with live, calculated values.