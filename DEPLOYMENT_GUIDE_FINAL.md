# 🚀 Complete Deployment Guide - GitHub & Vercel

## Overview
This guide provides step-by-step instructions to deploy your GHK Peptides website to GitHub (private repository) and Vercel.

---

## Part 1: GitHub Setup (Private Repository)

### Step 1: Initialize Git Repository

```bash
cd /home/user/ghkpep-site

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: GHK Peptides UK website - Production ready"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon in top right → **"New repository"**
3. Fill in:
   - **Repository name**: `ghkpep-site` (or your preferred name)
   - **Description**: "GHK Peptides UK - Premium research peptides website"
   - **⚠️ IMPORTANT**: Select **"Private"** (not public)
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub

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

1. Go to your repository on GitHub
2. You should see **"Private"** badge next to repository name
3. Only you (and collaborators you add) can see the code
4. Verify all files are uploaded correctly

### Security Note: Environment Variables
Your `.env.local` file is in `.gitignore`, so it will NOT be pushed to GitHub. This is correct - your secrets remain safe.

---

## Part 2: Vercel Deployment

### Step 1: Sign Up for Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"ghkpep-site"** and click **"Import"**
4. Vercel will auto-detect it's a Next.js project

### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 4: Add Environment Variables

**⚠️ CRITICAL**: You must add all environment variables in Vercel before deploying.

1. In the import screen, expand **"Environment Variables"**
2. Add these variables (click **"Add"** for each):

```env
# Contact Information (replace with your actual info)
NEXT_PUBLIC_CONTACT_EMAIL=your-actual-email@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=441234567890
NEXT_PUBLIC_TELEGRAM_USERNAME=your_actual_username

# Site URL (Vercel will provide this after first deploy)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Resend API Key (get from https://resend.com)
RESEND_API_KEY=re_your_actual_api_key_here

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important Notes:**
- Replace placeholder values with your actual information
- Get your Resend API key from [resend.com](https://resend.com)
- Set variables for **Production**, **Preview**, and **Development** environments

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 2-5 minutes)
3. Vercel will show:
   - Build logs
   - Preview URL
   - Production URL (after deployment)

### Step 6: Verify Deployment

1. Visit your production URL (e.g., `https://ghkpep-site.vercel.app`)
2. Test all functionality:
   - ✅ Homepage loads
   - ✅ Product pages work
   - ✅ Contact form submits
   - ✅ Newsletter signup works
   - ✅ Images load correctly
   - ✅ Mobile responsive

---

## Part 3: Get Resend API Key

### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Click **"Get Started"**
3. Sign up with your email or GitHub

### Step 2: Verify Your Domain

1. Go to **"Domains"** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `ghkpep.com` or your Vercel URL)
4. Add the DNS records Resend provides:
   - **TXT record** for SPF
   - **TXT record** for DKIM
   - **TXT record** for DMARC (optional but recommended)

### Step 3: Get API Key

1. Go to **"API Keys"** in Resend dashboard
2. Click **"Create API Key"**
3. Name it: "GHK Peptides Production"
4. Copy the key (starts with `re_`)
5. Add it to Vercel environment variables

### Step 4: Test Email Sending

1. Go to your deployed site
2. Submit the contact form
3. Check if you receive the email
4. Verify both emails (to you and confirmation to user)

---

## Part 4: Custom Domain (Optional)

### Step 1: Add Custom Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `ghkpep.com`)
4. Click **"Add"**

### Step 2: Configure DNS

Vercel will show you DNS records to add. Common setup:

**For root domain (ghkpep.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.ghkpep.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Vercel will automatically provision SSL certificate
- You'll see green checkmark when domain is verified

### Step 4: Update Environment Variable

1. In Vercel, go to **"Settings"** → **"Environment Variables"**
2. Update `NEXT_PUBLIC_SITE_URL` to your custom domain:
   ```
   NEXT_PUBLIC_SITE_URL=https://ghkpep.com
   ```
3. Redeploy your project

---

## Part 5: Post-Deployment Checklist

### Security Verification
- [ ] Environment variables set in Vercel
- [ ] `.env.local` not in GitHub repository
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers present (check browser dev tools)
- [ ] Rate limiting working (test by submitting forms rapidly)

### Functionality Testing
- [ ] All pages load correctly
- [ ] Product images display
- [ ] Contact form sends emails
- [ ] Newsletter signup works
- [ ] Shopping cart functions
- [ ] Mobile responsive design

### SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Verify meta tags on all pages
- [ ] Test structured data with Google's tool

### Performance Testing
- [ ] Page load speed < 3 seconds
- [ ] Mobile performance good
- [ ] Images optimized
- [ ] No console errors

---

## Part 6: Ongoing Maintenance

### Weekly Tasks
- [ ] Check Vercel analytics
- [ ] Review error logs
- [ ] Monitor form submissions
- [ ] Check email delivery

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review security headers
- [ ] Check for broken links
- [ ] Update blog content

### Quarterly Tasks
- [ ] Full security audit
- [ ] Performance optimization
- [ ] Content review and updates
- [ ] Backup important data

---

## Troubleshooting

### Build Fails on Vercel

**Problem**: Build fails with errors

**Solutions**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Check for TypeScript errors
npm run build 2>&1 | grep error
```

### Environment Variables Not Working

**Problem**: Site shows placeholder text or features don't work

**Solutions**:
1. Verify variable names match exactly
2. Ensure variables are set for correct environment (Production/Preview/Development)
3. Redeploy after adding variables
4. Check Vercel logs for errors

### Emails Not Sending

**Problem**: Contact form or newsletter doesn't send emails

**Solutions**:
1. Verify Resend API key is correct
2. Check domain is verified in Resend
3. Check Resend dashboard for errors
4. Verify DNS records are correct
5. Check spam folder

### Images Not Loading

**Problem**: Product images don't display

**Solutions**:
1. Verify images exist in `/public/images/`
2. Check image paths in `products.ts`
3. Ensure image files are committed to GitHub
4. Check file permissions

### Custom Domain Not Working

**Problem**: Custom domain not loading

**Solutions**:
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain is verified in Vercel
4. Clear browser cache

---

## Security Best Practices

### Never Commit
- ❌ `.env.local`
- ❌ API keys
- ❌ Passwords
- ❌ Database credentials
- ❌ Private keys

### Always Use
- ✅ Environment variables
- ✅ HTTPS (automatic on Vercel)
- ✅ Input validation
- ✅ Rate limiting
- ✅ Security headers

### Regular Tasks
- ✅ Update dependencies monthly
- ✅ Review access logs
- ✅ Monitor for suspicious activity
- ✅ Backup important data

---

## Support Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Resend Docs: https://resend.com/docs
- GitHub Docs: https://docs.github.com

### Getting Help
- Vercel Support: https://vercel.com/support
- Resend Support: support@resend.com
- GitHub Support: https://support.github.com

---

## Deployment Summary

### What You've Accomplished
✅ Security-hardened application  
✅ SEO-optimized website  
✅ Professional COA system  
✅ Complete content pages  
✅ Blog with educational content  
✅ Private GitHub repository  
✅ Vercel deployment  
✅ Email integration  
✅ Custom domain ready  

### Next Steps
1. **Immediate**: Get Resend API key and add to Vercel
2. **This Week**: Submit to Google Search Console
3. **This Month**: Publish more blog content
4. **Ongoing**: Monitor and optimize

---

**🎉 Congratulations! Your GHK Peptides website is now live and production-ready!**

**Last Updated**: August 22, 2026  
**Deployment Status**: ✅ Ready for Production
