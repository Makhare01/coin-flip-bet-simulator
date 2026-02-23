# Coin Flip Bet Simulator

A React application for simulating coin flip betting with statistics tracking. Built with React, TypeScript, Vite, and shadcn/ui.

## Prerequisites

- **Node.js** 18+ (or [Bun](https://bun.sh/) for faster installs)
- **npm**, **yarn**, **pnpm**, or **bun** (package manager)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coin-flip-bet-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or with another package manager:
   ```bash
   bun install   # or: yarn | pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Features

- **User Management** – Username-based login/registration, user persistence in localStorage, logout with confirmation
- **Multi-Cryptocurrency Support** – BTC, ETH, SOL with separate balances (default 1000 each), switchable via tabs
- **Coin Flip Betting** – 50/50 odds, custom bet amount, quick multipliers (½x, 2x), single and auto betting
- **Martingale Strategy** – Doubles bet after losses, resets after wins (auto betting only)
- **Stop Conditions** – Stop win (target profit) and stop loss (loss limit) for auto betting
- **Visual Coin Flip** – Lottie animation, win/loss indicators (green checkmark, red X)
- **Bet History** – Table with user, crypto, amount, result, payout, timestamp; search by username, filter by result, pagination
- **Statistics Dashboard** – Total bets, win/loss ratio, biggest win/loss, profit/loss with color-coded values
- **Persistent Settings** – Bet amount, auto betting, Martingale, stop win/loss, preferred crypto saved across sessions
- **Dark Mode** – Dark theme support
- **Toast Notifications** – Sonner for user feedback

> **Note:** Responsive design is not yet implemented; the app is optimized for desktop use.

## Mock Service

A custom fetch-based mock intercepts `window.fetch` in development and routes requests to handler functions. Handlers are organized by domain:

- **User handlers** – `GET /api/v1/user/info`, `POST /api/v1/user/start-playing`, `DELETE /api/v1/user/logout`, `PATCH /api/v1/user/set-favorite-crypto`
- **Game handlers** – `POST /api/v1/game/flip-coin` (50/50 coin flip, balance updates)
- **Bet history handlers** – `GET /api/v1/history/get-history`, `GET /api/v1/history/statistics`

Unmatched requests pass through to the real network. Data is persisted in localStorage.

## Custom Hooks

- **`useUser`** – Fetches current user info via TanStack Query; exposes `userInfo` and `isLoading`
- **`useBetSimulation`** – Handles bet placement, auto betting loop, Martingale logic, stop win/loss; returns `placeSingleBet`, `isBetting`, `lastResult`, `error`, `lastBetAmount`
- **`useDebounce`** – Debounces a value with configurable delay; supports leading/trailing, `cancel`, and `flush`
- **`useBoolean`** – Toggle state with `setTrue`, `setFalse`, `toggle`, `setValue`; used for dialogs and UI toggles

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – build tool
- **shadcn/ui** – UI components
- **TanStack Query** – data fetching
- **Zustand** – state management
- **Tailwind CSS** – styling
- **Lottie** – animations
