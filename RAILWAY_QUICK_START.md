# 🚂 Railway Quick Start - Deploy in 15 Minutes

## 🎯 Goal
Get useconcinnity.com live on Railway with all 5 services deployed.

---

## ⚡ Super Quick Steps

### 1. Sign Up (2 min)
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### 2. Create Project (1 min)
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose "useconcinnity"

### 3. Deploy Services (10 min)

For each service below, click **"+ New"** → **"GitHub Repo"** → **"useconcinnity"**

#### Service 1: Frontend (web)
```
Service Name: web
Root Directory: apps/web
Generate Domain → Add: useconcinnity.com
```

**Environment Variables** (click "Variables" tab):
```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bm90YWJsZS13aWxkY2F0LTE0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07
NEXT_PUBLIC_API_URL=https://api.useconcinnity.com
NEXT_PUBLIC_CHAT_URL=https://chat.useconcinnity.com
NEXT_PUBLIC_VIDEO_URL=https://video.useconcinnity.com
NEXT_PUBLIC_DYTE_ORG_ID=d9f79929-7751-4dc9-b648-147357c7ab09
```

#### Service 2: API Gateway
```
Service Name: api-gateway
Root Directory: apps/api-gateway
Generate Domain → Add: api.useconcinnity.com
```

**Environment Variables**:
```
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
```

#### Service 3: Auth Service
```
Service Name: auth-service
Root Directory: services/auth
Generate Domain → Add: auth.useconcinnity.com
```

**Environment Variables**:
```
NODE_ENV=production
PORT=4001
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
CLERK_SECRET_KEY=sk_test_PfQxsDoQ04UJCsClTuI3veOPtgaKOqzYIR4vA4yq07
CLERK_WEBHOOK_SECRET=whsec_xp6bU8frEkOqyhuv4CRSwPZWixNAYVly
```

#### Service 4: Video Service
```
Service Name: video-service
Root Directory: services/video
Generate Domain → Add: video.useconcinnity.com
```

**Environment Variables**:
```
NODE_ENV=production
PORT=4002
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DYTE_ORG_ID=d9f79929-7751-4dc9-b648-147357c7ab09
DYTE_API_KEY=1a0a0c393faf18e04a0b
```

#### Service 5: Chat Service
```
Service Name: chat-service
Root Directory: services/chat
Generate Domain → Add: chat.useconcinnity.com
```

**Environment Variables**:
```
NODE_ENV=production
PORT=4003
DATABASE_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Lilah0103!@db.nqyudbywjkyydhiltcho.supabase.co:5432/postgres
FRONTEND_URL=https://useconcinnity.com
```

### 4. Configure DNS (2 min)

Railway will give you CNAME targets. Add these to your domain registrar:

```
@ → [web-service].up.railway.app
www → [web-service].up.railway.app
api → [api-gateway].up.railway.app
auth → [auth-service].up.railway.app
video → [video-service].up.railway.app
chat → [chat-service].up.railway.app
```

### 5. Update Clerk (2 min)

Go to https://dashboard.clerk.com:

**Webhooks**:
- Update URL to: `https://auth.useconcinnity.com/api/v1/webhooks/clerk`

**Paths**:
- Sign-in: `https://useconcinnity.com/sign-in`
- Sign-up: `https://useconcinnity.com/sign-up`
- After sign-in: `https://useconcinnity.com/dashboard`

---

## ✅ Test

```bash
curl https://useconcinnity.com
curl https://api.useconcinnity.com/api/v1/health
curl https://auth.useconcinnity.com/api/v1/health
curl https://video.useconcinnity.com/api/v1/health
curl https://chat.useconcinnity.com/api/v1/health
```

All should return `200 OK`!

---

## 🎉 You're Live!

Visit: https://useconcinnity.com

---

## 💡 Tips

- **Logs**: Click any service → "Deployments" → View logs
- **Metrics**: Click any service → "Metrics" → See CPU/Memory
- **Auto-deploy**: Push to GitHub = automatic deployment
- **Rollback**: Click "Deployments" → Click old deployment → "Redeploy"

---

## 🚨 Common Issues

**Build fails**: Check logs, verify `pnpm install` works locally

**Service won't start**: Check environment variables are set

**Domain not working**: Wait 15 minutes for DNS propagation

**Can't connect to database**: Verify `DATABASE_URL` is correct

---

## 📞 Need Help?

- Full guide: See `RAILWAY_DEPLOYMENT.md`
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

---

**Ready?** Sign up at https://railway.app and let's go! 🚀

