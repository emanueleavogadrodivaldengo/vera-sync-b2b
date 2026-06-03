# Vera Sync

> B2B platform for sourcing and ordering samples of sustainable and exotic leathers.

## Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | Next.js · React · TypeScript · Tailwind CSS v4 |
| Backend  | Node.js · Express · TypeScript          |
| Database | PostgreSQL · Prisma ORM                 |
| Auth     | NextAuth (Auth.js)                      |
| AI       | OpenAI API                              |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A PostgreSQL database (cloud-hosted, e.g. Supabase or Neon)

### Installation

```bash
# Frontend
cd frontend
cp .env.example .env.local
npm install

# Backend
cd ../backend
cp .env.example .env
npm install
```

### Database Setup

```bash
cd backend
npx prisma generate
npx prisma db push   # Sync schema to your cloud DB
```

### Development

```bash
# Terminal 1 — Frontend (http://localhost:3000)
cd frontend
npm run dev

# Terminal 2 — Backend (http://localhost:4000)
cd backend
npm run dev
```

## Project Structure

```
progetto1/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── types/
│   └── public/
│       └── locales/   # i18n translation files
│
├── backend/           # Express API server
│   ├── prisma/        # Database schema
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── middlewares/
│       └── utils/
```

## License

Private — All rights reserved.
