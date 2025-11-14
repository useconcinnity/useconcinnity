# 🚀 Deployment Guide - useconcinnity.com

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    useconcinnity.com                         │
│                   Frontend (Vercel)                          │
│                   Next.js 16 + Clerk                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 api.useconcinnity.com                        │
│                  API Gateway (Railway)                       │
│                  Port 4000 → Public                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│                                                              │
│  auth.useconcinnity.com (Railway) - Port 4001               │
│  video.useconcinnity.com (Railway) - Port 4002              │
│  chat.useconcinnity.com (Railway) - Port 4003               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL Database                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Prerequisites

- ✅ GitHub repository (you have this)
- ✅ Domain: useconcinnity.com
- ✅ Vercel account (free tier is fine)
- ✅ Railway account (free tier is fine)
- ✅ Clerk account (you have this)
- ✅ Supabase account (you have this)
- ✅ Dyte account (you have this)

---

## 🎯 Deployment Steps

### **Part 1: Deploy Frontend to Vercel** (10 minutes)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy from Root Directory

```bash
cd /Users/zachschultz/Desktop/Concinnity/Code/Dev/useconcinnity
vercel
```

**Follow the prompts**:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **useconcinnity**
- In which directory is your code? **./apps/web**
- Override settings? **Yes**
  - Build Command: `pnpm build`
  - Output Directory: `.next`
  - Install Command: `pnpm install`

#### 4. Add Environment Variables in Vercel Dashboard

Go to: https://vercel.com/your-username/useconcinnity/settings/environment-variables

Add these:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bm90YWJsZS13aWxkY2F0LTE0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07

# API URLs (we'll update these after deploying backend)
NEXT_PUBLIC_API_URL=https://api.useconcinnity.com
NEXT_PUBLIC_CHAT_URL=https://chat.useconcinnity.com
NEXT_PUBLIC_VIDEO_URL=https://video.useconcinnity.com

# Dyte
NEXT_PUBLIC_DYTE_ORG_ID=d9f79929-7751-4dc9-b648-147357c7ab09
```

#### 5. Set Up Custom Domain

In Vercel Dashboard:
1. Go to **Settings** → **Domains**
2. Add domain: **useconcinnity.com**
3. Add domain: **www.useconcinnity.com**
4. Follow DNS instructions (add A/CNAME records to your domain registrar)

**DNS Records to Add**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### **Part 2: Deploy Backend Services to Railway** (20 minutes)

#### 1. Sign Up for Railway

Go to: https://railway.app
- Sign up with GitHub
- Connect your repository

#### 2. Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **useconcinnity** repository
4. Railway will detect your monorepo

#### 3. Deploy API Gateway

**Create Service**:
1. Click **"+ New"** → **"Service"**
2. Name: **api-gateway**
3. Root Directory: `/apps/api-gateway`
4. Build Command: `pnpm install && pnpm build`
5. Start Command: `pnpm start:prod`

**Environment Variables**:
```env
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
```

**Generate Domain**:
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. You'll get: `api-gateway-production-xxxx.up.railway.app`
4. Add custom domain: **api.useconcinnity.com**

#### 4. Deploy Auth Service

**Create Service**:
1. Click **"+ New"** → **"Service"**
2. Name: **auth-service**
3. Root Directory: `/services/auth`
4. Build Command: `pnpm install && pnpm build`
5. Start Command: `pnpm start:prod`

**Environment Variables**:
```env
PORT=4001
NODE_ENV=production
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07
CLERK_WEBHOOK_SECRET=whsec_xp6bU8frEkOqyhuv4CRSwPZWixNAYVly
```

**Generate Domain**:
- Custom domain: **auth.useconcinnity.com**

#### 5. Deploy Video Service

**Create Service**:
1. Name: **video-service**
2. Root Directory: `/services/video`
3. Build Command: `pnpm install && pnpm build`
4. Start Command: `pnpm start:prod`

**Environment Variables**:
```env
PORT=4002
NODE_ENV=production
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DYTE_ORG_ID=d9f79929-7751-4dc9-b648-147357c7ab09
DYTE_API_KEY=1a0a0c393faf18e04a0b
```

**Generate Domain**:
- Custom domain: **video.useconcinnity.com**

#### 6. Deploy Chat Service

**Create Service**:
1. Name: **chat-service**
2. Root Directory: `/services/chat`
3. Build Command: `pnpm install && pnpm build`
4. Start Command: `pnpm start:prod`

**Environment Variables**:
```env
PORT=4003
NODE_ENV=production
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
FRONTEND_URL=https://useconcinnity.com
```

**Generate Domain**:
- Custom domain: **chat.useconcinnity.com**

---

### **Part 3: Configure DNS for Custom Domains** (10 minutes)

Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these DNS records:

```
# Frontend (Vercel)
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Backend Services (Railway)
Type: CNAME
Name: api
Value: [your-railway-domain].up.railway.app

Type: CNAME
Name: auth
Value: [your-railway-domain].up.railway.app

Type: CNAME
Name: video
Value: [your-railway-domain].up.railway.app

Type: CNAME
Name: chat
Value: [your-railway-domain].up.railway.app
```

---

### **Part 4: Update Clerk Webhook URL** (2 minutes)

1. Go to Clerk Dashboard: https://dashboard.clerk.com
2. Navigate to **Webhooks**
3. Update endpoint URL to: **https://auth.useconcinnity.com/api/v1/webhooks/clerk**
4. Save changes

---

### **Part 5: Update Clerk Redirect URLs** (2 minutes)

1. In Clerk Dashboard, go to **Paths**
2. Update URLs:
   - Sign-in URL: `https://useconcinnity.com/sign-in`
   - Sign-up URL: `https://useconcinnity.com/sign-up`
   - After sign-in: `https://useconcinnity.com/dashboard`
   - After sign-up: `https://useconcinnity.com/dashboard`

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Frontend loads: https://useconcinnity.com
- [ ] API Gateway health: https://api.useconcinnity.com/api/v1/health
- [ ] Auth Service health: https://auth.useconcinnity.com/api/v1/health
- [ ] Video Service health: https://video.useconcinnity.com/api/v1/health
- [ ] Chat Service health: https://chat.useconcinnity.com/api/v1/health
- [ ] Sign in works
- [ ] Create organization works
- [ ] User syncs to database
- [ ] Video call works
- [ ] Chat connects (WebSocket)

---

## 🔧 Troubleshooting

### Frontend not loading
- Check Vercel deployment logs
- Verify environment variables are set
- Check DNS propagation (can take up to 48 hours)

### Backend services not connecting
- Check Railway deployment logs
- Verify DATABASE_URL is correct
- Check CORS settings (FRONTEND_URL)

### Webhooks not working
- Verify webhook URL in Clerk
- Check CLERK_WEBHOOK_SECRET matches
- View logs in Railway

---

## 💰 Cost Estimate

**Free Tier (Good for MVP)**:
- Vercel: Free (100GB bandwidth, unlimited requests)
- Railway: $5/month credit (enough for 4 services)
- Supabase: Free (500MB database, 2GB bandwidth)
- Clerk: Free (10,000 MAU)
- Dyte: Free (10,000 minutes/month)

**Total: ~$5/month** (just Railway)

**Production Tier (1,000 users)**:
- Vercel Pro: $20/month
- Railway: ~$20/month (4 services)
- Supabase Pro: $25/month
- Clerk: $25/month
- Dyte: $99/month

**Total: ~$189/month**

---

## 🚀 Next Steps After Deployment

1. Set up monitoring (Railway has built-in metrics)
2. Configure error tracking (Sentry)
3. Set up CI/CD (GitHub Actions)
4. Add SSL certificates (automatic with Vercel/Railway)
5. Set up backups (Supabase automatic backups)

---

## 📞 Support

If you run into issues:
- Vercel: https://vercel.com/support
- Railway: https://railway.app/help
- Supabase: https://supabase.com/support

---

**Ready to deploy?** Let me know if you want me to help you with any specific step!

