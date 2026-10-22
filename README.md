# Cyanova Dashboard

React 19 + Vite 7 + Tailwind CSS 4 dashboard demo, with 28 routes for analytics, inventory, customers, profile, forms, tables and component examples.

## Run locally

Use a Node version supported by Vite 7 (this review was validated with Node 24.2).

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

`npm test` renders all route pages in light/dark states and checks navigation targets, validation, chart-gradient resizing and safe profile storage/links. It does not simulate browser interaction.

## Browser verification

`scripts/browser-review.cjs` uses Playwright with an installed Microsoft Edge. It opens a temporary browser profile, checks all routes at 1440px/light and 390px/dark, then tests sidebar Escape, search, Profile persistence, table pagination/filtering, products and customers. Start Vite first, supply `REVIEW_URL` if not using port 5174, and run the script. Set `PLAYWRIGHT_MODULE` to an existing Playwright module path when it is not installed in this project. This optional tool is not a runtime dependency.

Generated screenshots are in `review-artifacts/`.

## Demo behavior

- Authentication, payments, email and server persistence are not connected. Forms validate sample input without creating accounts or sending information.
- Profile, theme and general preferences are stored in this browser. Settings and Profile are separate demo examples.
- CRM, inventory and table/project edits are in-memory samples and reset when leaving the page or reloading.
- Passwords are never written to browser storage or logged.
- Chart data is deterministic sample data, not live reporting.

## Structure

- `src/navigation.js`: common menu/search destinations.
- `src/layouts/DefaultLayout.jsx`: responsive navigation, mobile focus management and content scroll container.
- `src/App.jsx`: lazy route loading.
- `src/pages/forms/FormUI.jsx` and `formStyles.js`: shared fields, validation and feedback styles.
- `src/pages/charts/chartUtils.js`: layout-aware gradients and responsive legends.

See `CODE_REVIEW.md` for findings, changes, verification and remaining work. This project is a frontend demo, not a production account or business data system.
