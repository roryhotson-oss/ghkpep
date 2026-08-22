# GHK Peptides UK

Premium research peptides supplier in the UK. Independently tested by Glyvantix Labs.

![GHK Peptides](https://ghkpep.com/images/og-image.jpg)

## 🚀 Features

- **27 Research Products** - BPC-157, GHK-Cu, MOTS-c, NAD+, and more
- **Independent Testing** - All peptides tested by Glyvantix Labs with full COA
- **Secure Checkout** - WhatsApp, Telegram, and Email ordering
- **Payment Options** - Alipay, Cryptocurrency, Bank Transfer
- **UK Shipping** - Free shipping over £150, same day dispatch
- **Blog & Resources** - Educational content about research peptides
- **SEO Optimized** - Fully optimized for search engines
- **Mobile Responsive** - Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend API
- **Deployment**: Vercel
- **Authentication**: Custom (email-based)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Resend API key (for email functionality)
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ghkpep-site.git
cd ghkpep-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=441234567890
NEXT_PUBLIC_TELEGRAM_USERNAME=your_username
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_TELEGRAM_USERNAME`
   - `NEXT_PUBLIC_SITE_URL`
   - `RESEND_API_KEY`
6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy.

## 🔒 Security Features

- ✅ Input validation on all forms
- ✅ Rate limiting on API routes
- ✅ Secure HTTP headers
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Environment variable encryption
- ✅ No sensitive data in client code

## 📊 SEO Features

- ✅ Dynamic meta tags
- ✅ XML Sitemap
- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Blog section with educational content
- ✅ Product-specific SEO

## 📁 Project Structure

```
ghkpep-site/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication
│   │   │   ├── contact/   # Contact form
│   │   │   └── newsletter/# Newsletter signup
│   │   ├── blog/          # Blog pages
│   │   ├── shop/          # Product pages
│   │   ├── cart/          # Shopping cart
│   │   ├── coa/           # Certificate of Analysis
│   │   └── ...            # Other pages
│   ├── components/        # React components
│   ├── data/             # Product data
│   └── lib/              # Utilities
├── public/               # Static files
│   ├── images/          # Product images
│   └── coas/            # COA PDFs
├── .env.example         # Environment variables template
├── .env.local          # Local environment variables
├── next.config.ts      # Next.js configuration
└── package.json        # Dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email address | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (no + or spaces) | Yes |
| `NEXT_PUBLIC_TELEGRAM_USERNAME` | Telegram username | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL | Yes |
| `RESEND_API_KEY` | Resend API key for emails | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key from Dashboard → API Keys
4. Add to environment variables

## 📝 Adding Products

Edit `src/data/products.ts` to add new products:

```typescript
{
  slug: 'your-product',
  name: 'Your Product Name',
  price: 99.99,
  boxPrice: 899.91,
  purity: '≥99%',
  category: 'category',
  categoryLabel: 'Category Label',
  description: 'Product description',
  lot: 'LOT-123',
  image: '/images/your-product.png',
}
```

## 🐛 Troubleshooting

### Images not loading
- Ensure images are in `/public/images/`
- Check image paths in `products.ts`
- Verify image file names match exactly

### Emails not sending
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for errors
- Ensure domain is verified in Resend

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors in console

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Support

For support, email support@ghkpep.com or join our Telegram channel.

## 📈 Roadmap

- [ ] Database integration (Supabase)
- [ ] User accounts and order history
- [ ] Subscription management
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app

## ⚠️ Disclaimer

This website sells research peptides for laboratory research purposes only. Products are not intended for human consumption. By using this site, you agree to our terms and conditions.

---

**Built with ❤️ by GHK Peptides UK**
