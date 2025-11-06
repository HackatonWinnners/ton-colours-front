## Purpose

Provide concise, actionable guidance to AI coding agents working on this repository (a Vite + React TypeScript Telegram Mini App integrating TON Connect).

## Big-picture architecture

- Entry: `src/index.tsx` — retrieves Telegram launch params and calls `init()` (in `src/init.ts`) before rendering `Root`.
- Initialization: `src/init.ts` — configures `@tma.js/sdk-react` features (theme, viewport, miniApp, backButton) and optional dev helpers (eruda).
- Root composition: `src/components/Root.tsx` — wraps the app in `TonConnectUIProvider` (uses `publicUrl('tonconnect-manifest.json')`) and `ErrorBoundary`.
- Routing: `src/components/App.tsx` — uses `HashRouter` and maps `routes` from `src/navigation/routes.tsx` (add routes there).

Design rationale: the app targets Telegram Mini Apps (TMA) and the desktop/mobile quirks are handled centrally in `init.ts` and the dev mock `src/mockEnv.ts`. Keep changes small and component-local; platform-specific behavior is implemented via the TMA SDK signals.

## Key developer workflows & commands

- Local dev: `pnpm dev` (or `npm run dev`) — starts Vite. `dev:https` enables mkcert-backed HTTPS (requires admin on first run).
- Build: `pnpm build` — runs `tsc --noEmit` then `vite build`. The `tsc` step enforces type checks before bundling.
- Preview: `pnpm preview` — serves the production build locally.
- Deploy: `pnpm deploy` — publishes `dist` to GitHub Pages via `gh-pages`.
- Lint: `pnpm lint` and auto-fix with `pnpm lint:fix`.

Important: `build` will fail fast on TypeScript errors because of `tsc --noEmit` in the script. Use the `lint` scripts to keep code style consistent.

## Project-specific conventions and patterns

- Path alias: imports use `@/` mapped to `src/` (see `tsconfig.json`). Prefer `@/...` for project files.
- Router: the app uses `HashRouter` — assume hash-based navigation when adding links or testing routes.
- Environment mocking: `src/mockEnv.ts` is only active in dev (`import.meta.env.DEV`) and uses `@tma.js/sdk-react` to simulate Telegram events. Do not remove it — it’s intentionally tree-shaken out of production builds.
- Telegram SDK usage: most app-level behavior (theme, safe area, viewport, init data) is centralized in `src/init.ts` via `@tma.js/sdk-react`. If you need to change how events are handled, prefer extending `init.ts` rather than sprinkling SDK calls across components.
- TON Connect: `src/components/Root.tsx` wraps the app with `TonConnectUIProvider` using `publicUrl('tonconnect-manifest.json')` — update the manifest in `public/tonconnect-manifest.json` when changing dApp metadata.

## Integration points & cross-component communication

- Telegram mini-app events and data: `retrieveLaunchParams()` is used at startup (in `src/index.tsx`) and the SDK's `useSignal`, `initData`, `themeParams`, `viewport`, `miniApp` utilities are used throughout components.
- Global UI/provider: Error boundary is `src/components/ErrorBoundary.tsx`; TonConnect UI provider in `Root` is required for TON Connect pages.
- Routes: `src/navigation/routes.tsx` exports the route list; each entry uses a `Component` reference (not JSX) — add entries there to register new pages.

## Small examples (do these to follow repo conventions)

- Add a new route: edit `src/navigation/routes.tsx`, append

- Use TMA signals in a component: import `useSignal` and `miniApp` from `@tma.js/sdk-react` to react to theme or dark-mode changes (see `src/components/App.tsx`).

## Debugging notes

- To reproduce Telegram-specific bugs locally, run `pnpm dev` and rely on `src/mockEnv.ts` to simulate launch params. For platform-specific bugs (macOS Telegram), `init.ts` includes conditional mocking via `mockTelegramEnv` when `mockForMacOS` is enabled.
- For quick runtime inspection on mobile devices, `init.ts` supports dynamically loading `eruda` when `debug` is true.

## Files to consult first (quick reference)

- `src/index.tsx` — startup sequence and `init()` call
- `src/init.ts` — platform & SDK wiring (theme, viewport, miniApp)
- `src/mockEnv.ts` — dev-only Telegram environment mocks
- `src/components/Root.tsx` — TonConnect provider + ErrorBoundary
- `src/components/App.tsx` + `src/navigation/routes.tsx` — routing and AppRoot usage
- `public/tonconnect-manifest.json` — TON Connect manifest referenced by the provider
- `vite.config.ts` & `package.json` — dev/build scripts and mkcert/HTTPS notes

## What not to assume

- There are no server-side components in this repo — all behavior is client-side. Do not add server assumptions.
- `mockEnv.ts` runs only in dev; tests or CI should not rely on it being present in production builds.

---

If any section is unclear or you'd like more details (examples for adding a page, testing routes, or editing the TON manifest), tell me which part and I will expand with concrete, small edits/examples.
