# TON Colours

TON Colours is a Telegram Mini App that lets users mint a unique colour on TON. When you mint a colour, you also get a matching sticker pack and emoji pack in the same colour.

## Features

- Mint a colour on TON and receive a matching sticker and emoji pack.
- Hex colour input with a custom colour picker.
- TON Connect wallet integration (connect, send transactions).
- Profile page shows your owned colours; graceful placeholders when the wallet is not connected or you have none yet.
- External links to GetGems prompt for confirmation before opening.
- Optimized for Telegram Mini Apps: orientation lock, disabled vertical swipes, safe-area insets.
- Search and Menu sections are currently under development (placeholders).

## Tech Stack

- React, TypeScript, Vite
- Telegram UI: `@telegram-apps/telegram-ui`
- Telegram Mini Apps SDK: `@tma.js/sdk-react`
- TON Connect: `@tonconnect/ui-react`
- Package manager: `pnpm`
- Deployment: Docker, Nginx, Certbot

## Getting Started

Prerequisites:

- Node.js 18+ (or newer)
- `pnpm` installed globally

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview a production build locally:

```bash
pnpm preview
# Opens at http://localhost:4173/
```

## Telegram Mini App Integration

- Orientation and swipe handling are configured in `src/init.ts` using Telegram WebApp APIs.
- The app uses safe-area insets and Telegram UI components to match platform appearance.
- Debug utilities are enabled automatically in development, and optionally when the Telegram start parameter contains `debug`.

## Wallet and Mint Flow

- Wallet is connected via TON Connect (`TonConnectButton`, `useTonWallet`).
- Mint action sends a transaction produced by the backend endpoint `/api/mint-intent`.
- After successful mint, the colour is stored in local storage under the key `colors:<address>` and shown on the Profile page.

## Routing

- `/` — Home (colour picker, mint button, informational message)
- `/profile` — Profile (wallet connect button, avatar, owned colours, placeholders)
- `/ton-connect` — TON Connect information
- `/init-data` — Telegram launch/init data
- `/launch-params` — Search section (placeholder)
- `/theme-params` — Menu section (placeholder)

## Deployment

This repository includes a production-ready container setup.

- `Dockerfile` builds static assets and serves them via Nginx.
- `docker-compose.yml` runs the app container, an Nginx proxy, and Certbot for automatic certificate renewal.
- Nginx configuration files: `nginx.conf` and `nginx-proxy.conf`.
- TLS assets are managed under `certbot/conf`.

Basic deploy (example):

```bash
docker-compose up -d --build
```

Useful commands:

```bash
docker-compose logs -f
docker-compose restart
docker-compose down
docker-compose up -d --build
```

## Configuration

- TON Connect manifest: `public/tonconnect-manifest.json`
- If you provide a backend for `/api/mint-intent`, ensure it returns a valid transaction object for TON Connect.

## Acknowledgements

- Telegram Mini Apps SDK: https://docs.telegram-mini-apps.com/
- Telegram UI: https://github.com/Telegram-Mini-Apps/TelegramUI
- TON Connect: https://github.com/ton-connect