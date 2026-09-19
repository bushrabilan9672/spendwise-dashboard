/* =============================================
   SPENDWISE — JavaScript Foundation
   Week 6: Variables, Input, Calculations, Functions
   ============================================= */

// =============================================
// 1. APPLICATION DATA (Variables)
// =============================================
// These represent the core budgeting information.
// `let` is used for values that may change (like totals).
// `const` is used for values that shouldn't be reassigned.

const APP_NAME = "SpendWise";
const CURRENCY = "$";

// Starting budget data (defaults)
let monthlyBudget = 5000;
let totalExpenses = 0;

// Categories we track (an array — a list of values)
const categories = ["Food", "Transport", "Rent", "Entertainment", "Savings", "Utilities"];

// =============================================
// 2. CALCULATION FUNCTIONS
// =============================================
// These functions keep logic organised and reusable.

/**
 * Calculates the remaining balance.
 * @param {number} budget - Total budget
 * @param {number} expenses - Total expenses
 * @returns {number} remaining balance
 */
function calculateBalance(budget, expenses) {
    return budget - expenses;
}

/**
 * Calculates what percentage of the budget has been spent.
 * @param {number} budget - Total budget
 * @param {number} expenses - Total expenses
 * @returns {number} percent spent (rounded to 1 decimal)
 */
function calculateSpentPercent(budget, expenses) {
    if (budget === 0) return 0;   // avoid divide by zero
    const percent = (expenses / budget) * 100;
    return Math.round(percent * 10) / 10;
}

/**
 * Formats a number as currency (e.g. 1234.5 → "$1,234.50")
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
    return CURRENCY + amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Builds a full budget summary object from budget + expenses.
 * @param {number} budget
 * @param {number} expenses
 * @returns {object} summary
 */
function buildSummary(budget, expenses) {
    const balance = calculateBalance(budget, expenses);
    const percent = calculateSpentPercent(budget, expenses);

    return {
        budget: budget,
        expenses: expenses,
        balance: balance,
        percentSpent: percent,
        status: balance >= 0 ? "On track" : "Over budget"
    };
}

/**
 * Prints a nicely formatted summary to the console.
 * @param {object} summary
 */
function printSummary(summary) {
    console.log("================================");
    console.log(`  ${APP_NAME} — Budget Summary`);
    console.log("================================");
    console.log(`Budget:         ${formatCurrency(summary.budget)}`);
    console.log(`Expenses:       ${formatCurrency(summary.expenses)}`);
    console.log(`Remaining:      ${formatCurrency(summary.balance)}`);
    console.log(`Spent:          ${summary.percentSpent}%`);
    console.log(`Status:         ${summary.status}`);
    console.log("================================");
}

// =============================================
// 3. USER INPUT (prompts)
// =============================================
// Prompt the user for budget information.
// prompt() returns a STRING, so we convert with Number().

function askForBudget() {
    const input = prompt("Enter your monthly budget:", "5000");
    const value = Number(input);

    // Validate: must be a positive number
    if (isNaN(value) || value <= 0) {
        console.warn("Invalid budget. Using default of 5000.");
        return 5000;
    }
    return value;
}

function askForExpenses() {
    const input = prompt("Enter your total expenses so far:", "2500");
    const value = Number(input);

    // Validate: must be a number >= 0
    if (isNaN(value) || value < 0) {
        console.warn("Invalid expenses. Using default of 0.");
        return 0;
    }
    return value;
}

// =============================================
// 4. MAIN FLOW
// =============================================
// This runs when the page loads.

function main() {
    console.log(`Welcome to ${APP_NAME}!`);

    // Ask the user for their data
    monthlyBudget = askForBudget();
    totalExpenses = askForExpenses();

    // Build the summary object
    const summary = buildSummary(monthlyBudget, totalExpenses);

    // Print it to the console
    printSummary(summary);

    console.log("Tracked categories:", categories.join(", "));
}

// Run the app
main();
