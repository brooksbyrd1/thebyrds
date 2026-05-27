# Brooks & Allison — Website Plan

*Single-page wedding site. October 24–25. Destination wedding, most guests fly in. Hand-coded with Claude, hosted on a static host.*

---

## 1. Page structure

One scrolling page, anchor navigation pinned to the top. Mobile-first. The order below is the reading order.

| # | Section | Anchor | What it does |
|---|---|---|---|
| 1 | **Hero** | `#top` | Names, date, location (city/region), one-line invitation. Anchor nav lives here. |
| 2 | **Our story** | `#story` | Short paragraph + one engagement photo. Optional but adds warmth. |
| 3 | **The days** | `#schedule` | Two-column schedule: Oct 24 rehearsal + Oct 25 ceremony/reception. Time, location, dress code per event. |
| 4 | **What is an Orthodox wedding** | `#orthodox` | Plain-language explainer for guests unfamiliar with the sacrament. Treat as hospitality, not a lecture. |
| 5 | **Travel & stay** | `#travel` | Nearest airport, hotel block(s) with booking code, ground transport, suggested arrival/departure timing. |
| 6 | **FAQ** | `#faq` | 6–10 questions: kids, plus-ones, dress code, parking, photo policy, arrival time, weather, what if I'm late. |
| 7 | **RSVP** | `#rsvp` | Embedded form. Collects name, email, mailing address, attendance. |
| 8 | **Gifts** | `#gifts` | Registry links + optional honeymoon fund. Lead with "your presence is enough" framing. |
| 9 | **Contact** | `#contact` | One email address for questions. *Not* your personal phone numbers. |

### Sections you considered but I'd skip (for now)

- **Wedding party** — optional. Adds a personal touch but also one more thing to maintain. Decide later.
- **Live stream** — only if you actually plan to stream the ceremony. Add closer to the date.
- **Local recommendations** — nice-to-have. Can ship a v2 once you know what guests are asking.

---

## 2. RSVP form spec

One form. Hosted by **Tally** (see stack below). Embedded on the page; submissions flow to a Google Sheet you both can see, plus an email notification to your shared inbox per submission.

**Fields:**

1. Full name *(required, single line)*
2. Email *(required, validated)*
3. Mailing address *(required, multi-line — Tally has a structured address field)*
4. Will you attend? *(required, single-choice: "Joyfully accept" / "Regretfully decline")*
5. Number in your party *(required, number, default 1)*
6. *(Optional, conditional on accept)* Are you coming to the rehearsal on Oct 24? *(yes / no / not invited yet)*

**Deliberately omitted from this form, to add later in the formal RSVP:**

- Meal preference / dietary restrictions — wait until the paper invitation goes out and you have firm catering details
- Song requests, well wishes — keep this form transactional; add a separate "leave us a note" form later if you want

**Submission behavior:**

- Confirmation screen: short, warm, in-brand. *"Thank you. The invitation will find you in the spring."*
- Email notification to `hello@brooksandallison.com` (or whatever inbox) on every submission
- Auto-syncs to a Google Sheet for headcount tracking

---

## 3. Tech stack

| Layer | Pick | Why |
|---|---|---|
| **Codebase** | Single hand-coded HTML/CSS/JS file | The site is one page. A framework (Astro, Next, etc.) is overhead you don't need. One file, full design control, no build step. |
| **Repo** | GitHub, private | Source of truth, history, and easy deploys. |
| **Hosting** | Cloudflare Pages | Free, fast, deploys on git push, custom domain in two clicks. Vercel is fine alternative. |
| **Domain** | Cloudflare Registrar | At-cost pricing (~$10/yr for `.com`). Buy `brooksandallison.com` if available; fall back to `brooks-and-allison.com` or a `.wedding` TLD. |
| **RSVP form** | Tally | Beautiful out of the box, free up to 200 submissions/mo, supports structured address fields, syncs to Google Sheets, sends email notifications. Embeds via iframe. |
| **Email** | Gmail with custom domain via Google Workspace ($7/mo) *or* free forwarding via Cloudflare Email Routing | `hello@brooksandallison.com` → forwards to one of your personal inboxes. Cloudflare option is free; Workspace lets you send *from* the address too. |
| **Registry** | Link out only — no integration | Zola or Amazon for traditional items; Honeyfund for honeymoon cash; optional charity link. |
| **Analytics** | Skip, or Plausible ($9/mo) if curious | A wedding site doesn't need conversion funnels. |
| **Photos** | Static images in `/images`, optimized once with Squoosh | No CDN needed for ~5–10 images. |

### Upgrade paths you don't need now but might later

- **Astro + Tailwind** if the single-file HTML grows past ~1,500 lines or you want to split copy into Markdown files
- **Cloudflare Workers + KV** if you ever want a private guest portal with passcode access and personalized invitations
- **Resend** for transactional emails if you want to send custom RSVP confirmations from your own domain

### Total cost

- Domain: ~$10/yr
- Hosting: $0
- RSVP form: $0
- Email forwarding: $0 (Cloudflare) or $7/mo (Workspace)
- **All-in: $10–95/yr**

---

## 4. Setup checklist

In order. Each step is small.

### Week 1 — Foundation

- [ ] Choose and buy domain at Cloudflare Registrar
- [ ] Create GitHub repo: `brooksandallison-com` (private)
- [ ] Create Cloudflare Pages project, connect to repo, point domain at it
- [ ] Set up Cloudflare Email Routing: `hello@brooksandallison.com` → one of your inboxes
- [ ] Create Tally account, draft the RSVP form per spec above
- [ ] Connect Tally to a Google Sheet (`Wedding RSVP — Master`)

### Week 2 — Content

- [ ] Lock the schedule: exact times for ceremony, reception, rehearsal
- [ ] Decide on hotel block(s) and get the booking code(s)
- [ ] Pick one engagement photo for the Hero/Story sections
- [ ] Draft the "What is an Orthodox wedding" copy (ask your priest to review)
- [ ] Draft FAQ — sit down for 30 minutes and brain-dump every question a guest might ask
- [ ] Draft the short story / about us paragraph
- [ ] Set up registries (Zola or Amazon) and Honeyfund

### Week 3 — Build

- [ ] Scaffold the HTML file with all nine sections + anchor nav
- [ ] Apply the brand (once the brand guidelines are settled)
- [ ] Embed Tally form in the RSVP section
- [ ] Test on mobile, desktop, slow connections
- [ ] Test RSVP end-to-end — submit a fake one, confirm email + sheet entry

### Week 4 — Launch

- [ ] Soft-launch to immediate family for proofreading
- [ ] Fix typos, broken links, missing info
- [ ] Send save-the-date paper cards with the URL on them
- [ ] Watch the sheet fill up

---

## 5. Open questions to resolve before build

1. **Year** — October 24–25 of *which* year? Affects every date string and the domain decision.
2. **City / region** — needed for hero, travel section, hotel block decisions. ("West Texas / Marfa" vs. "Santa Fe" vs. somewhere else.)
3. **Ceremony venue** — chapel name + address. Drives the Orthodox-specific dress code copy.
4. **Reception venue** — same. Determines whether it's a separate location/transport question.
5. **Officiating priest / parish** — for the Orthodox-wedding section and any liturgical notes.
6. **Hotel(s)** — one block or several at different price points?
7. **Photographer's policy** — do you want a "no phones / unplugged ceremony" line on the site?
8. **Plus-ones** — universal yes, named only, or per-invitation? Affects the FAQ answer.
9. **Kids** — welcome, welcome to reception only, or adults-only? Affects FAQ.

---

## 6. What I'll build first (when you're ready)

A static HTML/CSS scaffold of all nine sections with placeholder copy and Tally form embedded, deployed to a temporary Cloudflare Pages URL you can preview. Brand styling stays loose until the brand book is settled — clean Cormorant + neutral palette in the meantime. Once we lock the brand, restyling is a one-file change.
