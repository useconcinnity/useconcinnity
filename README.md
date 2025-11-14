# Concinnity

> **Work Together, Brilliantly**

Concinnity is an all-in-one business management platform built for modern teams. It combines real-time chat, video conferencing, calendar management, and marketplace features into a unified, scalable solution.

## 🏗️ Architecture

This is a **monorepo** built with [Turborepo](https://turborepo.com), designed for enterprise-scale applications.

### Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19 + Tailwind CSS
- **Backend**: NestJS (Node.js) with microservices architecture
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Package Manager**: pnpm
- **Monorepo Tool**: Turborepo

### Project Structure

```
concinnity/
├── apps/
│   ├── web/                    # Next.js frontend application
│   ├── api-gateway/            # NestJS API Gateway (BFF pattern)
│   └── docs/                   # Documentation site
├── services/
│   ├── auth/                   # Auth Service (Clerk webhooks)
│   ├── chat/                   # Chat Service (WebSocket/Socket.io)
│   ├── calendar/               # Calendar Service (Nylas integration)
│   ├── video/                  # Video Service (Dyte/Daily.co)
│   ├── marketplace/            # Marketplace Service (Stripe)
│   └── analytics/              # Analytics Service
├── packages/
│   ├── database/               # Prisma schemas & Supabase client
│   ├── ui/                     # Shared React components
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   ├── eslint-config/          # Shared ESLint configuration
│   └── typescript-config/      # Shared TypeScript configuration
└── docs/                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (installed automatically)
- Supabase account
- Clerk account

### Installation

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

Copy the example env files and fill in your credentials:

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local

# API Gateway
cp apps/api-gateway/.env.example apps/api-gateway/.env

# Database
cp packages/database/.env.example packages/database/.env
```

3. **Set up the database**

```bash
# Generate Prisma client
cd packages/database
pnpm db:generate

# Push schema to Supabase (for development)
pnpm db:push

# Or run migrations (for production)
pnpm db:migrate
```

## 📦 Apps and Packages

### Apps

- **web**: Next.js frontend application with Clerk authentication and Tailwind CSS
- **api-gateway**: NestJS API Gateway that orchestrates microservices
- **docs**: Documentation site (Next.js)

### Packages

- **@concinnity/database**: Prisma client, schemas, and Supabase integration
- **@concinnity/ui**: Shared React component library
- **@concinnity/types**: Shared TypeScript types and interfaces
- **@concinnity/utils**: Shared utility functions
- **@concinnity/eslint-config**: Shared ESLint configuration
- **@concinnity/typescript-config**: Shared TypeScript configuration

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 🛠️ Development

### Run all apps in development mode

```bash
pnpm dev
```

This will start:
- Frontend (web): http://localhost:3000
- API Gateway: http://localhost:4000
- API Documentation: http://localhost:4000/api/docs

### Run specific apps

```bash
# Frontend only
pnpm dev --filter=web

# API Gateway only
pnpm dev --filter=api-gateway

# Multiple apps
pnpm dev --filter=web --filter=api-gateway
```

### Build

Build all apps and packages:

```bash
pnpm build
```

Build specific app:

```bash
pnpm build --filter=web
```

### Lint

```bash
pnpm lint
```

### Type checking

```bash
pnpm check-types
```

### Database Commands

```bash
# Generate Prisma client
pnpm --filter=@concinnity/database db:generate

# Push schema changes (development)
pnpm --filter=@concinnity/database db:push

# Create and run migrations (production)
pnpm --filter=@concinnity/database db:migrate

# Open Prisma Studio
pnpm --filter=@concinnity/database db:studio
```

## 🔐 Environment Variables

### Frontend (apps/web/.env.local)

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://nqyudbywjkyydhiltcho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# API Gateway
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### API Gateway (apps/api-gateway/.env)

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

## 🏛️ Microservices Architecture

Concinnity follows a microservices architecture pattern:

1. **API Gateway (BFF)**: Acts as the Backend-for-Frontend, routing requests to appropriate microservices
2. **Auth Service**: Handles Clerk webhook events and organization/user management
3. **Chat Service**: Real-time messaging with WebSocket/Socket.io
4. **Calendar Service**: Calendar and scheduling with Nylas API integration
5. **Video Service**: Video conferencing with Dyte/Daily.co integration
6. **Marketplace Service**: App marketplace with Stripe payment processing
7. **Analytics Service**: Usage tracking and reporting

## 📚 Documentation

- API Documentation: http://localhost:4000/api/docs (when running)
- [Turborepo Docs](https://turborepo.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contributing

This is a private enterprise project. Please follow the established coding standards and submit pull requests for review.

## 📝 License

Proprietary - All rights reserved
