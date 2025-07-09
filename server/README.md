# Let me Ask Backend

This is a simple Fastify + Drizzle ORM server for managing rooms, using PostgreSQL as the database. The project is written in TypeScript and uses Zod for schema validation and Biome for code formatting/linting.

## Main Libraries
- [Fastify](https://fastify.dev/) (HTTP server)
- [Drizzle ORM](https://orm.drizzle.team/) (Type-safe ORM for SQL)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Zod](https://zod.dev/) (Schema validation)
- [Biome](https://biomejs.dev/) (Linter/Formatter)

## Project Structure & Patterns
- **src/server.ts**: Main entry point, sets up Fastify, CORS, and routes.
- **src/http/routes/**: HTTP route handlers (e.g., `/rooms`).
- **src/db/schema/**: Database schema definitions using Drizzle ORM.
- **src/db/connection.ts**: Database connection setup.
- **src/db/seed.ts**: Seed script for populating the database with sample data.
- **.env**: Environment variables (not versioned).

## Setup & Configuration

### Prerequisites
- Node.js 18+
- Docker (for running PostgreSQL easily)

### 1. Clone the repository
```sh
git clone <repo-url>
cd server
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start PostgreSQL with Docker
```sh
docker-compose up -d
```

This will start a PostgreSQL instance with the required `vector` extension.

### 4. Configure environment variables
Create a `.env` file in the root with:
```
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/agents
```

### 5. Run database migrations and seed (if needed)
```sh
npm run db:seed
```

### 6. Start the server
```sh
npm run dev
```

## API Endpoints
- `GET /health` — Health check
- `GET /rooms` — List all rooms

## Formatting & Linting
- Run `npx biome check .` to lint
- Run `npx biome format .` to format

---

Feel free to contribute or open issues! 