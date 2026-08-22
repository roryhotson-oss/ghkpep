# GHK Peptides - Live Preview Guide

## 🎯 Quick Preview Setup

### Option 1: Local Development (Recommended)

```bash
# Clone the repository
git clone https://github.com/roryhotson-oss/GHKpep.git
cd GHKpep

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your settings (optional for preview)
# ADMIN_EMAIL=admin@ghkpep.com
# ADMIN_PASSWORD=ghkadmin2024
# SESSION_SECRET=your-secret-key

# Start development server
npm run dev
```

**Preview URL**: http://localhost:3000

---

### Option 2: Vercel Preview Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Select the GitHub repository: `roryhotson-oss/GHKpep`
4. Click "Deploy"
5. Vercel will automatically deploy a preview

**Preview URL**: Provided by Vercel after deployment

---

## 🌐 What You'll See

### Public-Facing Site

#### 1. **Home Page** (`/`)
- ✅ Hero section with GHK branding
- ✅ Featured products grid (10 products)
- ✅ Trust badges marquee
- ✅ 8-Step Testing Protocol
- ✅ Product categories
- ✅ Why We're Different section
- ✅ COA Verification section
- ✅ Reviews/testimonials
- ✅ FAQ section
- ✅ Process overview

**Key Features to Test:**
- [ ] Click "Browse Catalog" button
- [ ] Click "View Testing Standards" button
- [ ] Scroll through all sections
- [ ] Hover over product cards
- [ ] Click on featured products

#### 2. **Age Gate Popup**
- ✅ Appears on first visit
- ✅ Requires checking both boxes
- ✅ "Enter GHK" button
- ✅ Persists in localStorage

**Key Features to Test:**
- [ ] Try to enter without checking boxes (should show error)
- [ ] Check both boxes and click Enter
- [ ] Refresh page (should remember acceptance)
- [ ] Clear localStorage and test again

#### 3. **Shop Page** (`/shop`)
- ✅ Product catalog with 27 research peptides
- ✅ Category filters
- ✅ Search functionality
- ✅ Product cards with images, pricing, descriptions

**Key Features to Test:**
- [ ] Filter by category (All, Recovery, Longevity, etc.)
- [ ] Click on any product card
- [ ] Hover over product cards
- [ ] Scroll through all products

#### 4. **Product Detail Page** (`/shop/[slug]`)
- ✅ Product image with Glyvantix Tested badge
- ✅ Purity badge
- ✅ Category label
- ✅ Product name and description
- ✅ Lot number
- ✅ Pricing (single vial & box of 10)
- ✅ Quantity selector
- ✅ Add to Cart button
- ✅ Product specifications
- ✅ Quality assurance info
- ✅ COA link

**Key Features to Test:**
- [ ] Click between vial and box pricing
- [ ] Increase/decrease quantity
- [ ] Click "View Certificate of Analysis" link
- [ ] Click "Add to Cart" button
- [ ] Test on multiple products

#### 5. **COA Page** (`/coa`)
- ✅ List of all COAs (27 certificates)
- ✅ Search by product name or lot number
- ✅ COA cards with summary info
- ✅ "View Full COA" button
- ✅ Modal with detailed COA information

**Key Features to Test:**
- [ ] Search for a specific product
- [ ] Click "View Full COA" on any certificate
- [ ] Review modal content
- [ ] Click "Download PDF Certificate" link
- [ ] Close modal with X button
- [ ] Click outside modal to close

#### 6. **Verify Page** (`/verify`)
- ✅ Lot number input field
- ✅ Verify button
- ✅ How to read your certificate section

**Key Features to Test:**
- [ ] Enter a lot number (e.g., GHK-2419-A)
- [ ] Click Verify button
- [ ] Click links to browse COAs or see testing methods

#### 7. **Cart Page** (`/cart`)
- ✅ Cart items list
- ✅ Quantity adjustment
- ✅ Remove item functionality
- ✅ Order summary
- ✅ Payment options display
- ✅ Checkout modal

**Key Features to Test:**
- [ ] Add products to cart from shop
- [ ] Increase/decrease quantity
- [ ] Remove an item
- [ ] Click "Proceed to Checkout"
- [ ] Test all payment buttons (WhatsApp, Telegram, Email)
- [ ] Close modal with X button
- [ ] Click outside modal to close

#### 8. **Checkout Modal**
- ✅ Order summary
- ✅ Payment options (WhatsApp, Telegram, Email)
- ✅ Order details
- ✅ Close button

**Key Features to Test:**
- [ ] Click each payment method button
- [ ] Verify message includes order details
- [ ] Close modal and return to cart

#### 9. **Newsletter Signup** (Footer)
- ✅ Email input field
- ✅ Subscribe button
- ✅ Success message popup
- ✅ Error message display

**Key Features to Test:**
- [ ] Enter valid email and subscribe
- [ ] See success message
- [ ] Enter invalid email and see error
- [ ] Wait for auto-dismiss (3 seconds)

#### 10. **Static Pages**
- [ ] `/about` - About GHK
- [ ] `/contact` - Contact form
- [ ] `/quality` - Quality assurance
- [ ] `/testing` - Testing standards
- [ ] `/shipping` - Shipping info
- [ ] `/returns` - Returns policy
- [ ] `/privacy` - Privacy policy
- [ ] `/terms` - Terms of service
- [ ] `/subscriptions` - Subscriptions info
- [ ] `/blog` - Blog listing
- [ ] `/blog/[slug]` - Blog post detail

**Key Features to Test:**
- [ ] Navigate to each page
- [ ] Test contact form submission
- [ ] Read blog posts
- [ ] Test all links

---

### Admin Dashboard

#### Access
1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `admin@ghkpep.com`
   - Password: `ghkadmin2024`
3. Click "Sign In"

#### 1. **Dashboard** (`/admin`)
- ✅ Stats cards (Revenue, Orders, Products, Subscribers)
- ✅ Revenue chart (last 6 months)
- ✅ Order status breakdown
- ✅ Recent orders table
- ✅ Top products list

**Key Features to Test:**
- [ ] View all statistics
- [ ] Hover over chart bars
- [ ] Click "View all orders" link
- [ ] Click "Manage Products" link
- [ ] Click "Send email" link

#### 2. **Products Page** (`/admin/products`)
- ✅ Products grid
- ✅ Search functionality
- ✅ Category filter
- ✅ Add Product button
- ✅ Edit/View/Delete buttons

**Key Features to Test:**
- [ ] Search for a product
- [ ] Filter by category
- [ ] Click "Add Product" button
- [ ] Click Edit on a product
- [ ] Click View on a product
- [ ] Test delete functionality (confirmation)

#### 3. **Add Product Page** (`/admin/products/new`)
- ✅ Product form with all fields
- ✅ Auto-generate slug from name
- ✅ Image upload
- ✅ Image preview
- ✅ Save button

**Key Features to Test:**
- [ ] Fill out all fields
- [ ] Upload an image
- [ ] See auto-generated slug
- [ ] Save product
- [ ] Return to products list

#### 4. **Edit Product Page** (`/admin/products/[slug]/edit`)
- ✅ Pre-filled form with product data
- ✅ Image preview
- ✅ Image upload/replace
- ✅ Update button
- ✅ Success/error messages

**Key Features to Test:**
- [ ] Edit product fields
- [ ] Upload new image
- [ ] Save changes
- [ ] See success message
- [ ] Return to products list

#### 5. **Orders Page** (`/admin/orders`)
- ✅ Orders list
- ✅ Status filters
- ✅ Expandable order details
- ✅ Status update buttons

**Key Features to Test:**
- [ ] Filter by status (all, pending, processing, etc.)
- [ ] Click on an order to expand
- [ ] View order details
- [ ] Update order status
- [ ] Click "View All" link

#### 6. **Emails Page** (`/admin/emails`)
- ✅ Email composer
- ✅ Recipient selection (all subscribers or custom)
- ✅ Subject field
- ✅ HTML body editor
- ✅ Quick templates
- ✅ Subscribers list
- ✅ Send button

**Key Features to Test:**
- [ ] Select "All Subscribers"
- [ ] Select "Custom List" and enter emails
- [ ] Use a quick template
- [ ] Write custom email
- [ ] Send email (requires RESEND_API_KEY)
- [ ] View subscribers list

---

## 🔍 Testing Checklist

### **Functionality Tests**

#### Frontend
- [ ] Age gate appears on first visit
- [ ] Can navigate to all public pages
- [ ] All links work correctly
- [ ] Product filtering works
- [ ] Search works on shop and COA pages
- [ ] Cart functionality works
- [ ] Checkout modal opens and closes
- [ ] Newsletter signup works
- [ ] Contact form submits

#### Admin
- [ ] Can login with admin credentials
- [ ] Dashboard displays correct stats
- [ ] Can add new products
- [ ] Can edit existing products
- [ ] Can delete products
- [ ] Can view and filter orders
- [ ] Can update order status
- [ ] Can send emails (if RESEND_API_KEY configured)

#### Responsive Design
- [ ] Test on desktop (>1200px)
- [ ] Test on tablet (768-1200px)
- [ ] Test on mobile (<768px)
- [ ] All elements visible and usable
- [ ] No horizontal scrolling
- [ ] Touch targets are large enough

#### Performance
- [ ] Pages load within 2 seconds
- [ ] Images load quickly
- [ ] Scrolling is smooth
- [ ] No layout shifts

---

## 🐛 Known Issues & Workarounds

### 1. **Email Sending**
- **Issue**: Email campaigns won't work without RESEND_API_KEY
- **Workaround**: Set `RESEND_API_KEY` environment variable
- **Expected**: Emails send successfully when configured

### 2. **Image Upload**
- **Issue**: Image upload in admin requires server configuration
- **Workaround**: Images can be referenced by URL or use existing `/public/images/`
- **Expected**: Images upload and display correctly when configured

### 3. **Order Data**
- **Issue**: Orders are stored in JSON files (not persistent database)
- **Workaround**: Data persists between server restarts
- **Expected**: Orders appear in admin dashboard

### 4. **ESLint Warnings**
- **Issue**: 13 warnings about image optimization
- **Workaround**: Warnings don't affect functionality
- **Fix**: Replace `<img>` with `<Image />` (see CODE_REVIEW_FINDINGS.md)

---

## 🎨 Visual Preview Guide

### Color Scheme
- **Background**: `#0a0a0a` (Dark black)
- **Surface**: `#141414` (Slightly lighter black)
- **Border**: `#222` (Dark gray)
- **Accent**: `#00d4aa` (Teal/Cyan)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#888` (Light gray)
- **Text Muted**: `#666` (Dark gray)

### Typography
- **Font Family**: System fonts (no custom fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular weight
- **Accent Text**: Teal color for important elements

### Layout
- **Max Width**: 7xl (1400px) for most content
- **Padding**: Responsive (px-4 on mobile, px-6 on tablet, px-8 on desktop)
- **Spacing**: Consistent use of Tailwind spacing scale

### Components
- **Cards**: Rounded corners (rounded-xl), border, hover effects
- **Buttons**: Primary (teal background), Secondary (border), with hover states
- **Inputs**: Dark background, border, focus states
- **Modals**: Fixed inset, backdrop blur, centered content

---

## 📸 Screenshot Locations

When testing, take screenshots of:

### Required Screenshots
1. **Home Page** - Full scroll
2. **Age Gate Popup** - Before and after acceptance
3. **Shop Page** - Full product listing
4. **Product Detail** - Any product
5. **COA Page** - List and modal
6. **Cart Page** - With items and checkout modal
7. **Admin Login** - Login form
8. **Admin Dashboard** - Full view
9. **Admin Products** - List and edit views
10. **Admin Orders** - List with expanded order
11. **Admin Emails** - Composer with template

### Optional Screenshots
- All static pages (about, contact, etc.)
- Blog listing and post detail
- Mobile views of key pages
- Responsive behavior at different breakpoints

---

## 🚀 Deployment Preview

### What to Expect on Vercel

1. **Automatic HTTPS** - All connections are secure
2. **Global CDN** - Fast loading worldwide
3. **Serverless Functions** - API routes work automatically
4. **Static Optimization** - Pages are pre-rendered when possible
5. **Edge Functions** - Proxy runs at the edge

### Environment Variables to Set

```env
# Required for admin
ADMIN_EMAIL=admin@ghkpep.com
ADMIN_PASSWORD=ghkadmin2024
SESSION_SECRET=generate-a-random-string-here

# Required for email (optional)
RESEND_API_KEY=re_your_resend_api_key

# Optional for contact
NEXT_PUBLIC_CONTACT_EMAIL=orders@ghkpep.com
NEXT_PUBLIC_WHATSAPP_NUMBER=447123456789
NEXT_PUBLIC_TELEGRAM_USERNAME=ghkpeptides
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### First-Time Setup

1. **Deploy to Vercel** (automatic)
2. **Set environment variables** in Vercel dashboard
3. **Test all features** using this guide
4. **Report any issues** with screenshots

---

## 📊 Performance Expectations

### Local Development
- **Cold Start**: ~2-3 seconds
- **Hot Reload**: Instant
- **Page Navigation**: Instant (client-side)

### Vercel Production
- **First Load**: ~1-2 seconds (depends on location)
- **Subsequent Pages**: Instant (client-side navigation)
- **API Calls**: ~100-300ms (serverless functions)
- **Image Loading**: ~500ms-1s (depends on image size)

### Core Web Vitals (Expected)
| Metric | Target | Expected |
|--------|--------|----------|
| LCP | <2.5s | ~1.5-2s |
| FID | <100ms | ~50-80ms |
| CLS | <0.1 | ~0.05-0.1 |

---

## 🎯 Success Criteria

### Minimum Viable Preview
- [ ] Site loads without errors
- [ ] All pages are accessible
- [ ] Age gate works
- [ ] Products display correctly
- [ ] Admin login works
- [ ] Admin dashboard loads

### Full Feature Preview
- [ ] All functionality works as described
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Images load correctly
- [ ] Forms submit successfully

### Production Ready
- [ ] All success criteria met
- [ ] Performance meets targets
- [ ] No critical bugs
- [ ] Ready for public launch

---

## 📞 Support

### Common Issues

#### "Images not loading"
- **Cause**: Images referenced incorrectly
- **Fix**: Ensure images are in `/public/images/` and referenced with `/images/filename.png`

#### "Admin login not working"
- **Cause**: Wrong credentials or session issue
- **Fix**: Use `admin@ghkpep.com` / `ghkadmin2024` or check environment variables

#### "Email not sending"
- **Cause**: Missing RESEND_API_KEY
- **Fix**: Add `RESEND_API_KEY` environment variable

#### "Build failing"
- **Cause**: Missing dependencies or syntax error
- **Fix**: Run `npm install` and check console for specific errors

#### "404 on API routes"
- **Cause**: API route not found
- **Fix**: Check route path in code and URL

---

## 🏆 Final Checklist

Before considering the preview complete:

- [ ] All public pages load correctly
- [ ] Age gate works properly
- [ ] Shop and product pages work
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin login works
- [ ] Admin dashboard displays correctly
- [ ] Product management works
- [ ] Order management works
- [ ] Email system works (if configured)
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] All links work
- [ ] All images load

---

*Document Version: 1.0*
*Last Updated: $(date)*
*Maintainer: GHK Peptides Team*
