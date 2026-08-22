# Deployment Checklist

## Pre-Deployment Security Audit ✅

### 1. Environment Variables
- [x] All sensitive data in `.env.local` (not committed)
- [x] `.env.example` created with placeholder values
- [x] `.gitignore` excludes `.env*` files
- [x] No hardcoded API keys in code

### 2. API Security
- [x] Input validation on all endpoints
- [x] Rate limiting configured
- [x] Error messages don't expose internals
- [x] CORS configured properly
- [x] POST requests for mutations only

### 3. Middleware Security
- [x] Security headers implemented
- [x] Rate limiting on API routes
- [x] XSS protection
- [x] CSRF protection
- [x] Content Security Policy

### 4. Code Security
- [x] No sensitive data in client bundles
- [x] Server-side validation
- [x] SQL injection prevention
- [x] No `eval()` or `dangerouslySetInnerHTML`
- [x] Dependencies up to date

## Pre-Deployment Checklist ✅

### 1. Environment Setup
- [x] `.env.local` configured
- [x] `NEXT_PUBLIC_CONTACT_EMAIL` set
- [x] `NEXT_PUBLIC_WHATSAPP_NUMBER` set
- [x] `NEXT_PUBLIC_TELEGRAM_USERNAME` set
- [x] `NEXT_PUBLIC_SITE_URL` set
- [x] `RESEND_API_KEY` obtained from Resend

### 2. Content Review
- [x] All product images in `/public/images/`
- [x] All COA PDFs in `/public/coas/`
- [x] Blog content published
- [x] Legal pages complete (Terms, Privacy)
- [x] Contact information accurate

### 3. SEO Check
- [x] Meta tags on all pages
- [x] XML sitemap generated
- [x] robots.txt configured
- [x] Structured data implemented
- [x] Open Graph tags present
- [x] Canonical URLs set

### 4. Performance
- [x] Build successful
- [x] No TypeScript errors
- [x] No console errors
- [x] Images optimized
- [x] Code split properly

## Vercel Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: GHK Peptides UK website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ghkpep-site.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework Preset: **Next.js**
5. Build Command: `npm run build`
6. Output Directory: `.next`
7. Install Command: `npm install`

#### Option B: Via CLI
```bash
npm i -g vercel
vercel login
vercel
```

### Step 3: Configure Environment Variables in Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=441234567890
NEXT_PUBLIC_TELEGRAM_USERNAME=your_username
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Important:** 
- Set variables for **Production**, **Preview**, and **Development**
- Never commit `.env.local` to GitHub

### Step 4: Configure Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain (e.g., ghkpep.com)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Step 5: Verify Deployment

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Emails send correctly
- [ ] Mobile responsive
- [ ] Speed test passes

## Post-Deployment Tasks

### 1. Google Search Console
```bash
# Submit sitemap
https://search.google.com/search-console
# Add property: your-domain.vercel.app
# Submit: https://your-domain.vercel.app/sitemap.xml
```

### 2. Google Analytics
- Create GA4 property
- Add measurement ID to environment variables
- Verify tracking works

### 3. Error Monitoring
- Set up Vercel Analytics
- Configure error tracking (Sentry recommended)
- Set up alerts

### 4. Backup Strategy
- Regular database backups (if using Supabase)
- Export important data weekly
- Store backups securely

## Security Monitoring

### Weekly Checks
- [ ] Review Vercel logs for errors
- [ ] Check rate limit hits
- [ ] Monitor failed login attempts
- [ ] Review API usage

### Monthly Checks
- [ ] Update dependencies: `npm audit fix`
- [ ] Review security headers
- [ ] Test all forms
- [ ] Check for broken links

### Quarterly Checks
- [ ] Penetration testing
- [ ] Code review
- [ ] Performance optimization
- [ ] SEO audit

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Check variable names match exactly
- Ensure variables are set for correct environment
- Redeploy after adding variables

### Emails Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for errors
- Ensure domain is verified

### Images Not Loading
- Check image paths in products.ts
- Verify images exist in /public/images/
- Check file permissions

## Rollback Plan

If deployment has issues:

1. **Vercel Dashboard**: Deployments → Previous deployment → Promote to Production
2. **CLI**: `vercel rollback`

## Support

- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/docs
- Next.js Docs: https://nextjs.org/docs

## Emergency Contacts

- Hosting (Vercel): support@vercel.com
- Email (Resend): support@resend.com
- Domain Registrar: [Your registrar support]

---

**Last Updated:** 2026-08-22
**Next Review:** 2026-09-22
