# GHK Peptides — Project Roadmap

> Internal document for the site owner and AI assistants. Lives only in the repo — never served on ghkpep.com.
> Update this file when completing or adding work. Sections are collapsible — click to expand.

**Stack:** Next.js 16 on Vercel (prod: ghkpep.com) · Supabase Postgres (`uqkmekhlfrgyddqtelqb`, roryhotson-oss org) · Fasthosts SMTP email · Cloudflare Turnstile · Fasthosts DNS (livedns.co.uk) + email hosting

---

## Now / Next

- [ ] **Push today's commit to GitHub** and confirm Vercel git integration doesn't double-deploy (deploys so far were CLI-based)
- [ ] **End-to-end order test**: place a test order on the live site, upload a payment proof, confirm it appears in the admin panel (validates orders + `payment-proofs` storage bucket after the Supabase resume)
- [ ] **Admin login check**: log into `/admin` once — password hash lives in Supabase `site_settings`, restored with the resume
- [ ] **Set up a Supabase backup habit**: dashboard → Database → Backups; free tier keeps limited backups, consider a monthly manual download

## Backlog (nice-to-have, in rough priority order)

- [ ] Migrate Vercel prod Supabase env vars from legacy JWT keys to the new `sb_publishable_`/`sb_secret_` keys (local already uses them; legacy keys still work but are deprecated)
- [ ] DKIM for ghkpep.com outbound mail (Fasthosts webmail settings) to improve deliverability beyond SPF
- [ ] Sweep remaining pale-on-light text colors (`#a7b0b2`, `#e1e7e5`, `#8298aa`) on pages other than About
- [ ] Turnstile on the checkout flow analytics: watch solve rates in Cloudflare dashboard; switch widget to "Invisible" mode if the checkbox annoys customers
- [ ] Consider Supabase Pro ($25/mo) if the store gets real traffic — removes pause risk entirely and adds daily backups
- [ ] Marketing cron (`/api/cron/marketing`): verify X/Facebook credentials are set or disable the cron

---

<details>
<summary><strong>✅ Done — 2026-09-07 session (email, Turnstile, Supabase revival)</strong></summary>

### Email — Fasthosts SMTP (fully live, verified end-to-end)
- Replaced Resend with **nodemailer → smtp.livemail.co.uk:587**, authenticated as `support@ghkpep.com` (`src/lib/email.ts`; contact/auth/admin-email routes unchanged via same interface)
- New mailbox password set via Fasthosts control panel; stored in `.env.local` (`SMTP_PASSWORD`) and Vercel prod (sensitive). **Any mail app logged into support@ needs the new password.**
- Why Fasthosts: ghkpep.com MX + SPF already point at livemail — zero DNS changes, replies land in the sending inbox
- Removed: `resend` package, Resend env vars, temp `/api/admin/resend-setup` endpoint
- Contact route hardening: Turnstile optional when unconfigured; Supabase save failure no longer blocks the email (mail is primary, DB row is a copy)

### Cloudflare Turnstile (live, enforced)
- Widget **"GHK Peptides Contact"** (`0x4AAAAAAErI4YxH-CZjnnzB`), hostnames ghkpep.com + localhost, Managed mode, account Roryhotson@gmail.com
- Keys in `.env.local` + Vercel prod; token-less API posts now get HTTP 400
- Forms (contact, maintenance, cart) degrade gracefully if keys are ever removed

### Supabase — revived, pause-proofed
- Project was **paused** (free-tier auto-pause), not deleted — resumed with all data (products, orders, site_settings) intact; same URL/keys, prod worked immediately
- Added `/api/cron/keepalive` + `vercel.json` cron (daily 06:43) — trivial query keeps the project active so it never pauses again
- `.env.local` now has real URL + new-style `sb_publishable_`/`sb_secret_` keys (was placeholders)
- Decision: stay on Supabase; Fasthosts MySQL rejected (would mean rewriting the whole data layer, ~25 call sites + storage buckets)

### About page
- All text switched to near-black `#0c1622` (was unreadable pale grays); fixed invisible "Contact the team" button

### Earlier (previous session, committed together with the above)
- Product images consolidated to `standardized-v3` (119 files, 1408×1141); old image sets deleted
- Public catalog served from bundled local data (no Supabase call on the listing path — avoids cold starts)

</details>

<details>
<summary><strong>🔑 Where things live (for future AI sessions)</strong></summary>

- **Secrets**: `.env.local` (never committed) and Vercel prod env (`npx vercel env ls production`). SMTP + Turnstile + Supabase + `CRON_SECRET` all set in both.
- **Fasthosts** (fasthosts.co.uk, account roryhotson@gmail.com): domain DNS (livedns.co.uk), email hosting for ghkpep.com — 5 mailboxes (admin@, orders@, privacy@, social@, support@), package ID 1131055795. SMTP `smtp.livemail.co.uk:587`, IMAP `mail.livemail.co.uk`.
- **Cloudflare** (Roryhotson@gmail.com): Turnstile widgets only — the domain is NOT proxied through Cloudflare.
- **Supabase**: project `uqkmekhlfrgyddqtelqb` in "roryhotson-oss's Org". Schema reference: `SUPABASE_SCHEMA.sql`. Free tier — the keepalive cron prevents auto-pause.
- **Deploy**: `npx vercel deploy --prod --yes` from repo root. Production domain ghkpep.com.
- Session memory also kept at `~/.claude/projects/-home-master-Documents-GitHub/memory/`.

</details>
