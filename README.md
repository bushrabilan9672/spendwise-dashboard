# SpendWise — Interactive Budget Tracker

A responsive budgeting dashboard built with HTML, CSS, and JavaScript. Users can set a monthly budget, add expenses, and watch the dashboard update in real time.

## What Changed This Week

In previous weeks, SpendWise was a static dashboard with hard-coded numbers. This week it became **interactive**:

- Added a form for entering expenses (name, amount, category)
- Added a **live expense list** rendered from an array
- Connected the summary cards and category cards to real calculations
- Attached **event listeners** so user actions update the page instantly
- Removed hard-coded numbers from the HTML — everything is computed by JavaScript

## How Conditionals Are Used

Conditionals appear in several places:

- **Validating form input** — if the name is empty or the amount isn't a positive number, show an alert and stop
- **Choosing the balance status** — `if (balance < 0)` → "Over budget", `else if` low balance, `else` → "On track"
- **Handling the empty state** — `if (expenses.length === 0)` shows "No expenses yet"
- **Filtering by category** — `if (expenses[i].category === category)` in `calculateCategoryTotal()`
- **Guarding against divide by zero** — `if (monthlyBudget === 0) return 0`

## How Arrays Are Used

The core data structure is an array of **expense objects**:

```js
let expenses = [
    { name: "Lunch", amount: 250, category: "Food" },
    { name: "Bus",   amount: 50,  category: "Transport" }
];


