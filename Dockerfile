# Use Node.js 22 as base image
FROM node:22-slim AS base

# Install pnpm
RUN npm install -g pnpm@10.22.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps ./apps
COPY services ./services

# Install dependencies WITHOUT frozen-lockfile
RUN pnpm install --no-frozen-lockfile

# Build all projects

RUN pnpm --filter docs build

# This Dockerfile is used by Railway to build all services
# The specific service to run is determined by the startCommand in railway.json

