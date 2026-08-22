# GHKpep.com — Pharmaceutical-Grade Research Compounds

A Next.js e-commerce site for GHK, selling reference-grade research peptides to the UK market.

## Features

- Dark-themed, premium UI matching research industry standards
- 27 research compounds with GBP (£) pricing
- Box of 10 vials option (10% discount)
- Independent ISO 17025 testing documentation
- Certificate of Analysis (COA) verification system
- Age gate and researcher verification
- Payment via Alipay, Bank Transfer (BACS/CHAPS), and Cryptocurrency
- Shipping via Trusted Labs (UK tracked delivery)
- WhatsApp support integration
- UK GDPR-compliant privacy policy
- Fully responsive (mobile, tablet, desktop)

## Pages

- **/** — Homepage with hero, featured products, testing protocol
- **/shop** — Full product catalog with category filters
- **/shop/[slug]** — Individual product pages with vial/box options
- **/testing** — Testing standards and analytical methods
- **/quality** — Quality assurance commitment
- **/about** — Company story and principles
- **/contact** — Contact form with WhatsApp link
- **/coa** — Certificates of Analysis
- **/verify** — Batch verification tool
- **/cart** — Shopping cart with payment method selection
- **/shipping** — Shipping information (Trusted Labs)
- **/returns** — Returns and replacement policy
- **/terms** — Terms of Service (England & Wales)
- **/privacy** — Privacy Policy (UK GDPR)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deployment)

## Development

```bash
npm install
npm run dev
```

## Deployment

This project is configured for deployment on Vercel. Push to GitHub and connect to Vercel for automatic deployments.

```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ghkpep-site.git
git push -u origin main

# Or deploy via Vercel CLI
npm i -g vercel
vercel
```

## Company

**GHK** · ghkpep.com  
Research compounds for in-vitro laboratory use only.  
Not for human or veterinary consumption.
