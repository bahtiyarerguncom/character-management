# Character Management

Full-stack app for browsing and filtering fantasy characters. Built with Next.js 16 on the frontend and NestJS on the backend, communicating via GraphQL.

## Tech Stack

- **Backend:** NestJS 11, Apollo Server, Prisma 6 (SQLite)
- **Frontend:** Next.js 16, React Query, nuqs, Tailwind CSS 4
- **Tooling:** GraphQL Code Generator for end-to-end type safety

## Getting Started

> Requires Node.js >= 20

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed    # seeds 24 characters with DiceBear avatars
npm run start:dev
```

API available at `http://localhost:4000/graphql` (Playground included).

### 2. Frontend

```bash
cd frontend
npm install
npm run codegen    # backend must be running
npm run dev
```

Opens at `http://localhost:3000`.

### 3. Tests

```bash
cd backend
npm run test
```

## Project Structure

```
├── backend/
│   ├── src/character/    # GraphQL resolver, service, model, enums, tests
│   ├── src/prisma/       # DB connection lifecycle
│   └── prisma/           # Schema, migrations, seed
└── frontend/
    ├── src/components/   # Character cards, filters, search, theme toggle
    ├── src/hooks/        # URL-synced filter state (nuqs)
    ├── src/gql/          # Generated types (don't edit)
    └── src/graphql/      # Query definitions
```
