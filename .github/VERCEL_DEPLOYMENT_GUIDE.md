# Vercel Deployment Guide for GHK Peptides

## 🚀 Quick Start

This guide will help you deploy the GHK Peptides site to Vercel from GitHub.

## ⚙️ Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Push this code to your GitHub account
3. **Required Environment Variables** - Prepare your secrets

## 📋 Required Environment Variables

### Production Variables (Required)
```env
# Admin Panel
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=strong-unique-password-here
SESSION_SECRET=generate-64-char-random-string

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=sales@ghkpep.com
RESEND_FROM_NAME=GHK Peptides

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=support@ghkpep.com
NEXT_PUBLIC_ORDERS_EMAIL=orders@ghkpep.com
NEXT_PUBLIC_PRIVACY_EMAIL=privacy@ghkpep.com
NEXT_PUBLIC_SOCIAL_EMAIL=social@ghkpep.com
NEXT_PUBLIC_WHATSAPP_NUMBER=447123456789
NEXT_PUBLIC_CONTACT_PHONE=441234567890

# Cloudflare Turnstile (Optional but recommended)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Payment URLs
NEXT_PUBLIC_ALIPAY_QR_URL=/images/alipay-qr.png
NEXT_PUBLIC_WISE_URL=https://your-wise-url
NEXT_PUBLIC_PAYPAL_URL=https://paypal.me/your-account
NEXT_PUBLIC_ALIPAY_URL=https://your-alipay-url
NEXT_PUBLIC_CRYPTO_PAYMENT_URL=https://your-crypto-url
NEXT_PUBLIC_BANK_TRANSFER_URL=https://your-bank-url

# Supabase (Optional - for database features)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Maintenance Mode
NEXT_PUBLIC_MAINTENANCE_MODE=false

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🎯 Deployment Steps

### Method 1: Automatic GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project" → "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all required variables from above
   - Mark sensitive variables (ADMIN_PASSWORD, SESSION_SECRET, API keys) as **Sensitive**

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-5 minutes)
   - Your site will be live at the provided URL

### Method 2: Using GitHub Actions (Already Configured)

1. **Set up GitHub Secrets**
   - Go to GitHub Repository → Settings → Secrets → Actions
   - Add these secrets:
     - `VERCEL_TOKEN` - Your Vercel API token (from Account Settings → Tokens)
     - `VERCEL_ORG_ID` - Your Vercel team/organization ID
     - `VERCEL_PROJECT_ID` - Your Vercel project ID

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **Watch the workflow run**
   - Go to Actions tab in GitHub
   - Watch the CI/CD pipeline execute
   - Deployment will happen automatically on successful build

## 📁 Project Structure Notes

- **`/public`** - Static files (images, etc.)
- **`/src`** - Source code
- **`/data`** - Local data files (products, orders, subscribers)
- **`.env.local`** - Local development environment variables (gitignored)
- **`next.config.js`** - Next.js configuration

## 🔧 Post-Deployment Checklist

### ✅ Verify Functionality
- [ ] Home page loads correctly
- [ ] Product pages display properly
- [ ] Contact form submits (test with real email)
- [ ] Admin panel accessible (if credentials set)
- [ ] Blog pages work
- [ ] Image optimization working

### ✅ Security Checks
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] No console errors or warnings
- [ ] All environment variables properly configured
- [ ] Admin routes protected
- [ ] Rate limiting functional

### ✅ SEO Verification
- [ ] Meta tags render correctly
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible
- [ ] Google Search Console verification

### ✅ Monitoring Setup
- [ ] Vercel Analytics connected (optional)
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring (optional)

## 🔄 Local Development

### Install Dependencies
```bash
npm install
```

### Create Environment File
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚨 Troubleshooting

### Build Errors
- **Missing environment variables**: Ensure all required variables are set
- **TypeScript errors**: Run `npm run lint` to see issues
- **Dependency issues**: Run `rm -rf node_modules package-lock.json && npm install`

### Deployment Errors
- **Vercel build timeout**: Increase build timeout in Vercel settings
- **Missing .env variables**: Add them in Vercel dashboard
- **Image optimization issues**: Check Next.js image configuration

### Common Issues
1. **Images not loading**: Ensure images are in `/public/images/` and paths are correct
2. **API routes failing**: Check environment variables in Vercel
3. **Admin login not working**: Verify ADMIN_EMAIL and ADMIN_PASSWORD in Vercel env vars

## 📞 Support

- **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Repository Issues**: Check GitHub Issues tab

## 🎉 Success!

Your GHK Peptides site should now be live on Vercel with automatic CI/CD from GitHub. Push to `main` branch to trigger new deployments.

**Default deployment URL**: `https://ghkpep.vercel.app` (or your custom domain if configured)