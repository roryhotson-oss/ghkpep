# Deployment and Launch Checklist

## Completed Checks

- [x] Production build passes with `npm run build`.
- [x] Repository lint passes with `npm run lint` after fixing the CookieBanner effect.
- [x] TypeScript validation passes with `npx tsc --noEmit`.
- [x] Sitemap route builds at `/sitemap.xml`.
- [x] `public/robots.txt` exists and disallows `/api/`, `/admin/`, `/dashboard`, `/login`, `/orders`, and `/checkout`.
- [x] Product image references resolve to existing, non-empty files.
- [x] Referenced product images decode successfully.
- [x] Browser image smoke test loaded all rendered shop images successfully.
- [x] WhatsApp, Telegram, and email order actions are present in the cart flow.
- [x] Live smoke checks returned 200 for `/sitemap.xml` and `/api/products`.

## Required Before Deployment

- [ ] Replace every placeholder in `.env.local`/deployment environment variables. (Still contains ~7 placeholder-looking values as of this audit.)
- [ ] Set a strong random `SESSION_SECRET`.
- [ ] Set a real `ADMIN_PASSWORD`; never use the example credential.
- [ ] Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Run and verify `SUPABASE_SCHEMA.sql` in the production Supabase project.
- [ ] Configure `RESEND_API_KEY` and verify contact/order email delivery.
- [ ] Configure Cloudflare Turnstile site and secret keys, then test contact/order forms.
- [ ] Confirm `NEXT_PUBLIC_CONTACT_EMAIL` and all support/order email addresses.
- [ ] Configure the real `NEXT_PUBLIC_WHATSAPP_NUMBER` and test the generated order message.
- [ ] Configure `NEXT_PUBLIC_TELEGRAM_USERNAME` if Telegram orders are intended.
- [ ] Configure real PayPal, Wise, Alipay, crypto, bank-transfer, Revolut, and Coinbase destinations.
- [ ] Replace placeholder values in `PAYMENT_INFO.md` with verified payment details, or remove the document from public deployment if it is internal-only.
- [ ] Verify payment settings returned by `/api/payment-settings` in the production environment.
- [ ] Test payment proof upload, order creation, admin order visibility, and payment confirmation end to end.
- [ ] Confirm shipping, returns, terms, privacy, and research-use copy with the final legal/compliance owner.
- [ ] Resolve the Next.js build warning about `package-lock.json` being outside the repository, or document the intended Turbopack root. (Still present in every `npm run build` this session; `turbopack.root` not yet set in `next.config.js`.)

## Product Catalog Review

- [x] ~~Review the remaining duplicate-name groups before launch.~~ Resolved: NAD+ 500mg, Tesamorelin 10mg, Cagrilintide 5mg, KPV 10mg, Ipamorelin 10mg, TB-500 10mg, Cerebrolysin 60mg, Kiss Peptin/KissPeptin-10, and MOTS-c duplicates removed. A fresh audit (Sep 2026) found zero remaining duplicate product names.
- [x] Decide which imported entries should be deleted, grouped, or retained. Duplicates matching an existing curated product were deleted; remaining multi-strength families (AOD-9604, Retatrutide, CJC-1295 with/without DAC, Sermorelin Acetate, Thymosin Alpha-1, 5-amino-1MQ, etc.) are now grouped under one catalog entry with a strength selector.
- [ ] Review all current catalog records (now ~120 after dedup, down from 146) for correct name, strength, price, box price, image, lot, and description.
- [ ] Replace generic `/images/ghk-cu.jpg` on imported products with product-specific photography. Progress: ACE-031, AICAR, Adipotide, 5-amino-1MQ, AOD-9604, Ara-290, Bronchogen, Cardiogen, and two blend products now have real photos. 74 products still use the generic placeholder as of this audit.
- [ ] ~~Remove or rename byte-identical image files where they are confirmed duplicates.~~ Re-audited: 5 duplicate pairs remain (`ghk-cu-box-10-branded.jpg`/`-v2.jpg`, `NA Selank amidate 30mg.jpeg`/`NASELANK.jpeg`, `kiss-peptin-10mg.png`/`kisspeptin-10mg.png`, `cjc-1295-ipamorelin.jpeg`/`cjc-1295-no-dac-ipamorelin-10mg.jpeg`, `glp2-tz-10mg.jpeg`/`glp2-tz.jpeg`) but none are referenced by any product record, so this is a disk-cleanup nicety, not a launch blocker.
- [x] ~~Confirm all grouped products have matching strength-specific vial and box pricing.~~ Verified: all grouped families carry per-mg `dosageBoxPrices`, and the premium-tier repricing pass preserved per-strength pricing.
- [ ] Check cart contents after catalog changes and clear any stale localStorage test items before launch. (Manual QA step, cannot be verified from the codebase.)

## SEO and Branding

- [x] ~~Update global metadata, Open Graph, Twitter metadata, author, publisher, and structured data from `GHK-CU r Peppers` to the approved public brand `GHK PEPTIDES CU` where required.~~ Verified: no remaining references to the old placeholder brand string anywhere in the codebase.
- [x] ~~Confirm the canonical domain is correct.~~ Verified: `https://www.ghkpep.com` is used consistently across metadataBase, OpenGraph, canonical, and sitemap.
- [x] ~~Verify `/sitemap.xml` contains only live, intended product routes after duplicate deletions/grouping.~~ The sitemap is generated dynamically from `getCommerceProducts()`, so it self-updates whenever products are added/removed/grouped — no stale entries possible by design.
- [ ] Verify all sitemap product URLs return 200 and no deleted product slug remains indexed. (Requires a live/deployed check, not verifiable locally.)
- [x] ~~Add or verify descriptive alt text for every product image.~~ Verified: `alt={product.name}` (or equivalent) is applied consistently across ProductImage, HomeCatalog, GroupedCatalogRow, and shop grid components.
- [ ] Submit the final sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] Run a production metadata and structured-data check after deployment.

## QA and Operations

- [ ] Smoke-test `/`, `/shop`, `/cart`, `/contact`, `/testing`, `/coa`, `/shipping`, `/returns`, `/login`, and `/admin/login` in production.
- [ ] Test mobile navigation and the shop/catalog at mobile and desktop widths.
- [ ] Test product strength selectors, box pricing, one-vial pricing, cart payloads, and checkout totals for every grouped product.
- [ ] Test out-of-stock/order-required behavior for GHK bac Water.
- [ ] Test COA links and verify that every advertised lot has the correct report.
- [ ] Configure Vercel project environment variables and production domain.
- [ ] Review Vercel build/runtime logs after the first deployment.
- [ ] Configure backups and retention for Supabase data.
- [ ] Add monitoring/error alerts for order creation, payment proof upload, email delivery, and admin authentication.
- [ ] Remove development-only warnings and confirm no secrets are committed.
