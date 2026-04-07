# Goal-Driven English Learning Web App

A deployable full-stack MVP for a goal-driven English learning product aimed at Chinese learners.

## What it does

- Lets learners input a real-world English goal
- Diagnoses likely weaknesses across listening, speaking, reading, writing, pronunciation, and vocabulary
- Adapts the plan to common Chinese learner pain points (weak speaking, weak listening, small vocabulary, strong Chinese accent, uneven ability)
- Generates a staged roadmap plus today's learning plan
- Stores progress and shows overall / stage / skill progress
- Persists learner state on the backend using a JSON data store (disk-backed on Render when a persistent disk is attached)

## Monorepo structure

- `frontend/` React + Vite UI plus an Express production server that proxies `/api`
- `backend/` Express API with JSON persistence
- `render.yaml` Blueprint for two Render web services

## Local development

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` and proxies `/api` to the backend.

## Local production check

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

Runs on `http://localhost:3000`

## Deploy on Render

This repo includes a `render.yaml` Blueprint that defines:

1. `english-learning-api` — Node web service with a persistent disk
2. `english-learning-web` — Node web service that serves the built frontend and proxies `/api` to the backend

### Notes

- Backend data persists only under the mounted disk path.
- The frontend receives the backend's private-network `hostport` via Blueprint env var wiring.
- For a production AI planner, add an LLM provider behind the backend planner module.

## Key product decisions in this MVP

- The experience is organized around one main path: goal → assessment → staged roadmap → today's study → progress tracking.
- Daily plans cover all four skills while tilting time toward the learner's weakest areas.
- Feedback includes Chinese-learner-specific labels instead of only a generic level score.
