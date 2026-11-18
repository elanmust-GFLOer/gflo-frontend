# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Reputation data: fail-closed (2026-11)

- XP and tier are **never** read from chain in the frontend. They come from the backend's
  `/api/identity/<address>` (canonical PIE v0.2 path). Until v0.2 is deployed the backend
  answers 503 and the dashboard shows "not live yet" instead of numbers.
- The retired Sepolia v3 contracts are refused by `src/lib/web3/canonical-address.js`
  even if an env variable still holds them (PIECore v3 `0x9CF55d…` had a public
  `gainXP()`: anyone could mint XP).
- Env: `VITE_GFLO_BACKEND_URL` (falls back to `VITE_AI_URL`), `VITE_GFLO_TOKEN_ADDRESS`
  (canonical fixed-supply token only; unset → balance hidden, transfers refused).
- Tests: `npm test` (no dependencies).
