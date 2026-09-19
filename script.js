/* =============================================
   SPENDWISE — Interactive Dashboard
   Week 6: Conditionals, Arrays, Loops, DOM, Events
   ============================================= */

// =============================================
// 1. APPLICATION DATA
// =============================================

const APP_NAME = "SpendWise";
const CURRENCY = "$";

// Starting budget (user can override via prompt)
let monthlyBudget = 5000;

// The main data store — an array of expense objects
// Each expense: { name: "Lunch", amount: 250, category: "Food" }
let expenses = [];

// =============================================
// 2. CALCULATION FUNCTIONS
// =============================================

/**
 * Calculate total spent across all expenses.
 * Uses a loop to sum the amounts.
 */
function calculateTotalSpent() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    return total;
}

/**
 * Calculate remaining balance.
 */
function calculateBalance() {
    return monthlyBudget - calculateTotalSpent();
}

/**
 * Calculate what percent of the budget has been spent.
 */
function calculateSpentPercent() {
    if (monthlyBudget === 0) return 0;
    const percent = (calculateTotalSpent() / monthlyBudget) * 100;
    return Math.round(percent * 10) / 10;
}

/**
 * Get total spent in a specific category.
 * Uses a loop + conditional to filter by category.
 */
function calculateCategoryTotal(category) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            total = total + expenses[i].amount;
        }
    }
    return total;
}

/**
 * Get the status based on the balance.
 * Uses conditionals to decide which message applies.
 */
function getBalanceStatus(balance) {
    if (balance < 0) {
        return { text: "Over budget", className: "down" };
    } else if (balance < monthlyBudget * 0.2) {
        return { text: "Low balance", className: "down" };
    } else {
        return { text: "On track", className: "up" };
    }
}

/**
 * Format a number as currency.
 */
function formatCurrency(amount) {
    return CURRENCY + amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// =============================================
// 3. DOM UPDATE FUNCTIONS
// =============================================

/**
 * Update the summary cards (balance, spend, budget).
 */
function updateSummary() {
    const balance = calculateBalance();
    const spent = calculateTotalSpent();
    const percent = calculateSpentPercent();

    document.getElementById("total-balance").textContent = formatCurrency(balance);
    document.getElementById("total-spend").textContent = formatCurrency(spent);
    document.getElementById("monthly-budget").textContent = formatCurrency(monthlyBudget);
    document.getElementById("spend-percent").textContent = percent + "% of budget";

    const status = getBalanceStatus(balance);
    const statusEl = document.getElementById("balance-status");
    statusEl.textContent = status.text;
    statusEl.className = "summary-change " + status.className;
}

/**
 * Update each category card with its total spent.
 * Uses a loop to walk every category card in the DOM.
 */
function updateCategoryCards() {
    const cards = document.querySelectorAll("[data-category]");

    for (let i = 0; i < cards.length; i++) {
        const category = cards[i].dataset.category;
        const total = calculateCategoryTotal(category);
        cards[i].textContent = formatCurrency(total);

        // Update the meta line: "X% of monthly budget"
        const metaEl = document.querySelector(`[data-category-meta="${category}"]`);
        if (metaEl) {
            const percent = monthlyBudget === 0 ? 0 : Math.round((total / monthlyBudget) * 100);
            metaEl.textContent = percent + "% of monthly budget";
        }
    }
}

/**
 * Render the expense list in the DOM.
 * Uses a loop to build list items.
 */
function updateExpenseList() {
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    // Conditional: show empty message if no expenses
    if (expenses.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No expenses yet. Add one above.";
        list.appendChild(empty);
        return;
    }

    // Loop through expenses and add each to the list
    for (let i = 0; i < expenses.length; i++) {
        const exp = expenses[i];
        const li = document.createElement("li");
        li.className = "expense-item";
        li.innerHTML = `
            <span class="expense-name">${exp.name}</span>
            <span class="expense-category">${exp.category}</span>
            <span class="expense-amount">${formatCurrency(exp.amount)}</span>
        `;
        list.appendChild(li);
    }
}

/**
 * Master update — refresh every part of the UI.
 */
function updateDashboard() {
    updateSummary();
    updateCategoryCards();
    updateExpenseList();
}

// =============================================
// 4. EVENT HANDLERS
// =============================================

/**
 * Handle form submission — add a new expense.
 * Uses preventDefault to stop page reload.
 */
function handleAddExpense(event) {
    event.preventDefault();

    // Read the input values
    const nameInput = document.getElementById("expense-name");
    const amountInput = document.getElementById("expense-amount");
    const categoryInput = document.getElementById("expense-category");

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    // Validate — conditionals catch bad input
    if (name === "") {
        alert("Please enter an expense name.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than 0.");
        return;
    }

    // Build the expense object and push into the array
    const expense = { name: name, amount: amount, category: category };
    expenses.push(expense);

    // Reset the form for the next entry
    amountInput.value = "";
    nameInput.value = "";
    nameInput.focus();

    // Refresh the dashboard
    updateDashboard();

    console.log(`Added expense: ${name} — ${formatCurrency(amount)} (${category})`);
}

// =============================================
// 5. INITIALISE
// =============================================

function init() {
    console.log(`Welcome to ${APP_NAME}!`);

    // Ask for the monthly budget (single prompt on load)
    const input = prompt("Enter your monthly budget:", monthlyBudget);
    const parsed = Number(input);
    if (!isNaN(parsed) && parsed > 0) {
        monthlyBudget = parsed;
    } else {
        console.log(`Using default budget: ${formatCurrency(monthlyBudget)}`);
    }

    // Attach event listener to the form
    const form = document.getElementById("expense-form");
    form.addEventListener("submit", handleAddExpense);

    // Initial render
    updateDashboard();
}

// Run when the DOM is ready
document.addEventListener("DOMContentLoaded", init);