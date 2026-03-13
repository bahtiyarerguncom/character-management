# Backend

GraphQL API built with NestJS, using code-first approach — decorators on the model generate the schema automatically, no need to write SDL by hand.

## Setup

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

GraphQL Playground will be available at `http://localhost:4000/graphql`.

**Important:** The seed script populates the database with 24 fantasy characters. Each character gets a deterministic avatar from DiceBear based on their name.

## Architecture

```
src/
├── character/
│   ├── dto/              # GraphQL input types for filtering
│   ├── enums/            # Status & Gender enums (registered for GQL)
│   ├── character.model.ts
│   ├── character.resolver.ts
│   └── character.service.ts
├── prisma/               # DB connection lifecycle
├── app.module.ts
└── main.ts
```

The `characters` query accepts an optional filter with status, gender, and free-text search. Search works on both name and description fields (OR logic).

> **Note:** SQLite doesn't support native enums, so status/gender are stored as strings. Type safety is enforced at the GraphQL layer via registered enums.

`schema.gql` is auto-generated — don't edit it manually, it gets overwritten on every start.

## Tests

```bash
npm run test
```

Unit tests cover the character service filtering logic (status, gender, search, combined filters).
