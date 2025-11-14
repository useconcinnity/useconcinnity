# 🌐 DNS Setup Guide for useconcinnity.com

## ⚠️ The Root Domain Problem

**You cannot use CNAME records for the root domain (`@` or apex domain).**

This is a DNS protocol limitation, not a Railway or domain provider issue.

---

## ✅ Solution: Choose Your Approach

### **Option 1: Use A Records (Works Everywhere)** ⭐ Recommended

This works with **any** domain provider.

#### Steps:

1. **In Railway Dashboard**:
   - Go to your **web service**
   - Click **Settings** → **Networking**
   - Click **Custom Domain**
   - Enter: `useconcinnity.com`
   - Railway will show you **A record IP addresses**

2. **In Your Domain Provider** (GoDaddy, Namecheap, etc.):
   - Add these DNS records:

```
┌──────────┬──────┬─────────────────────────────────────────┬──────┐
│ Type     │ Name │ Value                                   │ TTL  │
├──────────┼──────┼─────────────────────────────────────────┼──────┤
│ A        │ @    │ [IP from Railway, e.g., 76.76.21.21]   │ 3600 │
│ A        │ @    │ [IP from Railway, e.g., 76.76.21.98]   │ 3600 │
│ CNAME    │ www  │ web-production-xxxx.up.railway.app      │ 3600 │
│ CNAME    │ api  │ api-gateway-production-xxxx.up.railway.app │ 3600 │
│ CNAME    │ auth │ auth-service-production-xxxx.up.railway.app │ 3600 │
│ CNAME    │ video│ video-service-production-xxxx.up.railway.app │ 3600 │
│ CNAME    │ chat │ chat-service-production-xxxx.up.railway.app │ 3600 │
└──────────┴──────┴─────────────────────────────────────────┴──────┘
```

**Note**: Railway typically provides 2 A record IPs for redundancy.

---

### **Option 2: Use Cloudflare (Easiest)** ⭐⭐ Best Experience

Cloudflare is **free** and supports CNAME flattening for root domains.

#### Steps:

1. **Sign up for Cloudflare**:
   - Go to: https://cloudflare.com
   - Create free account
   - Click **"Add a Site"**
   - Enter: `useconcinnity.com`

2. **Update Nameservers**:
   - Cloudflare will give you 2 nameservers like:
     - `ava.ns.cloudflare.com`
     - `brad.ns.cloudflare.com`
   - Go to your domain registrar (where you bought the domain)
   - Find **Nameservers** or **DNS Settings**
   - Replace existing nameservers with Cloudflare's
   - Save (takes 5-30 minutes to propagate)

3. **Add DNS Records in Cloudflare**:

```
┌──────────┬──────┬─────────────────────────────────────────┬────────────┐
│ Type     │ Name │ Value                                   │ Proxy      │
├──────────┼──────┼─────────────────────────────────────────┼────────────┤
│ CNAME    │ @    │ web-production-xxxx.up.railway.app      │ Proxied ☁️ │
│ CNAME    │ www  │ web-production-xxxx.up.railway.app      │ Proxied ☁️ │
│ CNAME    │ api  │ api-gateway-production-xxxx.up.railway.app │ Proxied ☁️ │
│ CNAME    │ auth │ auth-service-production-xxxx.up.railway.app │ Proxied ☁️ │
│ CNAME    │ video│ video-service-production-xxxx.up.railway.app │ Proxied ☁️ │
│ CNAME    │ chat │ chat-service-production-xxxx.up.railway.app │ Proxied ☁️ │
└──────────┴──────┴─────────────────────────────────────────┴────────────┘
```

**Benefits**:
- ✅ CNAME works for root domain (Cloudflare handles it)
- ✅ Free SSL certificates
- ✅ DDoS protection
- ✅ CDN (faster page loads worldwide)
- ✅ Analytics dashboard
- ✅ Easy to manage

---

### **Option 3: ALIAS/ANAME Records** (Provider-Specific)

Some DNS providers support **ALIAS** or **ANAME** records (works like CNAME for root):

**Providers that support this**:
- ✅ Cloudflare (CNAME flattening)
- ✅ DNSimple (ALIAS)
- ✅ DNS Made Easy (ANAME)
- ✅ AWS Route 53 (ALIAS)
- ✅ Netlify DNS (ALIAS)

**If your provider supports it**:

```
Type: ALIAS (or ANAME)
Name: @
Value: web-production-xxxx.up.railway.app

Type: CNAME
Name: www
Value: web-production-xxxx.up.railway.app

[... rest of subdomains as CNAME ...]
```

---

## 🔍 How to Get Railway Targets

For each service in Railway:

1. Click on the service (e.g., **web**, **api-gateway**, etc.)
2. Go to **Settings** → **Networking**
3. Click **Generate Domain** (if not done)
4. You'll see: `service-name-production-xxxx.up.railway.app`
5. Click **Custom Domain** → Enter your domain
6. Railway will show you what DNS records to add

---

## 📋 Complete DNS Configuration

Here's what your final DNS should look like:

### Using A Records:
```
A      @      76.76.21.21                                    (Railway IP 1)
A      @      76.76.21.98                                    (Railway IP 2)
CNAME  www    web-production-xxxx.up.railway.app
CNAME  api    api-gateway-production-yyyy.up.railway.app
CNAME  auth   auth-service-production-zzzz.up.railway.app
CNAME  video  video-service-production-aaaa.up.railway.app
CNAME  chat   chat-service-production-bbbb.up.railway.app
```

### Using Cloudflare:
```
CNAME  @      web-production-xxxx.up.railway.app            (Proxied)
CNAME  www    web-production-xxxx.up.railway.app            (Proxied)
CNAME  api    api-gateway-production-yyyy.up.railway.app    (Proxied)
CNAME  auth   auth-service-production-zzzz.up.railway.app   (Proxied)
CNAME  video  video-service-production-aaaa.up.railway.app  (Proxied)
CNAME  chat   chat-service-production-bbbb.up.railway.app   (Proxied)
```

---

## ⏱️ DNS Propagation Time

- **Minimum**: 5 minutes
- **Typical**: 15-30 minutes
- **Maximum**: 48 hours (rare)

Check propagation: https://dnschecker.org

---

## ✅ Verify DNS Setup

```bash
# Check root domain
nslookup useconcinnity.com

# Check www subdomain
nslookup www.useconcinnity.com

# Check API subdomain
nslookup api.useconcinnity.com

# Check all subdomains
nslookup auth.useconcinnity.com
nslookup video.useconcinnity.com
nslookup chat.useconcinnity.com
```

All should return IP addresses (not errors).

---

## 🚨 Common Issues

### "CNAME not allowed for root domain"
- ✅ **Solution**: Use A records OR switch to Cloudflare

### "Railway not showing A records"
- ✅ **Solution**: Make sure you added the custom domain in Railway first
- ✅ Railway only shows A records after you add the domain

### "DNS not propagating"
- ✅ **Solution**: Wait 15-30 minutes, clear browser cache
- ✅ Check: https://dnschecker.org

### "SSL certificate error"
- ✅ **Solution**: Wait for Railway to provision SSL (5-10 minutes after DNS)
- ✅ Railway automatically handles SSL certificates

---

## 🎯 Recommended Approach

**For beginners**: Use **Cloudflare** (Option 2)
- Easiest setup
- Best features (CDN, DDoS protection, analytics)
- Free forever
- Works perfectly with Railway

**For advanced users**: Use **A Records** (Option 1)
- Works with any DNS provider
- No third-party dependency
- Direct connection to Railway

---

## 📞 Need Help?

- **Railway DNS Docs**: https://docs.railway.app/deploy/custom-domains
- **Cloudflare Setup**: https://developers.cloudflare.com/dns/
- **DNS Checker**: https://dnschecker.org

---

**Next Step**: Once DNS is configured, update Clerk redirect URLs and test your deployment!

