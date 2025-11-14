# ✅ Deployment Checklist - useconcinnity.com

Use this checklist to track your deployment progress.

---

## 📋 Pre-Deployment

- [ ] GitHub repository is up to date
- [ ] All services run locally without errors
- [ ] Environment variables are documented
- [ ] Domain (useconcinnity.com) is purchased
- [ ] Access to domain DNS settings

---

## 🚂 Railway Setup

- [ ] Signed up for Railway (https://railway.app)
- [ ] Connected GitHub account
- [ ] Created new project
- [ ] Project name: "useconcinnity"

---

## 🚀 Service Deployments

### Frontend (apps/web)
- [ ] Service created in Railway
- [ ] Root directory set: `apps/web`
- [ ] Environment variables added (9 variables)
- [ ] Railway domain generated
- [ ] Custom domain added: `useconcinnity.com`
- [ ] Custom domain added: `www.useconcinnity.com`
- [ ] Deployment successful (green checkmark)
- [ ] Service is running

### API Gateway (apps/api-gateway)
- [ ] Service created in Railway
- [ ] Root directory set: `apps/api-gateway`
- [ ] Environment variables added (4 variables)
- [ ] Railway domain generated
- [ ] Custom domain added: `api.useconcinnity.com`
- [ ] Deployment successful
- [ ] Health check works: `curl https://api.useconcinnity.com/api/v1/health`

### Auth Service (services/auth)
- [ ] Service created in Railway
- [ ] Root directory set: `services/auth`
- [ ] Environment variables added (6 variables)
- [ ] Railway domain generated
- [ ] Custom domain added: `auth.useconcinnity.com`
- [ ] Deployment successful
- [ ] Health check works: `curl https://auth.useconcinnity.com/api/v1/health`

### Video Service (services/video)
- [ ] Service created in Railway
- [ ] Root directory set: `services/video`
- [ ] Environment variables added (6 variables)
- [ ] Railway domain generated
- [ ] Custom domain added: `video.useconcinnity.com`
- [ ] Deployment successful
- [ ] Health check works: `curl https://video.useconcinnity.com/api/v1/health`

### Chat Service (services/chat)
- [ ] Service created in Railway
- [ ] Root directory set: `services/chat`
- [ ] Environment variables added (5 variables)
- [ ] Railway domain generated
- [ ] Custom domain added: `chat.useconcinnity.com`
- [ ] Deployment successful
- [ ] Health check works: `curl https://chat.useconcinnity.com/api/v1/health`

---

## 🌐 DNS Configuration

- [ ] Logged into domain registrar
- [ ] Added CNAME for `@` → Railway web service
- [ ] Added CNAME for `www` → Railway web service
- [ ] Added CNAME for `api` → Railway API Gateway
- [ ] Added CNAME for `auth` → Railway Auth Service
- [ ] Added CNAME for `video` → Railway Video Service
- [ ] Added CNAME for `chat` → Railway Chat Service
- [ ] Waited 15-30 minutes for DNS propagation
- [ ] Verified DNS with: `nslookup useconcinnity.com`

---

## 🔐 Clerk Configuration

### Webhook Setup
- [ ] Logged into Clerk Dashboard (https://dashboard.clerk.com)
- [ ] Navigated to Webhooks section
- [ ] Updated webhook URL to: `https://auth.useconcinnity.com/api/v1/webhooks/clerk`
- [ ] Verified signing secret matches Railway environment variable
- [ ] Tested webhook (create test organization)

### Redirect URLs
- [ ] Updated Sign-in URL: `https://useconcinnity.com/sign-in`
- [ ] Updated Sign-up URL: `https://useconcinnity.com/sign-up`
- [ ] Updated After sign-in: `https://useconcinnity.com/dashboard`
- [ ] Updated After sign-up: `https://useconcinnity.com/dashboard`

### Allowed Origins
- [ ] Added `https://useconcinnity.com` to allowed origins
- [ ] Added `https://www.useconcinnity.com` to allowed origins

---

## 🧪 Testing

### Basic Connectivity
- [ ] Frontend loads: `https://useconcinnity.com`
- [ ] API Gateway health: `https://api.useconcinnity.com/api/v1/health`
- [ ] Auth Service health: `https://auth.useconcinnity.com/api/v1/health`
- [ ] Video Service health: `https://video.useconcinnity.com/api/v1/health`
- [ ] Chat Service health: `https://chat.useconcinnity.com/api/v1/health`

### Authentication Flow
- [ ] Can access sign-in page
- [ ] Can sign up with email
- [ ] Can sign in with email
- [ ] Redirected to dashboard after sign-in
- [ ] User appears in Clerk dashboard
- [ ] User synced to Supabase database

### Organization Management
- [ ] Can create organization
- [ ] Organization appears in Clerk
- [ ] Organization synced to Supabase database
- [ ] Can add members to organization
- [ ] Members synced to database

### Video Calls
- [ ] Can create meeting from dashboard
- [ ] Meeting appears in database
- [ ] Can join meeting
- [ ] Dyte video loads
- [ ] Video/audio works

### Chat (Backend)
- [ ] WebSocket connection works
- [ ] Can send messages
- [ ] Messages saved to database
- [ ] Real-time delivery works

---

## 📊 Monitoring Setup

- [ ] Checked Railway metrics for each service
- [ ] Verified CPU usage is normal (<50%)
- [ ] Verified memory usage is normal (<80%)
- [ ] Set up alerts (optional)
- [ ] Bookmarked Railway dashboard

---

## 🔒 Security

- [ ] All environment variables use Railway secrets (not hardcoded)
- [ ] Database password is secure
- [ ] Clerk webhook secret is set
- [ ] CORS is configured correctly
- [ ] SSL certificates are active (automatic with Railway)

---

## 📝 Documentation

- [ ] Updated README with production URLs
- [ ] Documented deployment process
- [ ] Saved Railway project link
- [ ] Saved all credentials securely (1Password, etc.)

---

## 🎉 Launch

- [ ] All services are green in Railway
- [ ] All tests pass
- [ ] Team has access to Railway project
- [ ] Announced launch! 🚀

---

## 📈 Post-Launch

- [ ] Monitor Railway metrics daily
- [ ] Check error logs
- [ ] Set up uptime monitoring (optional: UptimeRobot, Pingdom)
- [ ] Plan next features
- [ ] Celebrate! 🎊

---

## 💰 Billing

- [ ] Reviewed Railway usage
- [ ] Current cost: $____/month
- [ ] Added payment method (if needed)
- [ ] Set up billing alerts

---

## 🔄 Maintenance

- [ ] Set up automatic backups (Supabase does this)
- [ ] Plan for scaling (when needed)
- [ ] Document incident response process
- [ ] Schedule regular health checks

---

**Progress**: ___/100 items completed

**Estimated Time**: 30-60 minutes total

**Status**: 
- [ ] Not Started
- [ ] In Progress
- [ ] Deployed
- [ ] Live in Production 🎉

