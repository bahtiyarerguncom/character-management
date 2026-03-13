# Character Management Application

A full-stack Character Management Application using **Next.js 16** for the frontend and **NestJS** for the backend with **GraphQL** end-to-end.

## Tech Stack

**Backend:** NestJS 11, GraphQL (Apollo Server), Prisma 6, SQLite
**Frontend:** Next.js 16, React Query 5, nuqs 2, GraphQL Code Generator, Tailwind CSS 4

## Prerequisites

- Node.js >= 20

## Getting Started

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Backend runs at `http://localhost:4000/graphql` with GraphQL Playground.

### 2. Frontend

```bash
cd frontend
npm install
npm run codegen    # requires backend to be running
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Project Structure

```
character-management/
├── backend/          # NestJS GraphQL API
│   ├── src/
│   │   ├── character/    # Character module (resolver, service, model, enums)
│   │   ├── prisma/       # Prisma service and module
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
├── frontend/         # Next.js 16 App
│   ├── src/
│   │   ├── app/          # Pages and layout
│   │   ├── components/   # UI components
│   │   ├── gql/          # Generated GraphQL types
│   │   ├── graphql/      # GraphQL query definitions
│   │   ├── hooks/        # Custom hooks (nuqs filters)
│   │   └── lib/          # GraphQL client
│   └── codegen.ts
└── README.md
```

## Features

- View characters displayed as cards with image, name, status, gender, and description
- Filter by status (Alive, Dead, Unknown) and gender (Male, Female, Unknown)
- Text search on name and description
- URL-based filter state (shareable links via nuqs)
- Server-side filtering via GraphQL
- Responsive grid layout
- Loading skeletons and error/empty states
