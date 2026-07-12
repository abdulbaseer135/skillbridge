# SkillBridge

SkillBridge is a local skill-exchange platform where users create profiles, publish offers and requests, find nearby matches, chat in real time, and manage listings.

## Features
- JWT authentication with secure cookies
- User profiles with approximate location and matching radius
- Offer/request listings
- Search and filter listings
- Basic match suggestions by category and distance
- Socket.io chat with conversation persistence
- Reporting and reviewing workflows

## Repository structure
- `frontend/` — Vite + React + Tailwind client
- `backend/` — Node.js + Express + MongoDB API
- `docs/` — API docs and setup guides
- `.github/workflows/ci.yml` — CI for frontend and backend tests

## Quick start
1. Install dependencies:
   ```bash
   npm install
   npm install --prefix frontend
   npm install --prefix backend
   ```
2. Create `.env` files from examples in `frontend` and `backend`.
3. Run both services:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173`

## Scripts
- `npm run dev` — start frontend and backend concurrently
- `npm run client` — start frontend only
- `npm run server` — start backend only
- `npm test` — run backend and frontend tests
