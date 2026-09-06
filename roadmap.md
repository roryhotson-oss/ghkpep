# GHK Peptides — Code Audit Roadmap

Full-repo audit performed against the running codebase. Every finding below was verified with an actual command (`npm run build`, `npm run lint`, `npx tsc --noEmit`, `npm audit`, or a targeted grep) — nothing here is guesswork.

Legend: ✅ Fixed in this pass · 🟡 Recommended, needs a decision or infra change · 🔵 Informational / low priority

---

## 1. Critical Fixes Applied

### ✅ Build-breaking syntax error in `src/app/layout.tsx`
`npm run lint` failed with a parse error. The `twitter.description` object was missing a trailing comma before `images`, which is a hard syntax error, not a style nit.
- **Fixed:** added the missing comma.
- **Verified:** `npm run lint` and `npx tsc --noEmit` now pass clean.

### ✅ `vercel` CLI was a production dependency, not a dev tool
`package.json` listed `vercel` (the CLI) under `dependencies`. It is never imported anywhere in `src/` — confirmed via `grep -r "from 'vercel'" src/` (zero matches). Its transitive dependency tree (`path-to-regexp`, `smol-toml`, `tar`, `undici`) was the source of **all 30** `npm audit` findings, including 1 critical and 14 high severity issues.
- **Fixed:** moved `vercel` to `devDependencies`.
- **Verified:** `npm audit --omit=dev` went from **30 vulnerabilities (1 critical, 14 high, 12 moderate, 3 low)** to **2 low**.

### ✅ Remaining production vulnerability (Supabase auth-js)
`@supabase/auth-js` had a low-severity "insecure path routing from malformed input" advisory.
- **Fixed:** ran `npm audit fix` (non-breaking) to update `@supabase/supabase-js`.
- **Regression caught and fixed:** the upgrade changed `@supabase/ssr`'s cookie handler types, which broke `npx tsc --noEmit` in `src/app/api/orders/route.ts` (implicit `any` on `setAll` callback params, both `GET` and `POST` handlers). Added explicit `CookieOptions` typing to both call sites.
- **Verified:** `npm audit --omit=dev` now reports **0 vulnerabilities**; `npx tsc --noEmit`, `npm run build`, and `npm run lint` all pass clean.

### ✅ Inconsistent indentation in `src/lib/marketing-store.ts`
44 of 66 lines used tab indentation while the rest of the codebase uses 2-space. Verified the file used a consistent single-tab-per-level pattern (27 lines at 1 tab, 17 at 2 tabs) before converting.
- **Fixed:** converted all tabs to 2-space indentation to match project convention.

### ✅ Canonical domain inconsistency (SEO)
`src/app/layout.tsx` and `src/app/sitemap.ts` canonicalize to `https://www.ghkpep.com`, but `src/app/shop/[slug]/page.tsx` (`generateMetadata`, used for every product's Open Graph URL) and `src/components/StructuredData.tsx` (site-wide JSON-LD, rendered on every page) used `https://ghkpep.com` (no `www`). Mixed canonical hosts across metadata and structured data is a real ranking/duplicate-content risk for search engines.
- **Fixed:** both files now consistently use `https://www.ghkpep.com`.

---

## 2. Security Findings — Recommended (not auto-applied)

These have functional or infrastructure implications, so they're documented rather than silently changed.

### 🟡 Maintenance-mode kill-switch defaults to "on" if the env var is unset
`src/proxy.ts`:
```ts
if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'false' && ...)
```
If `NEXT_PUBLIC_MAINTENANCE_MODE` is ever **unset** in production (missing env var, typo, new deploy target), every route except `/`, `/admin`, `/api/*`, `/images/*`, `/coas/*`, `/robots.txt`, and `/sitemap.xml` silently rewrites to the homepage. This fails "closed" in a way that could take the live shop offline with no error, no log, and no obvious cause.
- **Recommendation:** invert the default — require `NEXT_PUBLIC_MAINTENANCE_MODE === 'true'` to enable maintenance mode, so a missing/misconfigured env var can never accidentally hide the site. Add this to the pre-deploy checklist in `todo.md` regardless.

### 🟡 Rate limiting is in-memory and won't work across serverless instances
`src/proxy.ts` uses a `Map` for rate limiting (`/api/auth`: 3 req/15min, `/api/contact`: 5 req/hour, default: 60 req/min). On Vercel's serverless/edge runtime, each function invocation can run on a different instance with its own memory, so this limiter does not reliably enforce limits across concurrent requests or after cold starts.
- **Recommendation:** move to a shared store (Vercel KV, Upstash Redis, or Supabase) if these limits need to hold in production, especially for `/api/auth` (admin login brute-force protection).

### 🟡 `/api/orders` has no bot/Turnstile verification (unlike `/api/contact`)
`src/app/api/contact/route.ts` verifies a Cloudflare Turnstile token server-side before accepting a submission. `src/app/api/orders/route.ts` (order creation) has no equivalent check — it only relies on the in-memory rate limiter above.
- **Recommendation:** decide whether order creation should require Turnstile verification too, given it's a more consequential action than a contact form.

### 🔵 SVG uploads allowed in `src/app/api/admin/upload/route.ts`
`image/svg+xml` is in the allowed MIME list for admin image uploads. SVGs can embed `<script>` tags; if one were ever opened directly as a top-level document (rather than rendered via `<img>`/`next/image`, which don't execute embedded scripts), it could run arbitrary JS. Low risk here since the route is admin-only and gated by `checkAdmin()`, but worth noting since it's a common SSRF/XSS vector in upload features generally.

### 🔵 Regex-based sanitization instead of a dedicated library
`src/lib/validation.ts` strips dangerous characters and `<script>` tags with regex (`sanitizeString`, `validateMessage`). Blocklist regexes are well-known to be bypassable (e.g. `onerror=` handlers on tags other than `<script>`). Not currently exploitable anywhere we found — output is rendered through React's default escaping everywhere except the two `dangerouslySetInnerHTML` usages below — but a proper sanitizer (e.g. `sanitize-html`) would be more robust if this input is ever rendered as HTML later.

### 🔵 `dangerouslySetInnerHTML` usage (2 occurrences, both low-risk)
- `src/components/StructuredData.tsx:74` — serializes a JSON-LD object via `JSON.stringify`, not raw user input. Safe.
- `src/app/blog/[slug]/page.tsx:1791` — renders `post.content`. Confirmed blog posts are hardcoded in source (`const blogPosts = {...}` in the same file), not user- or database-submitted, so there's no current attacker-controlled path. Flagging only because it becomes a real risk the moment blog content is ever moved to a CMS or database without adding sanitization at that time.

### 🔵 Admin API route auth coverage
Spot-checked every route under `src/app/api/admin/**`: all 13 routes call `checkAdmin()` before performing any action. `src/lib/admin-auth.ts` uses HMAC-SHA256 session tokens with `timingSafeEqual` comparison and `scrypt` password hashing with a timing-safe fallback comparison for the legacy plain-password path. No issues found here.

---

## 3. SEO Findings

### ✅ Canonical domain mismatch — fixed (see Section 1).

### 🟡 74 products still use the generic placeholder image
`data/products.json` — 74 of ~120 products still reference `/images/ghk-cu.jpg` instead of product-specific photography (11 have been fixed to real photos earlier this session: ACE-031, AICAR, Adipotide, 5-amino-1MQ, AOD-9604, Ara-290, Bronchogen, Cardiogen, and two blend products). Every product sharing one image hurts image search visibility and product-page distinctiveness. Tracked in `todo.md`.

### 🔵 Per-product metadata is otherwise solid
`src/app/shop/[slug]/page.tsx` has a proper `generateMetadata` export with unique title, description, keywords, and Open Graph data per product — this was double-checked because product pages commonly get missed, but it's implemented correctly here.

### 🔵 `robots.txt` and `sitemap.xml` are correctly configured
`public/robots.txt` disallows `/api/`, `/admin/`, `/dashboard`, `/login`, `/orders`, `/checkout`, `/account` and points to the sitemap. `src/app/sitemap.ts` generates dynamically from live product data (`getCommerceProducts()`), so it can never contain stale/deleted product slugs.

### 🔵 Structured data (`StructuredData.tsx`)
Organization, WebSite, WebPage, and ItemList JSON-LD are present and now consistently use the `www` canonical host. No further action needed beyond periodic validation with Google's Rich Results Test after deployment (already tracked in `todo.md`).

---

## 4. Code Quality Notes

- **No Prettier config exists** — only ESLint. Formatting consistency currently relies entirely on manual discipline. Consider adding Prettier with an ESLint integration if multiple contributors will touch this codebase.
- **`console.error`/`console.warn` usage (32 occurrences across 21 files)** — all are legitimate error-path logging, not leftover debug statements. No action needed, though a structured logger (e.g. pino) would help if this ever needs to feed production monitoring/alerting (already an open item in `todo.md`).
- **No `eval`, `new Function`, or `child_process` usage** anywhere in `src/` — confirmed via full-repo grep.
- **No hardcoded secrets, API keys, or credentials** found in `src/` — confirmed via pattern search for common key formats (Stripe-style, Google API keys, PEM blocks).

---

## 5. Verification Log

Every fix in this document was verified with the actual command, not assumed:

| Check | Before | After |
|---|---|---|
| `npm run lint` | 1 parse error | 0 errors |
| `npx tsc --noEmit` | 0 errors (until audit-fix regression, then 8 errors) | 0 errors |
| `npm run build` | ✓ Compiled successfully | ✓ Compiled successfully |
| `npm audit --omit=dev` | 30 vulnerabilities (1 critical, 14 high, 12 moderate, 3 low) | 0 vulnerabilities |
| Canonical domain refs | 2 files using non-`www` host | 0 |
| Tab-indented lines in `marketing-store.ts` | 44 | 0 |

---

## 6. Suggested Priority Order for Remaining Work

1. Decide on the maintenance-mode default-safe fix (Section 2) — cheap, high-impact, prevents a silent full-site outage.
2. Replace the generic product image on the remaining 74 products (Section 3) — highest-effort but highest SEO/conversion payoff.
3. Decide on rate-limit persistence and `/api/orders` bot protection (Section 2) — needs an infra choice (Vercel KV/Upstash), not just code.
4. Everything else in `todo.md`'s "Required Before Deployment" section (env vars, Supabase schema, payment provider configuration) — unrelated to this audit but still blocking launch.
