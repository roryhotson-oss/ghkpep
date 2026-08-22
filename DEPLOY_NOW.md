# 🚀 DEPLOY GHK PEPTIDES TO VERCEL - NOW!

## One-Click Deploy

**The fastest way to deploy your GHK Peptides website:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froryhotson-oss%2FGHKpep&project-name=ghk-peptides&repository-name=GHKpep)

Click the button above, sign in to Vercel, and your site will be live in under 5 minutes!

---

## What You Get

✅ **Fully Functional Website**
- 27 research peptides catalog
- Shopping cart & checkout
- Admin dashboard with CRUD
- COA verification system
- Blog & educational content
- Contact forms & newsletter

✅ **Production Ready**
- Next.js 16 optimized
- Security headers configured
- Rate limiting on API routes
- SEO optimized
- Mobile responsive

✅ **Complete Documentation**
- Preview guide for testing
- Deployment checklist
- Code review findings
- Troubleshooting guide

---

## Manual Deployment (If you prefer)

### Step 1: Sign Up
Go to [https://vercel.com/signup](https://vercel.com/signup)

### Step 2: Import Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New" → "Import Project"**
3. Select **`roryhotson-oss/GHKpep`**
4. Click **"Import"**

### Step 3: Configure (2 minutes)
Add these environment variables in **Project Settings → Environment Variables**:

```bash
ADMIN_EMAIL=admin@ghkpep.com
ADMIN_PASSWORD=ghkadmin2024
SESSION_SECRET=your-random-secret-key
```

**Generate SESSION_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Deploy
Click **"Deploy"** and wait 2-5 minutes!

---

## After Deployment

### 1. Test Your Site
Visit your deployment URL and test:
- ✅ Home page loads
- ✅ Age gate works
- ✅ Products display
- ✅ Cart works
- ✅ Admin login works

**Full testing guide:** [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md)

### 2. Configure Domain (Optional)
1. Go to **Project Settings → Domains**
2. Add your domain (e.g., `ghkpep.com`)
3. Follow DNS instructions

### 3. Monitor Performance
1. Go to **Analytics** tab in Vercel
2. Check Core Web Vitals
3. Monitor error rates

**Optimization guide:** [CODE_REVIEW_FINDINGS.md](./CODE_REVIEW_FINDINGS.md)

---

## 📋 Quick Reference

| Task | Document | Time |
|------|----------|------|
| Deploy | This guide | 5 min |
| Test | [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md) | 30 min |
| Configure | [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) | 10 min |
| Optimize | [CODE_REVIEW_FINDINGS.md](./CODE_REVIEW_FINDINGS.md) | 1-2 days |
| Troubleshoot | [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | As needed |

---

## 🎯 Admin Access

After deployment:
1. Go to: `https://[your-domain].vercel.app/admin/login`
2. Login with:
   - **Email:** `admin@ghkpep.com`
   - **Password:** `ghkadmin2024`

---

## 📊 Expected Performance

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Build Time | ~1-2 min | <5 min | ✅ Good |
| Deployment Time | ~2-5 min | <10 min | ✅ Good |
| First Load | ~1.5-2s | <2s | ✅ Good |
| LCP | ~1.8-2.5s | <2.5s | ⚠️ Optimize |
| Page Weight | ~2-3MB | <1.5MB | ⚠️ Optimize |

**Improvement Guide:** See [CODE_REVIEW_FINDINGS.md](./CODE_REVIEW_FINDINGS.md)

---

## 🆘 Need Help?

### Common Issues

**"Deployment failed"**
- Check Vercel deployment logs
- Run `npm run build` locally
- Fix any errors shown

**"Images not loading"**
- Verify images in `/public/images/`
- Check paths start with `/images/`
- Test locally first

**"Admin login not working"**
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Check `SESSION_SECRET` is set
- Clear browser cookies

**Full troubleshooting:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🎉 You're Ready!

**Your GHK Peptides website is ready for production.**

Click the deploy button at the top, or follow the manual steps. Your site will be live in minutes!

---

## 📚 Documentation Index

### Essential Reading
1. **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - This guide (Quick deploy)
2. **[PREVIEW_GUIDE.md](PREVIEW_GUIDE.md)** - Complete testing guide
3. **[VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)** - Vercel-specific guide

### Technical Documentation
4. **[CODE_REVIEW_FINDINGS.md](CODE_REVIEW_FINDINGS.md)** - Code review & optimizations
5. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment
6. **[VERIFICATION_SUMMARY.md](VERIFICATION_SUMMARY.md)** - Build verification

### Existing Documentation
7. **[README.md](README.md)** - Project overview
8. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Original deployment guide
9. **[SECURITY.md](SECURITY.md)** - Security information
10. **[SEO_STRATEGY.md](SEO_STRATEGY.md)** - SEO strategy

---

## 💡 Pro Tips

1. **Use the one-click deploy button** - It's the fastest way
2. **Test locally first** - Run `npm run dev` to verify before deploying
3. **Check the preview guide** - [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md) has all test cases
4. **Monitor after deployment** - Watch Vercel Analytics for issues
5. **Optimize later** - Deploy first, optimize second

---

## 🚀 Ready, Set, Deploy!

**Your GHK Peptides website is production-ready.**

👉 **[Click here to deploy now!](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froryhotson-oss%2FGHKpep&project-name=ghk-peptides&repository-name=GHKpep)**

Or follow the manual steps above. Either way, you'll have a live site in minutes!

---

*Last Updated: $(date)*
*Maintainer: GHK Peptides Team*
