# YourStudio — Web Design & Development Site

A modern, white, fully responsive Next.js website for your web design studio.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed → https://nodejs.org
- A GitHub account → https://github.com
- A Vercel account (free) → https://vercel.com

---

### Step 1 — Install dependencies

Open your terminal, navigate to this folder, and run:

```bash
npm install
```

### Step 2 — Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see your site!

---

## ✏️ Customising Your Content

### Change your business name
Open `app/layout.js` and update the `title` and `description`.
Then find `Your<em>Studio</em>` in `components/Navbar.js` and replace with your name.

### Update your email
In `components/Contact.js`, find `hello@yourstudio.com` and replace it.

### Edit testimonials
Open `components/Testimonials.js` — at the top you'll find the `testimonials` array.
Edit each entry:
- `name` — client's name
- `role` — their job title
- `company` — company name
- `quote` — their testimonial text
- `initials` — 2-letter abbreviation shown in the avatar
- `color` — hex colour for the avatar background
- `logoSrc` — path to logo image (see below)

### Adding client logos
1. Put your logo image files (PNG or SVG, ideally square) into the `public/logos/` folder
2. In `components/Testimonials.js`, set `logoSrc: "/logos/yourfile.png"` for that client
3. The logo will automatically replace the initial avatar

### Edit services
Open `components/Services.js` and update the `services` array at the top.

### Edit the About / timeline
Open `components/About.js` and update the `timeline` array and the paragraph text.

---

## 🌐 Deploying to Vercel

### Option A — Deploy via Vercel CLI (recommended)

1. Install the Vercel CLI:
```bash
npm i -g vercel
```

2. From inside the project folder, run:
```bash
vercel
```

3. Follow the prompts:
   - Log in to your Vercel account
   - When asked "Set up and deploy?" → Yes
   - When asked about the framework → Next.js (auto-detected)
   - Accept all defaults

4. Your site will be live at a `.vercel.app` URL within ~60 seconds!

---

### Option B — Deploy via GitHub + Vercel Dashboard

1. Push this project to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to https://vercel.com/new

3. Click **"Import Git Repository"** and select your repo

4. Vercel will auto-detect Next.js — just click **Deploy**

5. Done! Every time you push to `main`, Vercel auto-redeploys.

---

## 🔗 Adding a Custom Domain

1. In the Vercel dashboard, go to your project → **Settings** → **Domains**
2. Type your domain (e.g. `yourstudio.co.uk`) and click **Add**
3. Vercel will give you DNS records — add them in your domain registrar (GoDaddy, Namecheap, etc.)
4. SSL is automatic and free

---

## 📁 Project Structure

```
studio-site/
├── app/
│   ├── layout.js        ← Fonts, metadata, root HTML
│   ├── page.js          ← Assembles all sections
│   └── globals.css      ← Base styles, animations
├── components/
│   ├── Navbar.js        ← Nav + hamburger mobile menu
│   ├── Hero.js          ← Landing hero section
│   ├── Marquee.js       ← Scrolling ticker strip
│   ├── Services.js      ← Services grid
│   ├── About.js         ← About + timeline
│   ├── Testimonials.js  ← Scroll wheel with logos ← EDIT THIS
│   └── Contact.js       ← CTA + footer
├── public/
│   └── logos/           ← Put client logo files here
├── tailwind.config.js
├── next.config.js
└── vercel.json
```

---

## 🎨 Changing Colours / Fonts

**Colours** → `tailwind.config.js` under `theme.extend.colors`
- `ink` = main text/dark colour
- `surface` = light grey background
- `highlight` = accent blue (`#0057FF`)
- `border` = subtle divider lines

**Fonts** → `app/layout.js`
- Display font: `Playfair_Display` (headings)
- Body font: `DM_Sans` (paragraphs)
- Swap these for any Google Font by changing the import name

---

## ❓ Common Issues

**"Module not found" error** → Run `npm install` again

**Fonts not loading** → Make sure you have an internet connection on first build (Google Fonts are fetched at build time)

**Logo images not showing** → Check the file is in `public/logos/` and the path in `logoSrc` starts with `/logos/`

---

## ⭐ Google Reviews (live pull)

The review marquee on the homepage pulls live from Google. Two env vars, no
Google approval process:

```
GOOGLE_PLACES_API_KEY=...   # a key with "Places API (New)" enabled + billing on
GOOGLE_PLACE_ID=ChIJ...     # Munro Studio's own Place ID
```

MunroStudio's Place ID is `ChIJTW3tHO5PiEgRZKBxGHvSHuY`. Confirm the pull works
before deploying:

```bash
npm run reviews:check
```

To find the Place ID for a *client*, text search usually does it:

```bash
npm run reviews:check -- "Business Name Town"   # lists matches + their Place IDs
```

**Service-area businesses (no public address) do not show up in that text
search** — MunroStudio is one, which is why its ID had to come from the Maps
listing instead. For those, open the business on Google Maps, Share → copy link,
and pull the feature ID out of the resolved URL (the `!1s0x…:0x…` part), then
encode it: `base64url(0a 12 09 <hex1 LE64> 11 <hex2 LE64>)`. Verify the result
by fetching it — the API returns the business name, so a wrong ID is obvious.

Then set both in Vercel → Project → Settings → Environment Variables. The daily
cron (`/api/cron/google-reviews`, 07:00) refreshes them, and the admin panel's
revenue page has a "Refresh reviews now" button.

Notes:

- Places returns **at most 5 reviews** per call. That is the API, not a quota —
  requesting more quota will not change it. But *which* five it returns rotates,
  so every refresh unions its results into the `site_reviews` table instead of
  replacing them: the stored set only grows, and converges on the full history
  over successive pulls. The marquee renders whatever is in that table.
- Seed the table with the 13 reviews captured by hand on 2026-08-31, so the site
  starts from the full set rather than five:

  ```bash
  npm run db:migrate     # creates site_reviews
  npm run reviews:seed   # idempotent, live pulls always win over seeded rows
  ```

  Both need `DATABASE_URL` in `.env.local` (copy it from Vercel).
- The star rating and total review count in the header are always Google's real
  live numbers, taken from the last pull — not the count of stored bodies.
- The **Business Profile API** (`/api/auth/google/start`) is the only way to get
  *every* review, and it needs an approved project via Google's Business Profile
  API application form. It stays wired up as an optional upgrade: if it is ever
  connected and no `GOOGLE_PLACE_ID` is set, the site uses it instead.
- Do not enable the legacy Places API — Google no longer allows new Cloud
  projects to turn it on, and all calls here use `places.googleapis.com/v1`.
