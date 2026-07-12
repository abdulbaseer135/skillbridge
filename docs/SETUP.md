# SkillBridge Setup

## Prerequisites
- Node.js 20+
- npm
- MongoDB Atlas or local MongoDB
- Cloudinary account for image uploads

## Install
1. Install root dependencies:
   ```bash
   npm install
   ```
2. Install frontend and backend dependencies:
   ```bash
   npm install --prefix frontend
   npm install --prefix backend
   ```

## Environment
Create `.env` files from the provided examples:
- `frontend/.env.example`
- `backend/.env.example`

## Run
```bash
npm run dev
```

## Test
```bash
npm test
```
