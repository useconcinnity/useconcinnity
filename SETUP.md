# Concinnity Setup Guide

This guide will help you get Concinnity up and running on your local machine.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase project created (Project ID: `nqyudbywjkyydhiltcho`)
- [ ] Clerk account created
- [ ] Git repository initialized

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# pnpm is already installed in the project
# Just run install to get all dependencies
pnpm install
```

### 2. Configure Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/nqyudbywjkyydhiltcho
2. Navigate to **Settings** → **Database**
3. Copy the **Connection String** (URI format)
4. Copy the **Direct Connection String**
5. Navigate to **Settings** → **API**
6. Copy the **anon/public** key
7. Copy the **service_role** key (keep this secret!)

### 3. Configure Clerk

1. Go to https://dashboard.clerk.com
2. Create a new application or select existing
3. Navigate to **API Keys**
4. Copy the **Publishable Key**
5. Copy the **Secret Key**
6. Navigate to **Webhooks** → **Add Endpoint**
7. Add endpoint: `http://localhost:4000/api/v1/webhooks/clerk`
8. Subscribe to events: `organization.*`, `user.*`
9. Copy the **Signing Secret**

### 4. Set Up Environment Variables

#### Frontend (apps/web/.env.local)

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_SUPABASE_URL=https://nqyudbywjkyydhiltcho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

NEXT_PUBLIC_API_URL=http://localhost:4000
```

#### API Gateway (apps/api-gateway/.env)

```bash
cp apps/api-gateway/.env.example apps/api-gateway/.env
```

Edit `apps/api-gateway/.env`:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL=https://nqyudbywjkyydhiltcho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

#### Database Package (packages/database/.env)

```bash
cp packages/database/.env.example packages/database/.env
```

Edit `packages/database/.env`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"
```

### 5. Initialize Database

```bash
# Generate Prisma Client
pnpm --filter=@concinnity/database db:generate

# Push schema to Supabase (for development)
pnpm --filter=@concinnity/database db:push

# Or create a migration (for production)
pnpm --filter=@concinnity/database db:migrate
```

### 6. Start Development Servers

```bash
# Start all services
pnpm dev

# Or start individually
pnpm dev --filter=web          # Frontend only
pnpm dev --filter=api-gateway  # API Gateway only
```

### 7. Verify Setup

1. **Frontend**: Open http://localhost:3000
   - You should see the Concinnity landing page
   
2. **API Gateway**: Open http://localhost:4000/api/v1/health
   - You should see: `{"status":"ok","timestamp":"...","service":"api-gateway"}`
   
3. **API Documentation**: Open http://localhost:4000/api/docs
   - You should see the Swagger UI

## Troubleshooting

### Port Already in Use

If ports 3000 or 4000 are already in use:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Prisma Client Not Generated

```bash
pnpm --filter=@concinnity/database db:generate
```

### Database Connection Issues

1. Verify your Supabase project is active
2. Check that your database password is correct
3. Ensure your IP is allowed in Supabase settings

### Clerk Authentication Issues

1. Verify your Clerk keys are correct
2. Check that your Clerk application is in development mode
3. Ensure webhook endpoint is accessible

## Next Steps

Once setup is complete:

1. Create your first organization in Clerk Dashboard
2. Sign in to the application
3. Start building features!

## Useful Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm check-types

# Database
pnpm --filter=@concinnity/database db:studio  # Open Prisma Studio
pnpm --filter=@concinnity/database db:push    # Push schema changes
pnpm --filter=@concinnity/database db:migrate # Create migration
```

