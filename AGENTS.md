# Repository Guidelines

## Project Structure & Module Organization
- `src/App.jsx` orchestrates the Bingo flow by switching between screens driven by `useBingoGame`.
- UI is in `src/components` and `src/components/game` (card, controls, header, history, progress, result); shared styling lives in `src/styles/variables.css` and `src/index.css`.
- Game state, draw cadence, and prize logic are centralized in `src/hooks/useBingoGame.js`; small helpers/constants live in `src/lib/utils.js` and `src/utils/constants.js`.
- Fonts and other assets sit in `src/assets`; static files are in `public/`; Vite outputs production bundles to `dist/` (generated).

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start the Vite dev server with HMR on localhost.
- `npm run lint` — run ESLint across all JS/JSX; unused variables error unless intentionally capitalized constants.
- `npm run build` — create a production bundle in `dist/`.
- `npm run preview` — serve the built bundle from `dist/` for local verification.
- `npm run deploy` — build then publish `dist/` via `gh-pages` (requires repo access and remote configured).

## Coding Style & Naming Conventions
- JavaScript/JSX with ES modules; prefer functional components and hooks. Match the existing 2-space indentation and semicolon usage.
- Components/files use `PascalCase` (e.g., `GameScreen.jsx`, `StartScreen.jsx`); hooks/utilities use `camelCase`.
- Tailwind CSS is used inline in JSX; shared color tokens (`vl-*`, `bingo-*`) are defined in `src/styles/variables.css` and mirrored in `tailwind.config.js`.
- ESLint config (`eslint.config.js`) extends `@eslint/js`, React Hooks, and React Refresh presets; keep new rules consistent with that base before adding overrides.

## Testing Guidelines
- No automated test suite is configured yet; manually verify flows in `npm run dev`, especially draw timing, history updates, and win/skip outcomes.
- When adding tests, colocate them as `*.test.jsx` under `src/`, prefer React Testing Library with Vitest, and cover edge cases such as repeated clicks, exhausted balls, and prize calculation.

## Commit & Pull Request Guidelines
- Follow the conventional commit style already used (`feat:`, `refactor:`, `chore:`) with imperative, concise summaries.
- Pull requests should include: a short description of the change, UI screenshots/GIFs for visible updates, steps or commands used to verify (lint/build/run), and linked issues or TODOs.
- Keep PRs scoped; avoid committing built `dist/` outputs or noise from `node_modules`.***
