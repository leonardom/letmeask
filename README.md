# Let Me Ask

A modern **monorepo** for building AI-powered educational Q&A experiences from classroom audio.

---

## Overview

**Let Me Ask** is a full-stack project that enables users to record classroom audio, transcribe it using Gemini AI, vectorize the content for semantic search, and ask questions based on the transcribed material. The project is split into two main packages:

- **Backend**: Node.js, Fastify, Drizzle ORM, PostgreSQL, Gemini AI
- **Frontend**: ReactJS, Vite, shadcn/ui, Tailwind CSS, MediaRecorder API

This monorepo is designed for rapid prototyping, educational tools, and AI-driven knowledge retrieval from spoken content.

---

## Features

- **Mono-repo** structure for seamless backend/frontend development
- **Fastify** server with **Drizzle ORM** and **PostgreSQL** for scalable, type-safe data management
- **Gemini AI** integration for:
  - Accurate audio transcription
  - Text vectorization (embeddings) for semantic search
  - Contextual Q&A based on class content
- **ReactJS** frontend with **Vite** for lightning-fast development
- **shadcn/ui** and **Tailwind CSS** for beautiful, accessible UI
- **MediaRecorder API** for in-browser audio capture
- **Room-based** organization: group audio and questions by classroom/session
- **Modern developer experience**: TypeScript, Biome, hot reload, Dockerized database

---

## Use Case

1. **Create a Room** for a class or session.
2. **Record audio** directly in the browser (no extra software needed).
3. **Audio is transcribed** and vectorized by Gemini AI on the backend.
4. **Ask questions** about the class—the system answers using only the transcribed content, citing the source when possible.

Perfect for:
- Students reviewing lectures
- Teachers sharing Q&A from lessons
- Building knowledge bases from spoken content

---

## Tech Stack

### Backend
- **Node.js** + **Fastify** (API server)
- **Drizzle ORM** (type-safe SQL)
- **PostgreSQL** (with vector extension)
- **Gemini AI** (Google GenAI for transcription, embeddings, and Q&A)
- **Zod** (schema validation)
- **Biome** (linting/formatting)

### Frontend
- **React 19** + **Vite** (SPA, fast refresh)
- **shadcn/ui** (accessible, customizable UI components)
- **Tailwind CSS** (utility-first styling)
- **MediaRecorder API** (audio capture)
- **React Query** (data fetching/caching)
- **TypeScript** (type safety everywhere)

---

## Quick Start

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL)

### 1. Clone the repository
```sh
git clone https://github.com/leonardom/letmeask.git
cd letmeask
```

### 2. Setup the backend
```sh
cd server
npm install
docker-compose up -d # Start PostgreSQL with vector extension
cp .env.example .env # Edit as needed
npm run db:seed # Run migrations and seed data
npm run dev # Start Fastify server
```

### 3. Setup the frontend
```sh
cd ../web
npm install
npm run dev # Start Vite dev server
```

---

## Project Structure

- `/server` — Fastify backend, Drizzle ORM, Gemini AI integration
- `/web` — ReactJS frontend, shadcn/ui, MediaRecorder

---

## Why You'll Love This Project

- **AI-powered**: Real Gemini AI for transcription, embeddings, and Q&A
- **Vector search**: Semantic retrieval of class content
- **Modern stack**: TypeScript, Vite, shadcn/ui, Drizzle ORM
- **DX first**: Hot reload, strict typing, Biome, Dockerized DB
- **Educational focus**: Designed for learning, teaching, and knowledge sharing

---

## Contributing

Pull requests and issues are welcome! Help us make classroom knowledge more accessible.

---

## License

MIT 