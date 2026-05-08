# Todo Fullstack

A fullstack todo app with a React frontend and FastAPI backend.

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Axios
- Backend: Python, FastAPI, Uvicorn

## Features

- Add, complete, and delete todos
- Filter by all / active / completed
- Frontend talks to backend via REST API
- CORS configured for local development

## Getting Started

### Backend

```bash
cd todo-api
source .venv/bin/activate
uvicorn main:app --reload
```

### Frontend

```bash
cd todo-fullstack
npm install
npm run dev
```

Open http://localhost:5173
