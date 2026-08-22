# 🚀 DEPLOYMENT CHECKLIST - GitHub & Vercel

## Pre-Deployment Checklist ✅

Before deploying, verify:

- [x] All dummy/placeholder information removed
- [x] Environment variables configured in `.env.local`
- [x] `.gitignore` excludes `.env.local`
- [x] All tests pass
- [x] Build succeeds (`npm run build`)
- [x] No hardcoded secrets in code
- [x] All content pages complete
- [x] Blog posts complete
- [x] COA generation working
- [x] Security measures implemented

---

## Part 1: GitHub Setup (Private Repository)

### Step 1: Initialize Git Repository

```bash
cd /home/user/ghkpep-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: GHK Peptides UK - Production ready"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon in top right → **"New repository"**
3. Fill in:
   - **Repository name**: `ghkpep-site`
   - **Description**: `GHK Peptides UK - Premium research peptides website`
   - **⚠️ IMPORTANT**: Select **"Private"** (not public)
   - **Do NOT** initialize with README, .gitignore, or license
4. Click **"Create repository"**

### Step 3: Connect and Push

```bash
# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ghkpep-site.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Verify Private Repository

- [ ] Go to your repository on GitHub
- [ ] Verify "Private" badge is visible
- [ ] Check all files are uploaded
- [ ] Verify `.env.local` is NOT in repository
- [ ] Check `.gitignore` is present

---

## Part 2: Vercel Deployment

### Step 1: Sign Up for Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find **"ghkpep-site"** in your repositories
3. Click **"Import"**
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Build Settings

Verify these settings:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 4: Add Environment Variables

**⚠️ CRITICAL**: Add ALL environment variables before deploying.

Click **"Environment Variables"** and add these:

```env
# Contact Information (Public)
NEXT_PUBLIC_CONTACT_EMAIL=your-actual-email@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=441234567890
NEXT_PUBLIC_TELEGRAM_USERNAME=your_actual_username

# Site URL (will be updated after first deploy)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Email API (Get from https://resend.com)
RESEND_API_KEY=re_your_actual_api_key_here

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important Notes**:
- Set variables for **Production**, **Preview**, and **Development**
- Replace placeholder values with your actual information
- Get Resend API key from [resend.com](https://resend.com)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Vercel will show:
   - Build logs
   - Preview URL
   - Production URL

### Step 6: Verify Deployment

- [ ] Visit your production URL
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Images load properly
- [ ] Contact form works
- [ ] Newsletter signup works
- [ ] COA download works
- [ ] Mobile responsive
- [ ] No console errors

---

## Part 3: Get Resend API Key

### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Click **"Get Started"**
3. Sign up with email or GitHub
4. Verify your email

### Step 2: Verify Domain

1. Go to **"Domains"** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `ghkpep.com` or Vercel URL)
4. Add DNS records:
   - **TXT record** for SPF
   - **TXT record** for DKIM
   - **TXT record** for DMARC (optional)

### Step 3: Get API Key

1. Go to **"API Keys"**
2. Click **"Create API Key"**
3. Name it: "GHK Peptides Production"
4. Copy the key (starts with `re_`)
5. Add to Vercel environment variables

### Step 4: Test Email

1. Go to your deployed site
2. Submit contact form
3. Verify you receive email
4. Check confirmation email sent to user

---

## Part 4: Custom Domain (Optional)

### Step 1: Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Enter your domain (e.g., `ghkpep.com`)
3. Click **"Add"**

### Step 2: Configure DNS

**For root domain (ghkpep.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for Propagation

- DNS changes: 5 minutes to 48 hours
- SSL certificate: Automatic
- Green checkmark when verified

### Step 4: Update Environment Variable

1. Update `NEXT_PUBLIC_SITE_URL` in Vercel:
   ```
   NEXT_PUBLIC_SITE_URL=https://ghkpep.com
   ```
2. Redeploy

---

## Part 5: Post-Deployment Tasks

### Immediate (Today)

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Test all functionality
- [ ] Verify email sending
- [ ] Check mobile responsiveness

### This Week

- [ ] Publish 2-3 more blog posts
- [ ] Set up error monitoring
- [ ] Configure uptime monitoring
- [ ] Review analytics setup
- [ ] Test all CTAs

### This Month

- [ ] Build initial backlinks
- [ ] Monitor keyword rankings
- [ ] Publish 4-8 more blog posts
- [ ] Optimize based on analytics
- [ ] Engage in research communities

---

## 🔍 Verification Checklist

### Functionality
- [ ] Homepage loads
- [ ] All product pages work
- [ ] Shopping cart functions
- [ ] Checkout modal opens
- [ ] WhatsApp/Telegram links work
- [ ] Email links work
- [ ] Contact form submits
- [ ] Newsletter signup works
- [ ] COA downloads work
- [ ] Blog posts display
- [ ] Search functionality works
- [ ] All navigation works

### Content
- [ ] No dummy/placeholder text
- [ ] All images load
- [ ] All product info correct
- [ ] Blog content complete
- [ ] Legal pages complete
- [ ] Contact info correct
- [ ] No broken links

### Security
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] Rate limiting works
- [ ] Form validation works
- [ ] No console errors
- [ ] No sensitive data exposed

### Performance
- [ ] Page load < 3 seconds
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] No render blocking
- [ ] Core Web Vitals good

### SEO
- [ ] Meta tags present
- [ ] Sitemap accessible
- [ ] robots.txt correct
- [ ] Structured data valid
- [ ] Open Graph tags work
- [ ] Canonical URLs set

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Solution**:
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build

# Check for errors
npm run build 2>&1 | grep error
```

### Environment Variables Not Working

**Check**:
- Variable names match exactly
- Set for correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check Vercel logs

### Emails Not Sending

**Check**:
- Resend API key is correct
- Domain is verified in Resend
- DNS records are correct
- Check Resend dashboard for errors
- Check spam folder

### Images Not Loading

**Check**:
- Images exist in `/public/images/`
- Image paths correct in products.ts
- Images committed to GitHub
- File permissions correct

### Custom Domain Not Working

**Check**:
- Wait 24-48 hours for DNS
- DNS records are correct
- Domain verified in Vercel
- Clear browser cache

---

## 📞 Support Resources

### Documentation
- `README.md` - Project setup
- `DEPLOYMENT_GUIDE_FINAL.md` - Detailed deployment
- `SECURITY.md` - Security details
- `SEO_STRATEGY.md` - SEO guide

### External Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Resend Docs: https://resend.com/docs
- GitHub Docs: https://docs.github.com

### Getting Help
- Vercel Support: https://vercel.com/support
- Resend Support: support@resend.com
- GitHub Support: https://support.github.com

---

## ✅ Final Checklist

Before going live, verify:

### Code
- [ ] All dummy info removed
- [ ] Environment variables set
- [ ] No hardcoded secrets
- [ ] Build succeeds
- [ ] Tests pass

### Content
- [ ] All pages complete
- [ ] Blog posts complete
- [ ] Product info correct
- [ ] Images optimized
- [ ] No broken links

### Security
- [ ] Security headers working
- [ ] Rate limiting active
- [ ] Input validation working
- [ ] HTTPS enforced
- [ ] No vulnerabilities

### Deployment
- [ ] GitHub repository private
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate active

### Functionality
- [ ] All features working
- [ ] Forms submitting
- [ ] Emails sending
- [ ] COAs generating
- [ ] Mobile responsive

### SEO
- [ ] Sitemap submitted
- [ ] Analytics configured
- [ ] Meta tags verified
- [ ] Structured data valid
- [ ] Performance good

---

## 🎉 You're Ready!

Your GHK Peptides website is:
- ✅ **Secure** - Enterprise-grade security
- ✅ **SEO Optimized** - Ready to rank
- ✅ **Complete** - All features implemented
- ✅ **Professional** - Production-ready quality
- ✅ **Documented** - Complete guides included

**Next Steps**:
1. Push to GitHub (private)
2. Deploy to Vercel
3. Configure environment variables
4. Get Resend API key
5. Test everything
6. Submit to Google
7. Start marketing!

---

**🚀 Good luck with your deployment!**

**Last Updated**: August 22, 2026  
**Status**: ✅ Ready for Production Deployment
