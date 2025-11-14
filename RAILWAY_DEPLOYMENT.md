# 🚂 Railway Deployment Guide - useconcinnity.com

## 🎯 What We're Deploying

```
useconcinnity.com          → Railway (Next.js Frontend)
api.useconcinnity.com      → Railway (API Gateway)
auth.useconcinnity.com     → Railway (Auth Service)
video.useconcinnity.com    → Railway (Video Service)
chat.useconcinnity.com     → Railway (Chat Service)
```

All services in one platform! 🚀

---

## 📋 Prerequisites

- ✅ GitHub repository (you have this)
- ✅ Domain: useconcinnity.com
- ✅ Railway account (we'll create this)
- ✅ All your credentials ready

---

## 🚀 Step-by-Step Deployment (30 minutes)

### **Step 1: Sign Up for Railway** (2 minutes)

1. Go to: https://railway.app
2. Click **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your repositories
5. You'll get **$5 free credit** (no credit card required!)

---

### **Step 2: Create New Project** (2 minutes)

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **"useconcinnity"** repository
4. Railway will create an empty project

---

### **Step 3: Deploy Frontend (Next.js)** (5 minutes)

#### Create the Service

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose **"useconcinnity"** (it's already connected)
4. Railway will detect your monorepo

#### Configure the Service

Click on the service, then go to **"Settings"**:

**Service Name**: `web`

**Root Directory**: `apps/web`

**Build Command**:
```bash
cd ../.. && pnpm install && cd apps/web && pnpm build
```

**Start Command**:
```bash
pnpm start
```

**Watch Paths**: `apps/web/**`

#### Add Environment Variables

Click **"Variables"** tab and add:

```env
NODE_ENV=production
PORT=3000

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

#### Generate Domain

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. You'll get: `web-production-xxxx.up.railway.app`
4. Click **"Add Custom Domain"**
5. Enter: `useconcinnity.com`
6. Also add: `www.useconcinnity.com`

#### Deploy

Click **"Deploy"** - Railway will build and deploy your frontend!

---

### **Step 4: Deploy API Gateway** (5 minutes)

#### Create the Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Choose **"useconcinnity"**

#### Configure the Service

**Service Name**: `api-gateway`

**Root Directory**: `apps/api-gateway`

**Build Command**:
```bash
cd ../.. && pnpm install && cd apps/api-gateway && pnpm build
```

**Start Command**:
```bash
node dist/main.js
```

**Watch Paths**: `apps/api-gateway/**`

#### Add Environment Variables

```env
NODE_ENV=production
PORT=4000

# Database
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
```

#### Generate Domain

1. **Settings** → **"Networking"** → **"Generate Domain"**
2. Add custom domain: `api.useconcinnity.com`

---

### **Step 5: Deploy Auth Service** (5 minutes)

#### Create the Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Choose **"useconcinnity"**

#### Configure the Service

**Service Name**: `auth-service`

**Root Directory**: `services/auth`

**Build Command**:
```bash
cd ../.. && pnpm install && cd services/auth && pnpm build
```

**Start Command**:
```bash
node dist/main.js
```

**Watch Paths**: `services/auth/**`

#### Add Environment Variables

```env
NODE_ENV=production
PORT=4001

# Database
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres

# Clerk
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07
CLERK_WEBHOOK_SECRET=whsec_xp6bU8frEkOqyhuv4CRSwPZWixNAYVly
```

#### Generate Domain

Add custom domain: `auth.useconcinnity.com`

---

### **Step 6: Deploy Video Service** (5 minutes)

#### Create the Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Choose **"useconcinnity"**

#### Configure the Service

**Service Name**: `video-service`

**Root Directory**: `services/video`

**Build Command**:
```bash
cd ../.. && pnpm install && cd services/video && pnpm build
```

**Start Command**:
```bash
node dist/main.js
```

**Watch Paths**: `services/video/**`

#### Add Environment Variables

```env
NODE_ENV=production
PORT=4002

# Database
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres

# Dyte
DYTE_ORG_ID=d9f79929-7751-4dc9-b648-147357c7ab09
DYTE_API_KEY=1a0a0c393faf18e04a0b
```

#### Generate Domain

Add custom domain: `video.useconcinnity.com`

---

### **Step 7: Deploy Chat Service** (5 minutes)

#### Create the Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Choose **"useconcinnity"**

#### Configure the Service

**Service Name**: `chat-service`

**Root Directory**: `services/chat`

**Build Command**:
```bash
cd ../.. && pnpm install && cd services/chat && pnpm build
```

**Start Command**:
```bash
node dist/main.js
```

**Watch Paths**: `services/chat/**`

#### Add Environment Variables

```env
NODE_ENV=production
PORT=4003

# Database
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres

# CORS
FRONTEND_URL=https://useconcinnity.com
```

#### Generate Domain

Add custom domain: `chat.useconcinnity.com`

---

## 🌐 Step 8: Configure DNS (10 minutes)

**Important**: The root domain (`@` or apex) **cannot use CNAME records** - this is a DNS limitation!

### Option A: Use A Records (Most Compatible)

When you add `useconcinnity.com` as a custom domain in Railway, it will provide **A record IP addresses**.

Go to your domain registrar and add:

```
Type: A
Name: @
Value: [Railway will show IP addresses like 76.76.21.21]
TTL: 3600

Type: CNAME
Name: www
Value: [your-web-service].up.railway.app
TTL: 3600

Type: CNAME
Name: api
Value: [your-api-gateway].up.railway.app
TTL: 3600

Type: CNAME
Name: auth
Value: [your-auth-service].up.railway.app
TTL: 3600

Type: CNAME
Name: video
Value: [your-video-service].up.railway.app
TTL: 3600

Type: CNAME
Name: chat
Value: [your-chat-service].up.railway.app
TTL: 3600
```

### Option B: Use Cloudflare (Recommended - Easiest)

If your DNS provider doesn't support ALIAS records or you want easier management:

1. **Sign up for Cloudflare** (free): https://cloudflare.com
2. **Add your domain**: `useconcinnity.com`
3. **Update nameservers** at your domain registrar to Cloudflare's nameservers
4. **Add DNS records in Cloudflare**:

```
Type: CNAME
Name: @
Value: [your-web-service].up.railway.app
Proxy status: Proxied (orange cloud icon)

Type: CNAME
Name: www
Value: [your-web-service].up.railway.app
Proxy status: Proxied

Type: CNAME
Name: api
Value: [your-api-gateway].up.railway.app
Proxy status: Proxied

Type: CNAME
Name: auth
Value: [your-auth-service].up.railway.app
Proxy status: Proxied

Type: CNAME
Name: video
Value: [your-video-service].up.railway.app
Proxy status: Proxied

Type: CNAME
Name: chat
Value: [your-chat-service].up.railway.app
Proxy status: Proxied
```

**Benefits of Cloudflare**:
- ✅ CNAME flattening (works for root domain)
- ✅ Free SSL
- ✅ DDoS protection
- ✅ CDN (faster loading)
- ✅ Analytics

### Option C: ALIAS Records (If Your Provider Supports It)

Some DNS providers (DNSimple, DNS Made Easy, Route53) support ALIAS or ANAME records:

```
Type: ALIAS (or ANAME)
Name: @
Value: [your-web-service].up.railway.app

Type: CNAME
Name: www
Value: [your-web-service].up.railway.app

[... rest of CNAME records for subdomains ...]
```

**Note**: DNS propagation can take 5 minutes to 48 hours (usually ~15 minutes)

---

## 🔧 Step 9: Update Clerk Configuration (5 minutes)

### Update Webhook URL

1. Go to Clerk Dashboard: https://dashboard.clerk.com
2. Navigate to **Webhooks**
3. Update endpoint URL to: `https://auth.useconcinnity.com/api/v1/webhooks/clerk`
4. Verify the signing secret matches your `.env`

### Update Redirect URLs

1. In Clerk Dashboard, go to **Paths**
2. Update (use relative paths, NOT full URLs):
   - Sign-in page: `/sign-in`
   - Sign-up page: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

**Note**: Clerk automatically uses your configured domain (useconcinnity.com) with these paths.

---

## ✅ Verification (5 minutes)

Test each service:

```bash
# Frontend
curl https://useconcinnity.com

# API Gateway
curl https://api.useconcinnity.com/api/v1/health

# Auth Service
curl https://auth.useconcinnity.com/api/v1/health

# Video Service
curl https://video.useconcinnity.com/api/v1/health

# Chat Service
curl https://chat.useconcinnity.com/api/v1/health
```

All should return `200 OK`!

---

## 🎉 You're Live!

Your platform is now deployed at:
- **Frontend**: https://useconcinnity.com
- **API Docs**: https://api.useconcinnity.com/api/docs

---

## 📊 Monitoring

Railway provides built-in monitoring:
1. Click on any service
2. Go to **"Metrics"** tab
3. See CPU, Memory, Network usage in real-time

---

## 💰 Cost Breakdown

**Free Tier**: $5/month credit
- Covers ~500 hours of usage
- Good for testing and low traffic

**Production Estimate** (1,000 users):
- Frontend: ~$5/month
- API Gateway: ~$5/month
- Auth Service: ~$3/month
- Video Service: ~$3/month
- Chat Service: ~$5/month
- **Total: ~$21/month**

---

## 🔄 Auto-Deployments

Railway automatically deploys when you push to GitHub!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway will:
1. Detect the push
2. Build affected services
3. Deploy automatically
4. Zero downtime!

---

## 🚨 Troubleshooting

### Build fails
- Check Railway logs (click service → "Deployments" → latest deployment)
- Verify `pnpm install` works locally
- Check that all dependencies are in `package.json`

### Service won't start
- Check environment variables are set
- Verify `PORT` is set correctly
- Check logs for errors

### Can't connect to database
- Verify `DATABASE_URL` is correct
- Check Supabase is accessible
- Test connection locally first

### Domain not working
- Wait 15-30 minutes for DNS propagation
- Verify CNAME records are correct
- Check Railway domain settings

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Help: https://help.railway.app

---

**Ready to deploy?** Let me know when you've signed up for Railway and I'll help you through each step!

