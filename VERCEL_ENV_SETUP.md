# Vercel Environment Variables Setup

## Required Environment Variables

Add these to your Vercel project:

### 1. RESEND_API_KEY
**Purpose**: Email sending service API key  
**Where to get**: https://resend.com/api-keys  
**Example**: `re_1234567890_abcdefghijklmnopqrstuvwxyz`

### 2. SUPPORT_EMAIL
**Purpose**: Where contact form submissions are sent  
**Value**: `support@ghkpep.com`  
**Change to**: Your actual support email address

### 3. NEXT_PUBLIC_SITE_URL
**Purpose**: Full URL of your site (for email links)  
**Value**: `https://ghkpep.com`  
**Change to**: Your actual domain

## How to Add in Vercel

1. Go to https://vercel.com/dashboard
2. Select your GHK project
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar
5. Click **Add** button
6. Enter:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
   - **Environment**: Production, Preview, Development (all)
7. Repeat for all 3 variables
8. Click **Save**
9. Go to **Deployments** tab
10. Click **Redeploy** on latest deployment

## Quick Copy-Paste

```bash
RESEND_API_KEY=re_your_key_here
SUPPORT_EMAIL=support@ghkpep.com
NEXT_PUBLIC_SITE_URL=https://ghkpep.com
```

## Testing After Setup

1. **Contact Form**: Visit `/contact` and submit
2. **Newsletter**: Sign up in footer
3. **Login Code**: Click "Email me a sign-in code" on `/login`

## Troubleshooting

### "Email service not configured" error
- ✅ RESEND_API_KEY not set
- ❌ Solution: Add the environment variable and redeploy

### Emails not sending
- ✅ Check Vercel Function Logs
- ✅ Verify API key is correct
- ✅ Check Resend dashboard for errors

### Emails going to spam
- ✅ Verify your domain in Resend
- ✅ Add SPF/DKIM/DMARC DNS records
- ✅ Wait 24-48 hours for DNS propagation

## DNS Records for ghkpep.com

After verifying domain in Resend, add these DNS records:

### SPF Record (TXT)
```
Type: TXT
Name: @
Value: v=spf1 include:resend._spf.resend.dev ~all
```

### DKIM Record (TXT)
```
Type: TXT
Name: resend._domainkey
Value: (copy from Resend dashboard)
```

### DMARC Record (TXT)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@ghkpep.com
```

## Cost Breakdown

**Resend Free Tier**:
- 100 emails/day
- 3,000 emails/month
- Perfect for starting out

**Resend Pro** ($15/month):
- 50,000 emails/month
- Custom domain
- Priority support
- Analytics

**Recommendation**: Start with free tier, upgrade when needed

---

**Setup Time**: 5 minutes  
**Difficulty**: Easy  
**Cost**: Free to start
