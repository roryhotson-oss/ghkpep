# Vercel Deployment Guide - GHK Peptides

## 🚀 Quick Start: Deploy Now

### Step 1: Click to Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froryhotson-oss%2FGHKpep&project-name=ghk-peptides&repository-name=GHKpep)

**OR** follow the manual steps below.

---

## 📋 Manual Deployment Steps

### Step 1: Sign Up for Vercel
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub, Google, or Email
3. Complete the onboarding

### Step 2: Import the Project
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Import Project"**
3. Click **"Import Git Repository"**
4. Select the repository: **`roryhotson-oss/GHKpep`**
5. Click **"Import"**

### Step 3: Configure Project Settings

**DO NOT CHANGE these settings:**
- **Project Name**: Can be customized (e.g., `ghk-peptides`)
- **Root Directory**: Leave as `.` (root)
- **Build Command**: `npm run build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Framework Preset**: Next.js (auto-detected)

Click **"Deploy"**

### Step 4: Add Environment Variables (CRITICAL)

After deployment starts, go to:
**Project Settings → Environment Variables**

Add these variables:

```bash
# Required for Admin Panel
ADMIN_EMAIL=admin@ghkpep.com
ADMIN_PASSWORD=ghkadmin2024
SESSION_SECRET=your-random-secret-key-here

# Optional: Email Service (Resend)
RESEND_API_KEY=re_your_resend_api_key

# Optional: Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=orders@ghkpep.com
NEXT_PUBLIC_WHATSAPP_NUMBER=447123456789
NEXT_PUBLIC_TELEGRAM_USERNAME=ghkpeptides
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**To generate SESSION_SECRET:**
```bash
# Linux/Mac
openssl rand -base64 32

# Or use this (copy the output):
echo "ghk-peptides-secret-$(date +%s)-$(openssl rand -hex 16)"
```

### Step 5: Wait for Deployment
- Deployment takes **2-5 minutes**
- You'll see the progress in the Vercel dashboard
- Once complete, you'll get a **deployment URL** (e.g., `https://ghkpep.vercel.app`)

---

## ✅ Deployment Verification

### Step 1: Visit Your Deployment
1. Click the deployment URL in Vercel dashboard
2. Or go to: `https://[your-project-name].vercel.app`

### Step 2: Run Smoke Tests

#### Basic Functionality
- [ ] ✅ Site loads without errors
- [ ] ✅ Home page displays correctly
- [ ] ✅ Navigation works (click links)
- [ ] ✅ No console errors (F12 → Console)

#### Age Gate
- [ ] ✅ Age gate popup appears on first visit
- [ ] ✅ Must check both boxes to enter
- [ ] ✅ Error message shows if boxes not checked
- [ ] ✅ Can enter site after accepting

#### Products
- [ ] ✅ Shop page loads with products
- [ ] ✅ Can click on any product
- [ ] ✅ Product detail page loads
- [ ] ✅ Images display correctly

#### Cart
- [ ] ✅ Can add products to cart
- [ ] ✅ Cart page shows added items
- [ ] ✅ Can adjust quantities
- [ ] ✅ Can remove items

#### Admin
- [ ] ✅ `/admin/login` loads
- [ ] ✅ Can login with credentials
- [ ] ✅ Dashboard loads with stats
- [ ] ✅ Can navigate admin pages

---

## 🎯 Production Deployment

### Step 1: Deploy to Production
1. In Vercel dashboard, go to your project
2. Click **"Deployments"** tab
3. Your first deployment is automatically **production**
4. To promote a preview deployment:
   - Click the **"..."** menu on the deployment
   - Select **"Promote to Production"**

### Step 2: Add Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `ghkpep.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

**Recommended DNS Settings:**
```
Type: CNAME
Name: @ or www
Value: cname.vercel-dns.com
TTL: Auto
```

### Step 3: Configure SSL (Automatic)
- Vercel **automatically** provisions SSL certificates
- SSL is **free** and **automatic**
- Certificates are issued by Let's Encrypt
- No configuration needed

### Step 4: Set Up Monitoring

#### Vercel Analytics (Free)
1. Go to **Project Settings → Analytics**
2. Enable **"Vercel Analytics"**
3. View performance metrics in dashboard

#### Uptime Monitoring (Recommended)
1. Go to [https://uptimerobot.com](https://uptimerobot.com)
2. Create free account
3. Add new monitor
4. Set URL to your deployment
5. Set check interval to 5 minutes

---

## 📊 Performance Optimization

### Before Optimization
Run a baseline test:
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your deployment URL
3. Note the scores (Mobile & Desktop)

### Optimization Checklist

#### Phase 1: Image Optimization (High Impact)
- [ ] Replace `<img>` with `<Image />` from next/image
- [ ] Convert PNG to WebP format
- [ ] Add width/height attributes
- [ ] Add priority prop to hero images
- [ ] Add lazy loading to below-the-fold images

**Commands to convert images:**
```bash
# Install ImageMagick
brew install imagemagick  # Mac
sudo apt-get install imagemagick  # Ubuntu

# Convert all PNG to WebP
mogrify -format webp -quality 80 public/images/*.png
```

#### Phase 2: Code Optimization (Medium Impact)
- [ ] Implement code splitting with dynamic imports
- [ ] Add service worker for caching
- [ ] Minimize CSS/JS bundles
- [ ] Add prefetching for critical resources

#### Phase 3: Advanced Optimization (Low Impact)
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Add edge caching
- [ ] Optimize database queries (if using database)
- [ ] Implement image CDN

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: Deployment Fails
**Symptoms:** Deployment shows "Failed" status

**Solutions:**
1. Check deployment logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Fix any errors shown in logs
4. Push fixes to GitHub and redeploy

**Common Causes:**
- Missing environment variables
- Syntax errors in code
- Missing dependencies
- Build timeout (increase timeout in settings)

#### Issue: Images Not Loading
**Symptoms:** Broken image icons or 404 errors

**Solutions:**
1. Verify images exist in `/public/images/`
2. Check image paths are correct (start with `/images/`)
3. Verify case sensitivity (Linux servers are case-sensitive)
4. Check file permissions

#### Issue: Admin Login Not Working
**Symptoms:** Can't login to admin panel

**Solutions:**
1. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
2. Check `SESSION_SECRET` is set
3. Clear browser cookies and try again
4. Check Vercel function logs for errors

#### Issue: 404 on API Routes
**Symptoms:** API calls return 404

**Solutions:**
1. Verify route path in code matches URL
2. Check for typos in route files
3. Verify route is in correct directory (`/api/`)
4. Check Vercel function logs

#### Issue: Slow Performance
**Symptoms:** Pages load slowly

**Solutions:**
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Optimize images (Phase 1)
4. Implement code splitting (Phase 2)
5. Check server location (select closest region)

---

## 📈 Monitoring & Analytics

### Vercel Built-in Analytics
- **Performance**: Core Web Vitals, response times
- **Usage**: Page views, unique visitors
- **Functions**: Execution time, errors
- **Edge**: Cache hit rate, bandwidth

**Where to find:** Project Dashboard → Analytics tab

### Recommended External Tools

#### 1. Google Analytics
1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Create property
3. Get Measurement ID (e.g., `G-XXXXXXXXXX`)
4. Add to your site:
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

#### 2. Sentry (Error Tracking)
1. Go to [https://sentry.io](https://sentry.io)
2. Create project
3. Get DSN (Data Source Name)
4. Add to your site:
   ```bash
   npm install @sentry/nextjs
   # Add to .env.local
   NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
   ```

#### 3. LogRocket (Session Replay)
1. Go to [https://logrocket.com](https://logrocket.com)
2. Create project
3. Get App ID
4. Add to your site:
   ```bash
   npm install logrocket
   # Add to .env.local
   NEXT_PUBLIC_LOGROCKET_ID=your_app_id
   ```

---

## 🛡️ Security Best Practices

### Environment Variables
- ✅ **Never** commit `.env.local` to Git
- ✅ Use **Vercel Environment Variables** for secrets
- ✅ Mark sensitive variables as **"Sensitive"** in Vercel
- ✅ Rotate secrets regularly

### HTTPS
- ✅ **Automatic** with Vercel
- ✅ **A+** rating on SSL Labs
- ✅ **HSTS** headers included
- ✅ **No action needed**

### Security Headers
Already configured in `src/proxy.ts`:
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Permissions-Policy: camera=(), microphone=(), geolocation=()
- ✅ Content-Security-Policy
- ✅ Strict-Transport-Security (HSTS)

### Rate Limiting
Already configured in `src/proxy.ts`:
- ✅ 60 requests/minute for most API routes
- ✅ 5 requests/hour for contact form
- ✅ 3 requests/hour for newsletter
- ✅ 3 requests/15min for auth attempts

---

## 📚 Additional Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [GHK Peptides PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md)
- [GHK Peptides CODE_REVIEW_FINDINGS.md](./CODE_REVIEW_FINDINGS.md)
- [GHK Peptides DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### Support
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/community)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Discord](https://nextjs.org/discord)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Twitter](https://twitter.com/nextjs)
- [Vercel Twitter](https://twitter.com/vercel)

---

## 🎉 Deployment Complete!

Once you've completed all steps:

1. ✅ Site deployed to Vercel
2. ✅ Environment variables configured
3. ✅ Smoke tests passed
4. ✅ Comprehensive tests completed
5. ✅ Monitoring set up
6. ✅ Custom domain configured (optional)

**Your GHK Peptides website is now live!** 🎊

### Next Steps
1. Share the deployment URL with your team
2. Monitor performance for the first 24-48 hours
3. Address any issues that arise
4. Implement Phase 1 optimizations (image optimization)
5. Plan for future enhancements

---

## 📞 Need Help?

### Vercel Support
- **Live Chat**: Available in Vercel dashboard
- **Email**: support@vercel.com
- **Twitter**: @vercel
- **Docs**: https://vercel.com/docs

### Repository
- **Issues**: https://github.com/roryhotson-oss/GHKpep/issues
- **Pull Requests**: https://github.com/roryhotson-oss/GHKpep/pulls
- **Discussions**: https://github.com/roryhotson-oss/GHKpep/discussions

---

*Document Version: 1.0*
*Last Updated: $(date)*
*Maintainer: GHK Peptides Team*
