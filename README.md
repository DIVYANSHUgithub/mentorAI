# eduAI — AI Education Platform

Full-stack learning platform with a React frontend, Gemini-powered AI assistant, and Node.js services for auth and course data.

## Project structure

```
App/
├── client/          # React frontend (port 3000)
├── backend/         # Gemini AI chat API (port 5555)
└── DB_Backend/      # Auth & product API
```

## Quick start

### Frontend

```bash
cd client
npm install
npm start
```

### AI assistant backend

```bash
cd backend
npm install
# Create .env with GEMINI_API_KEY=your_key
node index.js
```

### Database / auth backend

```bash
cd DB_Backend
npm install
node index.js
```

## Features

- User signup, login, and protected routes
- Dashboard with courses, progress, community, and settings
- Batch course catalog with purchase flow
- AI assistant powered by Google Gemini
