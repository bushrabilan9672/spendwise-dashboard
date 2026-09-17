# SpendWise Dashboard Shell

A responsive dashboard layout built with modern CSS techniques — CSS Grid, Flexbox, custom properties, and micro-interactions. This is the foundation of the SpendWise capstone project.

## What It Does

The dashboard shows:
- A **sidebar** with brand logo and navigation links
- A **header** with a greeting, notification button, and user avatar
- A **summary row** with three key stats (balance, spend, savings goal)
- Six **category cards** displaying static financial data (Food, Transport, Rent, Entertainment, Savings, Utilities)

## How to Run

Open `index.html` in any modern browser — no build step, no dependencies.

For the responsive layout, use the browser's DevTools Device Toolbar (Ctrl + Shift + M in Chrome/Firefox) and set the viewport to under 768px.

## Layout Techniques

- **CSS Grid** for the overall page: `grid-template-columns: 240px 1fr`
- **CSS Grid** for the card section: `repeat(auto-fit, minmax(200px, 1fr))`
- **Flexbox** for the sidebar, nav, header, summary row, and inside each card
- **No absolute positioning** used anywhere in the layout

## Theme

All colors, spacing, and shadows are defined as CSS custom properties on `:root`:
- `--brand` — teal brand color
- `--accent` — amber accent
- `--bg`, `--surface`, `--surface-alt` — background layers
- `--text`, `--text-secondary` — text colors
- Plus borders, radii, and shadows

## Responsive Design

Below 768px:
- The sidebar collapses to a horizontal top bar
- The dashboard becomes a single-column layout
- The header stacks vertically
- Summary cards stack

## Micro-interactions

Cards lift on **hover** and **keyboard focus** (`:focus-visible`) with:
- `transform: translateY(-4px)`
- `box-shadow` deepening
- Border color changing to brand

All transitions last **200ms** — within the required 250ms limit.

## Dark Theme (Stretch Goal)

A dark theme is applied automatically when the user's OS is set to dark mode, using:

```css
@media (prefers-color-scheme: dark) {
    :root { /* variable overrides only */ }
}
