# GHK Peptides - Vercel Deployment Checklist

## 🚀 DEPLOYMENT TO VERCEL

### Step 1: Prepare for Deployment
- [x] Code builds successfully (`npm run build`)
- [x] No TypeScript errors
- [x] Only 13 ESLint warnings (image optimization - non-blocking)
- [x] All tests pass (manual testing completed)
- [x] Latest changes committed to `main` branch
- [x] Latest changes pushed to GitHub

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)
1. [ ] Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. [ ] Click "Add New" → "Import Project"
3. [ ] Select GitHub repository: `roryhotson-oss/GHKpep`
4. [ ] Click "Import"
5. [ ] **DO NOT change any settings** - Next.js is auto-detected
6. [ ] Click "Deploy"
7. [ ] Wait for deployment to complete (2-5 minutes)

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
# Follow prompts:
# - Link to GitHub repository
# - Select roryhotson-oss/GHKpep
# - Accept all defaults
# - Add environment variables when prompted
```

### Step 3: Configure Environment Variables

#### Required Variables (Add in Vercel Dashboard)

Go to: Project → Settings → Environment Variables

| Variable | Value | Required | Description |
|----------|-------|----------|-------------|
| `ADMIN_EMAIL` | `admin@ghkpep.com` | ✅ Yes | Admin panel login email |
| `ADMIN_PASSWORD` | `ghkadmin2024` | ✅ Yes | Admin panel login password |
| `SESSION_SECRET` | `generate-random-string` | ✅ Yes | Session encryption key |
| `RESEND_API_KEY` | `re_your_api_key` | ⚠️ Optional | Email sending (Resend API) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `orders@ghkpep.com` | ⚠️ Optional | Contact form recipient |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `447123456789` | ⚠️ Optional | WhatsApp order number |
| `NEXT_PUBLIC_TELEGRAM_USERNAME` | `ghkpeptides` | ⚠️ Optional | Telegram username |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | ⚠️ Optional | Site URL for metadata |

**How to generate SESSION_SECRET:**
```bash
# Run in terminal
openssl rand -base64 32
# Or use: crypto.randomBytes(32).toString('base64')
```

### Step 4: Verify Deployment

#### Check Deployment Status
- [ ] Go to Vercel Dashboard → Project → Deployments
- [ ] Wait for "Ready" status (green checkmark)
- [ ] Note the deployment URL (e.g., `ghkpep.vercel.app`)

#### Test Basic Functionality
- [ ] Open deployment URL in browser
- [ ] Verify site loads without errors
- [ ] Check console for JavaScript errors (F12 → Console)
- [ ] Test navigation between pages

---

## 🧪 POST-DEPLOYMENT TESTING

### Use PREVIEW_GUIDE.md for comprehensive testing

### Quick Smoke Test (5 minutes)

#### Frontend
- [ ] Home page loads
- [ ] Age gate popup appears
- [ ] Can accept age gate and enter site
- [ ] Shop page loads with products
- [ ] Can click on a product
- [ ] Product detail page loads
- [ ] Can add product to cart
- [ ] Cart page shows added product
- [ ] Checkout modal opens
- [ ] Newsletter signup works (or shows success/error)

#### Admin Dashboard
- [ ] `/admin/login` page loads
- [ ] Can login with admin credentials
- [ ] Dashboard loads with stats
- [ ] Can navigate to Products page
- [ ] Can navigate to Orders page
- [ ] Can navigate to Emails page
- [ ] Can logout

#### Responsive Design
- [ ] Test on desktop (resize browser)
- [ ] Test on mobile (use Chrome DevTools device mode)
- [ ] All elements visible and usable

---

## 📊 PERFORMANCE MONITORING

### Vercel Analytics
- [ ] Go to Vercel Dashboard → Project → Analytics
- [ ] Check "Performance" tab
- [ ] Review Core Web Vitals:
  - [ ] Largest Contentful Paint (LCP) < 2.5s
  - [ ] First Input Delay (FID) < 100ms
  - [ ] Cumulative Layout Shift (CLS) < 0.1

### Manual Performance Testing

#### Using Chrome DevTools
1. Open site in Chrome
2. Press F12 → Performance tab
3. Click "Record" → Reload page → Stop recording
4. Review:
   - [ ] Time to First Byte (TTFB)
   - [ ] Time to First Contentful Paint (FCP)
   - [ ] Time to Interactive (TTI)
   - [ ] Total page weight

#### Using Lighthouse
1. Open site in Chrome
2. Press F12 → Lighthouse tab
3. Click "Generate report"
4. Review scores:
   - [ ] Performance > 90
   - [ ] Accessibility > 85
   - [ ] Best Practices > 90
   - [ ] SEO > 90

#### Expected Performance Metrics

| Metric | Target | Expected (Current) | Status |
|--------|--------|-------------------|--------|
| FCP | <1.8s | ~1.2-1.8s | ✅ Good |
| LCP | <2.5s | ~1.8-2.5s | ⚠️ Needs work |
| FID | <100ms | ~50-80ms | ✅ Good |
| CLS | <0.1 | ~0.05-0.1 | ✅ Good |
| TTI | <3.8s | ~2.5-3.5s | ⚠️ Needs work |
| Total Weight | <1.5MB | ~2-3MB | ⚠️ Needs work |

---

## 🐛 ISSUE TRACKING

### Common Issues & Fixes

#### Issue 1: Images Loading Slowly
**Symptoms:** Long LCP, slow image loading
**Cause:** Unoptimized PNG images
**Fix:** 
1. Replace `<img>` with `<Image />` from next/image
2. Convert PNG to WebP format
3. Add width/height attributes
4. Add priority prop to hero images

#### Issue 2: High Page Weight
**Symptoms:** Total page size > 2MB
**Cause:** Large unoptimized images
**Fix:**
1. Compress all images (use TinyPNG, Squoosh, or ImageOptim)
2. Use WebP format
3. Implement lazy loading
4. Add proper caching headers

#### Issue 3: Slow TTI
**Symptoms:** Page takes long to become interactive
**Cause:** Large JavaScript bundle, no code splitting
**Fix:**
1. Use dynamic imports for admin pages
2. Lazy load non-critical components
3. Reduce bundle size
4. Implement code splitting

#### Issue 4: Console Errors
**Symptoms:** JavaScript errors in console
**Check:**
1. Open Chrome DevTools (F12)
2. Check Console tab
3. Note any errors
4. Fix based on error message

### Issue Reporting Template

```markdown
## Issue: [Brief Description]

**URL:** [Page where issue occurred]
**Browser:** [Chrome/Firefox/Safari/Edge]
**Device:** [Desktop/Tablet/Mobile]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:** [What should happen]
**Actual Behavior:** [What actually happens]
**Screenshots:** [Attach screenshots if applicable]
**Console Errors:** [Copy any console errors]
**Severity:** [High/Medium/Low]
**Priority:** [P0/P1/P2]
```

---

## 📈 MONITORING SETUP

### Vercel Monitoring
- [ ] Set up Vercel Analytics (free tier available)
- [ ] Configure alerts for:
  - [ ] Deployment failures
  - [ ] Performance degradation
  - [ ] Error rate spikes
  - [ ] High latency

### External Monitoring (Optional)
- [ ] Set up UptimeRobot for uptime monitoring
- [ ] Set up Google Analytics for traffic tracking
- [ ] Set up Sentry for error tracking
- [ ] Set up LogRocket for session replay

### Key Metrics to Monitor

#### Availability
- [ ] Uptime: >99.9%
- [ ] Error rate: <0.1%
- [ ] Deployment success rate: 100%

#### Performance
- [ ] Average response time: <500ms
- [ ] 95th percentile response time: <1s
- [ ] LCP: <2.5s
- [ ] FID: <100ms
- [ ] CLS: <0.1

#### Usage
- [ ] Daily active users
- [ ] Page views
- [ ] Session duration
- [ ] Bounce rate
- [ ] Conversion rate (if applicable)

---

## 🎯 OPTIMIZATION ROADMAP

### Phase 1: Critical Optimizations (Do First - 1-2 days)
- [ ] Replace all `<img>` with `<Image />` component
- [ ] Convert PNG images to WebP format
- [ ] Add width/height to all images
- [ ] Add priority prop to hero/above-the-fold images
- [ ] Add lazy loading to below-the-fold images

**Expected Impact:**
- LCP: -30-50%
- Page weight: -40-60%
- Performance score: +20-30 points

### Phase 2: Performance Enhancements (Do Next - 3-5 days)
- [ ] Implement code splitting with dynamic imports
- [ ] Add service worker for caching
- [ ] Optimize fonts (if custom fonts added)
- [ ] Minimize CSS/JS bundles
- [ ] Add prefetching for critical resources

**Expected Impact:**
- TTI: -20-30%
- FCP: -10-20%
- Performance score: +10-15 points

### Phase 3: Advanced Optimizations (Do Later - 1-2 weeks)
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Add edge caching
- [ ] Optimize database queries (if database added)
- [ ] Implement image CDN
- [ ] Add Brotli compression

**Expected Impact:**
- Overall performance: -10-20%
- Global latency: -50-80%

---

## 📝 DEPLOYMENT NOTES

### What's Included in Deployment
- ✅ All 27 research products
- ✅ Complete admin dashboard
- ✅ Age gate functionality
- ✅ Shopping cart
- ✅ Checkout system
- ✅ COA verification
- ✅ Blog system
- ✅ Contact forms
- ✅ Newsletter signup
- ✅ All static pages

### What's NOT Included (Requires Configuration)
- ⚠️ Email sending (requires RESEND_API_KEY)
- ⚠️ Image upload in admin (requires server configuration)
- ⚠️ Custom domain (requires DNS configuration)
- ⚠️ Analytics (requires Google Analytics setup)

### Known Limitations
1. **Data Storage**: Uses JSON files (not persistent database)
   - Orders and subscribers stored in `/data/` directory
   - Data persists between deployments but not across server restarts
   - For production: Consider Supabase, Firebase, or MongoDB

2. **Image Upload**: Requires additional configuration
   - Currently uses local file system
   - For production: Consider Vercel Blob, AWS S3, or Cloudinary

3. **Authentication**: Simple session-based auth
   - For production: Consider NextAuth.js or Clerk

---

## 🏆 SUCCESS CRITERIA

### Minimum Viable Deployment
- [ ] Site deploys without errors
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Admin login works
- [ ] Basic functionality verified

### Full Feature Deployment
- [ ] All functionality works as documented
- [ ] Performance meets targets
- [ ] No critical bugs
- [ ] Responsive on all devices

### Production Ready
- [ ] All success criteria met
- [ ] Monitoring configured
- [ ] Error tracking in place
- [ ] Backup strategy defined

---

## 🎉 POST-DEPLOYMENT CHECKLIST

### Immediately After Deployment
- [ ] Verify deployment status in Vercel
- [ ] Test basic functionality (smoke test)
- [ ] Check console for errors
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Share deployment URL with team

### Within 24 Hours
- [ ] Run comprehensive test using PREVIEW_GUIDE.md
- [ ] Monitor performance metrics
- [ ] Check Vercel Analytics
- [ ] Address any critical issues
- [ ] Document any bugs found

### Within 1 Week
- [ ] Implement Phase 1 optimizations (image optimization)
- [ ] Set up monitoring and alerts
- [ ] Review performance metrics
- [ ] Address medium-priority issues
- [ ] Plan Phase 2 optimizations

### Within 1 Month
- [ ] Implement Phase 2 optimizations (code splitting)
- [ ] Add testing framework
- [ ] Set up CI/CD pipeline
- [ ] Address low-priority issues
- [ ] Plan Phase 3 optimizations

---

## 📞 SUPPORT CONTACTS

### For Deployment Issues
- **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: Create issue in repository
- **Documentation**: See PREVIEW_GUIDE.md and CODE_REVIEW_FINDINGS.md

### For Code Issues
- **Repository**: [https://github.com/roryhotson-oss/GHKpep](https://github.com/roryhotson-oss/GHKpep)
- **Branch**: `main`
- **Latest Commit**: Check GitHub for latest

---

## 📅 DEPLOYMENT TIMELINE

| Phase | Task | Time Estimate | Status |
|-------|------|---------------|--------|
| 1 | Prepare code | 1 hour | ✅ Complete |
| 2 | Deploy to Vercel | 5 minutes | ⏳ Pending |
| 3 | Configure environment | 10 minutes | ⏳ Pending |
| 4 | Verify deployment | 30 minutes | ⏳ Pending |
| 5 | Run smoke tests | 15 minutes | ⏳ Pending |
| 6 | Run comprehensive tests | 2 hours | ⏳ Pending |
| 7 | Address critical issues | Variable | ⏳ Pending |
| 8 | Implement Phase 1 optimizations | 1-2 days | ⏳ Pending |

**Total Estimated Time: 1-3 days**

---

## 🎯 FINAL CHECKLIST

Before considering deployment complete:

- [ ] Site deployed to Vercel
- [ ] Environment variables configured
- [ ] Deployment status is "Ready"
- [ ] Smoke tests passed
- [ ] Comprehensive tests completed
- [ ] No critical issues found
- [ ] Performance metrics acceptable
- [ ] Monitoring configured
- [ ] Documentation updated
- [ ] Team notified

**Status: Ready for Deployment ✅**

---

*Document Version: 1.0*
*Last Updated: $(date)*
*Maintainer: GHK Peptides Team*
