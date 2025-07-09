# Let me Ask Frontend

This is a simple web application built with React, Vite, and TypeScript. It uses modern libraries and follows common best practices for scalable React projects.

## Main Libraries Used

- **React 19** – UI library
- **Vite** – Fast build tool and dev server
- **TypeScript** – Static typing
- **React Router DOM** – Routing
- **@tanstack/react-query** – Data fetching and caching
- **Tailwind CSS** – Utility-first CSS framework
- **@radix-ui/react-slot** – UI composition
- **class-variance-authority, clsx, tailwind-merge** – Utility libraries for class management
- **lucide-react** – Icon library
- **tw-animate-css** – Animation utilities
- **Biome** – Linting and formatting

## Project Structure & Patterns

- **Component-based**: UI is split into reusable components (see `src/components/`).
- **Pages**: Each route has its own page in `src/pages/`.
- **Hooks & Utilities**: Shared logic and helpers in `src/lib/`.
- **Routing**: Managed with React Router in `src/app.tsx`.
- **Data Fetching**: Uses React Query for server state management.
- **Styling**: Tailwind CSS with custom themes and dark mode support.
- **TypeScript**: Strict typing enabled for safety and maintainability.

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Linting & Formatting

- This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run:
  ```bash
  npx biome check .
  ```

## Notes

- Make sure you have Node.js (v18 or newer) installed.
- The app expects an API running at `http://localhost:3333` for room data. 