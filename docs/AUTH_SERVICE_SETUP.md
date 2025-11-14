# Auth Service Setup Guide

## Overview

The Auth Service syncs Clerk users and organizations to your Supabase database via webhooks.

## Architecture

```
Clerk → Webhook → Auth Service → Supabase Database
```

When events happen in Clerk (user created, org created, etc.), Clerk sends a webhook to your Auth Service, which then updates your database.

---

## Setup Steps

### 1. Configure Clerk Webhook

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Navigate to Webhooks**:
   - Click on your application
   - Go to "Webhooks" in the left sidebar
   - Click "Add Endpoint"

3. **Configure the Endpoint**:
   - **Endpoint URL**: `https://your-domain.com/api/v1/webhooks/clerk`
     - For local development: Use [ngrok](https://ngrok.com) or [localtunnel](https://localtunnel.github.io/www/)
     - Example with ngrok: `https://abc123.ngrok.io/api/v1/webhooks/clerk`
   
4. **Select Events to Subscribe**:
   - ✅ `organization.created`
   - ✅ `organization.updated`
   - ✅ `organization.deleted`
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
   - ✅ `organizationMembership.created`
   - ✅ `organizationMembership.updated`
   - ✅ `organizationMembership.deleted`

5. **Copy the Signing Secret**:
   - After creating the endpoint, Clerk will show you a signing secret
   - It looks like: `whsec_xxxxxxxxxxxxx`
   - Copy this value

### 2. Update Environment Variables

Edit `services/auth/.env`:

```env
# Server
PORT=4001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres"

# Clerk
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # ← Paste your signing secret here
```

### 3. Install Dependencies

```bash
cd /Users/zachschultz/Desktop/Concinnity/Code/Dev/useconcinnity
pnpm install
```

### 4. Start the Auth Service

```bash
pnpm --filter=@concinnity/auth-service dev
```

The service will run on **http://localhost:4001**

---

## Testing Locally with ngrok

Since Clerk needs to send webhooks to your service, you need to expose your local server to the internet.

### Option 1: ngrok (Recommended)

1. **Install ngrok**: https://ngrok.com/download

2. **Start your Auth Service**:
   ```bash
   pnpm --filter=@concinnity/auth-service dev
   ```

3. **Expose port 4001**:
   ```bash
   ngrok http 4001
   ```

4. **Copy the HTTPS URL**:
   - ngrok will show: `https://abc123.ngrok.io`
   - Your webhook URL is: `https://abc123.ngrok.io/api/v1/webhooks/clerk`

5. **Update Clerk Webhook**:
   - Go back to Clerk Dashboard → Webhooks
   - Update the endpoint URL with your ngrok URL

### Option 2: localtunnel

```bash
npx localtunnel --port 4001
```

---

## Webhook Events Handled

| Event | Action |
|-------|--------|
| `organization.created` | Creates organization in database |
| `organization.updated` | Updates organization details |
| `organization.deleted` | Deletes organization (cascades to users) |
| `user.created` | Logs user creation (actual creation happens via membership) |
| `user.updated` | Updates user details |
| `user.deleted` | Deletes user from database |
| `organizationMembership.created` | Creates user in database with org link |
| `organizationMembership.updated` | Updates user role |
| `organizationMembership.deleted` | Removes user from organization |

---

## API Endpoints

### Health Check
```
GET /api/v1/health
```

Returns service status.

### Webhook Endpoint
```
POST /api/v1/webhooks/clerk
```

Receives webhooks from Clerk (secured with signature verification).

---

## Troubleshooting

### Webhook signature verification fails

**Problem**: Clerk webhook returns 400 Bad Request

**Solution**:
1. Make sure `CLERK_WEBHOOK_SECRET` is set correctly in `.env`
2. Verify the secret matches the one in Clerk Dashboard
3. Check that the webhook URL is correct

### Organization not found error

**Problem**: User creation fails because organization doesn't exist

**Solution**:
1. Make sure `organization.created` webhook fired first
2. Check database to see if organization exists
3. Manually create organization if needed

### Database connection errors

**Problem**: Cannot connect to Supabase

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check that password is URL-encoded
3. Test connection with: `pnpm --filter=@concinnity/database db:push`

---

## Next Steps

Once the Auth Service is running:

1. ✅ Create an organization in Clerk
2. ✅ Add users to the organization
3. ✅ Verify data appears in Supabase database
4. ✅ Test user login on frontend

---

## Production Deployment

For production, deploy the Auth Service to:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io

Then update the Clerk webhook URL to your production domain.

