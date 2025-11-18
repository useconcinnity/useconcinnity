# Stage 1: Dependencies
FROM node:22-slim AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.22.0

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy workspace packages and docs app
COPY packages ./packages
COPY apps/docs ./apps/docs

# Install dependencies for the workspace
RUN pnpm install --no-frozen-lockfile

# Stage 2: Builder
FROM node:22-slim AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.22.0

# Copy dependencies and sources from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps/docs ./apps/docs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Build only the docs app
RUN pnpm --filter docs build

# Stage 3: Runner
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/public ./apps/docs/public

USER nextjs

EXPOSE 3001

CMD ["node", "apps/docs/server.js"]

