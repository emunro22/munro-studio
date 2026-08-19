// Single source of truth for all SEO landing pages.
//
// URL STRUCTURES supported:
// 1. /glasgow-web-design, /tradesmen-websites-glasgow (main hub pages — hand-written)
// 2. /web-design-{area} (Glasgow area pages — auto-generated, SEO-optimised, canonical)
// 3. /{area} (short URL for ad copy, e.g. "munrostudio.co.uk/lenzie") — 301s to
//    /web-design-{area} via next.config.js redirects(), NOT a separate rendered page.
//    (Previously both were separately rendered with identical content, which Search
//    Console flagged as duplicates and left the short URLs unindexed.)

// ─── Glasgow areas covered ──────────────────────────────────────────────────
// Add a new area here and a full SEO page appears automatically.
export const glasgowAreas = [
  { slug: "paisley", name: "Paisley", blurb: "Renfrewshire's biggest town, with strong demand for home-services trades.", nearby: ["Glasgow city centre", "Renfrew", "Johnstone"] },
  { slug: "clydebank", name: "Clydebank", blurb: "West Dunbartonshire hub, busy with domestic and commercial trade work.", nearby: ["Dumbarton", "Bearsden", "Drumchapel"] },
  { slug: "east-kilbride", name: "East Kilbride", blurb: "Scotland's largest new town — big population, big demand for local trades.", nearby: ["Hamilton", "Rutherglen", "Blantyre"] },
  { slug: "erskine", name: "Erskine", blurb: "Renfrewshire commuter town with growing demand for home improvement trades.", nearby: ["Bishopton", "Renfrew", "Paisley"] },
  { slug: "kirkintilloch", name: "Kirkintilloch", blurb: "East Dunbartonshire town, strong local economy and active trade market.", nearby: ["Bishopbriggs", "Lenzie", "Milngavie"] },
  { slug: "lenzie", name: "Lenzie", blurb: "Quiet East Dunbartonshire commuter village with an affluent homeowner base.", nearby: ["Kirkintilloch", "Bishopbriggs", "Stepps"] },
  { slug: "bishopbriggs", name: "Bishopbriggs", blurb: "East Dunbartonshire town with strong demand for domestic and home-improvement trades.", nearby: ["Kirkintilloch", "Lenzie", "Springburn"] },
  { slug: "bearsden", name: "Bearsden", blurb: "Affluent East Dunbartonshire suburb — premium jobs, quality work in demand.", nearby: ["Milngavie", "Hillhead", "Anniesland"] },
  { slug: "milngavie", name: "Milngavie", blurb: "Upscale Glasgow suburb, start of the West Highland Way — premium trade market.", nearby: ["Bearsden", "Maryhill", "Kirkintilloch"] },
  { slug: "rutherglen", name: "Rutherglen", blurb: "South Lanarkshire town bordering Glasgow — busy mix of domestic work.", nearby: ["Cambuslang", "East Kilbride", "Glasgow Southside"] },
  { slug: "cambuslang", name: "Cambuslang", blurb: "Large South Lanarkshire suburb with steady trade demand.", nearby: ["Rutherglen", "Halfway", "East Kilbride"] },
  { slug: "hamilton", name: "Hamilton", blurb: "South Lanarkshire market town with a large working population.", nearby: ["Motherwell", "Bothwell", "East Kilbride"] },
  { slug: "motherwell", name: "Motherwell", blurb: "North Lanarkshire town with strong domestic and commercial trade demand.", nearby: ["Hamilton", "Wishaw", "Bellshill"] },
  { slug: "wishaw", name: "Wishaw", blurb: "North Lanarkshire town with active home-improvement and trade markets.", nearby: ["Motherwell", "Shotts", "Newmains"] },
  { slug: "bellshill", name: "Bellshill", blurb: "North Lanarkshire town with busy domestic and commercial trade work.", nearby: ["Motherwell", "Uddingston", "Coatbridge"] },
  { slug: "coatbridge", name: "Coatbridge", blurb: "North Lanarkshire town with a long tradition of tradesmen and small businesses.", nearby: ["Airdrie", "Bellshill", "Glasgow East End"] },
  { slug: "airdrie", name: "Airdrie", blurb: "North Lanarkshire town with a strong base of home-services trades.", nearby: ["Coatbridge", "Plains", "Cumbernauld"] },
  { slug: "cumbernauld", name: "Cumbernauld", blurb: "North Lanarkshire new town with a large commuter population.", nearby: ["Kilsyth", "Airdrie", "Kirkintilloch"] },
  { slug: "renfrew", name: "Renfrew", blurb: "Renfrewshire town bordering Glasgow Airport — busy trade and commercial scene.", nearby: ["Paisley", "Erskine", "Glasgow West"] },
  { slug: "johnstone", name: "Johnstone", blurb: "Renfrewshire town with steady demand for home-improvement trades.", nearby: ["Paisley", "Linwood", "Elderslie"] },
  { slug: "west-end", name: "Glasgow West End", blurb: "Glasgow's cultural quarter — tenement flats, conversions, high-value trade work.", nearby: ["Partick", "Hillhead", "Kelvinbridge"] },
  { slug: "southside", name: "Glasgow Southside", blurb: "Shawlands, Pollokshields, Strathbungo — diverse neighbourhoods, steady trade demand.", nearby: ["Shawlands", "Pollokshields", "Battlefield"] },
  { slug: "dumbarton", name: "Dumbarton", blurb: "West Dunbartonshire town on the Clyde — steady demand for home and trade services.", nearby: ["Clydebank", "Alexandria", "Helensburgh"] },
  { slug: "helensburgh", name: "Helensburgh", blurb: "Affluent Argyll & Bute town on the Clyde coast — premium jobs, quality work in demand.", nearby: ["Dumbarton", "Rhu", "Cardross"] },
  { slug: "barrhead", name: "Barrhead", blurb: "East Renfrewshire town with a strong base of local tradespeople and small businesses.", nearby: ["Neilston", "Paisley", "Newton Mearns"] },
  { slug: "newton-mearns", name: "Newton Mearns", blurb: "Affluent East Renfrewshire suburb — high-spec homes, premium trade and service jobs.", nearby: ["Giffnock", "Clarkston", "Barrhead"] },
  { slug: "giffnock", name: "Giffnock", blurb: "East Renfrewshire suburb with an affluent homeowner base and steady trade demand.", nearby: ["Newton Mearns", "Clarkston", "Glasgow Southside"] },
  { slug: "clarkston", name: "Clarkston", blurb: "East Renfrewshire village popular with families — consistent home-improvement demand.", nearby: ["Giffnock", "Newton Mearns", "Busby"] },
  { slug: "uddingston", name: "Uddingston", blurb: "South Lanarkshire town bordering Glasgow's east end — busy domestic trade market.", nearby: ["Bothwell", "Hamilton", "Coatbridge"] },
  { slug: "blantyre", name: "Blantyre", blurb: "South Lanarkshire town with a strong working population and active trade scene.", nearby: ["Hamilton", "East Kilbride", "Uddingston"] },
  { slug: "larkhall", name: "Larkhall", blurb: "South Lanarkshire town with steady demand for home-improvement and trade work.", nearby: ["Hamilton", "Stonehouse", "Motherwell"] },
  { slug: "kilsyth", name: "Kilsyth", blurb: "North Lanarkshire town at the foot of the Campsies — growing commuter population.", nearby: ["Cumbernauld", "Kirkintilloch", "Banton"] },
  { slug: "stepps", name: "Stepps", blurb: "North Lanarkshire commuter village on Glasgow's doorstep — affluent homeowner base.", nearby: ["Millerston", "Muirhead", "Bishopbriggs"] },
  { slug: "maryhill", name: "Maryhill", blurb: "Glasgow neighbourhood along the canal — mix of tenements and new-build, steady trade work.", nearby: ["Maryhill Park", "Anniesland", "Milngavie"] },
  { slug: "partick", name: "Partick", blurb: "Busy Glasgow West End neighbourhood — tenement flats, conversions and a young population.", nearby: ["West End", "Hillhead", "Scotstoun"] },
  { slug: "drumchapel", name: "Drumchapel", blurb: "Glasgow suburb on the city's northwest edge — consistent demand for domestic trades.", nearby: ["Clydebank", "Knightswood", "Bearsden"] },
  { slug: "bridge-of-weir", name: "Bridge of Weir", blurb: "Affluent Renfrewshire village — high-spec homes and premium trade work in demand.", nearby: ["Kilmacolm", "Houston", "Johnstone"] },
];

// ─── Main SEO pages ─────────────────────────────────────────────────────────
export const seoPages = {
  "glasgow-web-design": {
    slug: "glasgow-web-design",
    title: "Glasgow Web Design | Custom Websites From £499 | MunroStudio",
    metaDescription: "Glasgow-based web design for small businesses and tradespeople. Custom Next.js sites, local SEO, first month free. Call 07485 218 091.",
    h1: "Glasgow Web Design",
    h1Accent: "that actually works.",
    intro: "Custom-built websites for Glasgow businesses — designed, developed and optimised for local Google search. No templates, no tie-ins, and your first month is free.",
    keyword: "Glasgow web design",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Per month after" }, { n: "£499", l: "Or one-off, hosted by us" }],
    benefits: [
      { title: "Built locally in Glasgow", desc: "I'm based in Glasgow, so we can meet face-to-face if you'd prefer, and I understand the local market — from the West End to East Kilbride." },
      { title: "Custom design, no templates", desc: "Every site is custom-built in Next.js — the same tech used by top tech companies. You won't look like every other Glasgow small business." },
      { title: "Local SEO from day one", desc: "Every site is optimised for searches like 'plumber Glasgow' or 'cafe Shawlands'. I also set up your Google Business Profile so you show up on Maps." },
      { title: "Live in 2–3 weeks", desc: "No dragging the project out for months. Quick turnaround, fast revisions, and I'm available on WhatsApp throughout." },
    ],
    comparisonTitle: "Why MunroStudio beats the bigger Glasgow agencies",
    comparisonRows: [
      { them: "Glasgow agencies: £2,000–£10,000 upfront", us: "MunroStudio: £0 first month, then £55/mo or £499 one-off" },
      { them: "Template shops: same site you've seen 100 times", us: "MunroStudio: fully custom design, built from scratch" },
      { them: "Big agencies: 2–3 month timelines", us: "MunroStudio: live in 2–3 weeks" },
      { them: "No phone number, only contact forms", us: "Direct number: 07485 218 091" },
    ],
    faqs: [
      { q: "How much does web design cost in Glasgow?", a: "Glasgow web design prices range widely — small agencies typically charge £700–£2,400 for a basic site, while larger agencies start at £2,000+. MunroStudio keeps it simple: £0 for your first month, then £55/month (cancel any time), or a one-off £499, hosted by us (SEO and sitemap submission aren't included on the one-off plan)." },
      { q: "Do you work with Glasgow businesses only?", a: "I'm based in Glasgow and work with businesses all across the city, from the West End and Southside to Paisley, Clydebank, East Kilbride and the wider Greater Glasgow area. I also take clients elsewhere in Scotland and the UK — but Glasgow is home." },
      { q: "Will my site rank on Google for Glasgow searches?", a: "Every site I build is optimised for local SEO from day one, with location-based keywords, a Google Business Profile setup, and clean technical foundations. Ranking takes time (usually 2–6 months for local terms), but you'll be set up correctly from launch." },
      { q: "Can we meet in person?", a: "Absolutely — being Glasgow-based is a big part of what I offer. Most clients prefer a quick call or WhatsApp chat, but I'm happy to meet in person in Glasgow if you'd rather discuss the project face-to-face." },
    ],
  },

  "tradesmen-websites-glasgow": {
    slug: "tradesmen-websites-glasgow",
    title: "Websites for Tradesmen Glasgow | £0 First Month | MunroStudio",
    metaDescription: "Professional websites for Glasgow tradespeople — plumbers, electricians, builders and more. First month free, £55/mo after. Call 07485 218 091.",
    h1: "Websites for Glasgow tradesmen",
    h1Accent: "built to win jobs.",
    intro: "Stop paying Checkatrade £100+ a month for shared leads. Get your own custom website, get found on Google, and keep every enquiry — yours, not split four ways.",
    keyword: "tradesmen websites Glasgow",
    audienceLabel: "Glasgow tradespeople",
    heroStats: [{ n: "£0", l: "First month" }, { n: "20+", l: "Trade clients served" }, { n: "2–3wk", l: "From signup to live" }],
    benefits: [
      { title: "Beats Checkatrade on every metric", desc: "Checkatrade costs £1,200+ a year forever, and your leads are shared with 3+ other trades. A MunroStudio site is £499 once, hosted by us — and every lead comes direct to your phone." },
      { title: "Built for 'plumber near me' searches", desc: "I build every site to rank for local trade terms — 'electrician Glasgow', 'roofer Paisley', 'builder East Kilbride'. That's where the real jobs come from." },
      { title: "Mobile-first — where your customers are", desc: "70% of 'tradesman near me' searches happen on a phone. Every site is built mobile-first with click-to-call buttons, so enquiries come through while you're on the job." },
      { title: "Done by someone who gets it", desc: "I've built sites for recovery operators, MOT centres, groundcare, waste clearance — I know trade businesses and what converts for them." },
    ],
    comparisonTitle: "Checkatrade vs your own website",
    comparisonRows: [
      { them: "Checkatrade: £100+/month, forever", us: "MunroStudio: £499 once, or £55/mo (first free)" },
      { them: "Leads shared with 3–5 competitors", us: "Exclusive leads — yours only" },
      { them: "You vanish when you stop paying", us: "One-off plan stays live, hosted by us, no monthly fee" },
      { them: "Generic profile page, looks like every other trade", us: "Custom design that showcases your work" },
    ],
    faqs: [
      { q: "How much does a tradesman website cost in Glasgow?", a: "Most UK tradesmen websites cost £25–£49/month on subscription models, or anywhere from £350 to £2,000+ as a one-off. MunroStudio is £0 for your first month, £55/month after, or £499 one-off — and everything's custom, no templates." },
      { q: "Will my tradesman website rank above Checkatrade?", a: "For your own business name — yes, easily. For generic searches like 'plumber Glasgow', Checkatrade is a huge domain so it's hard to outrank them on page 1. But with proper local SEO and a Google Business Profile, you can appear in the Google Maps pack above Checkatrade — which is where most calls actually come from." },
      { q: "I already pay Checkatrade. Should I cancel?", a: "Don't cancel immediately. Run both for a month or two and see where your enquiries come from. Most tradesmen find that once their own site starts ranking and their Google Business Profile is active, Checkatrade leads become optional rather than essential — and they cancel to save £100+/month." },
      { q: "Which trades do you work with?", a: "All of them. Plumbers, electricians, builders, gas engineers, roofers, landscapers, plasterers, tilers, joiners, decorators, HVAC, mechanics, MOT centres, recovery operators, groundcare, waste clearance — whatever your trade, I can build for it." },
    ],
  },

  "plumber-websites-glasgow": {
    slug: "plumber-websites-glasgow",
    title: "Plumber Websites Glasgow | Get Found on Google | MunroStudio",
    metaDescription: "Custom websites for Glasgow plumbers. Rank for 'plumber near me', stop paying Checkatrade, first month free. Call 07485 218 091.",
    h1: "Plumber websites, Glasgow",
    h1Accent: "that ring your phone.",
    intro: "Every Glasgow plumber needs a website that ranks for 'plumber near me' and 'emergency plumber Glasgow'. I build fast, mobile-first sites that turn searches into phone calls.",
    keyword: "plumber websites Glasgow",
    audienceLabel: "Glasgow plumbers",
    heroStats: [{ n: "£0", l: "First month" }, { n: "24/7", l: "Website works" }, { n: "2–3wk", l: "To go live" }],
    benefits: [
      { title: "Ranks for 'emergency plumber Glasgow'", desc: "Emergency plumbing searches are the most valuable jobs you can win. I optimise every site specifically for urgent, local terms so you're the first call when a pipe bursts." },
      { title: "Click-to-call everywhere", desc: "Every page has your phone number one tap away. People searching for a plumber at 11pm aren't filling in forms — they're calling. Your site needs to make that easy." },
      { title: "Shows your accreditations", desc: "Gas Safe, WaterSafe, SNIPEF, insurance docs — I design sections that highlight your credentials so customers trust you before they even pick up the phone." },
      { title: "Gallery of your work", desc: "Before/after photos of boilers, bathrooms, leaks fixed — visual proof of your work is the single biggest trust factor for local plumbing jobs." },
    ],
    comparisonTitle: "Checkatrade vs your own plumber website",
    comparisonRows: [
      { them: "Checkatrade: £100+/month shared with 5 plumbers", us: "Your site: every call is yours, exclusively" },
      { them: "No control over your profile's design", us: "Fully branded site that looks trustworthy" },
      { them: "Stop paying, you disappear", us: "One-off build stays live, hosted by us" },
      { them: "No way to rank in Google Maps", us: "Google Business Profile optimised day one" },
    ],
    faqs: [
      { q: "How long does it take to rank for 'plumber Glasgow'?", a: "Honest answer: 2–6 months for a new site to rank on page 1 for competitive local terms, and longer for something like 'plumber Glasgow' where Checkatrade and Rated People dominate. BUT — Google Maps is different. With a properly set-up Google Business Profile, you can appear in the 3-pack on Maps within weeks, which is where most actual calls come from." },
      { q: "Do I need an emergency call-out page?", a: "100%. Emergency jobs are the highest-paying plumbing work, and people searching for 'emergency plumber' at 10pm are ready to pay — they just want someone to pick up. I'll build you a dedicated emergency page optimised for those high-intent searches." },
      { q: "Can you integrate a booking system?", a: "Yes — I can add a simple enquiry form, a 'request a quote' flow, or a proper booking calendar if you need one. Most plumbers prefer just a clear phone number and a form, because urgent jobs are phone calls." },
    ],
  },

  "electrician-websites-glasgow": {
    slug: "electrician-websites-glasgow",
    title: "Electrician Websites Glasgow | NICEIC Ready Sites | MunroStudio",
    metaDescription: "Custom websites for Glasgow electricians. NICEIC badges, local SEO, click-to-call. First month free. Call 07485 218 091.",
    h1: "Electrician websites, Glasgow",
    h1Accent: "that build trust fast.",
    intro: "A domestic or commercial electrician needs a website that signals qualification and trust instantly. I build sites that show off your NICEIC, SELECT or NAPIT accreditation and turn local searches into bookings.",
    keyword: "electrician websites Glasgow",
    audienceLabel: "Glasgow electricians",
    heroStats: [{ n: "£0", l: "First month" }, { n: "100%", l: "Mobile-first" }, { n: "2–3wk", l: "To launch" }],
    benefits: [
      { title: "NICEIC / SELECT / NAPIT badges front and centre", desc: "Qualifications are the #1 trust signal for electrical work. I make sure your accreditations are impossible to miss — on the header, near every CTA, and on a dedicated credentials page." },
      { title: "Ranks for local electrical searches", desc: "'EICR Glasgow', 'electrician Southside', 'rewire quote Paisley' — these are the searches that turn into actual jobs. Every page is built to target them." },
      { title: "Service pages that convert", desc: "Separate optimised pages for EICRs, rewires, consumer unit upgrades, EV charger installation, commercial work — each targeting the right keyword." },
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or go one-off for £499, hosted by us. No card up front." },
    ],
    comparisonTitle: "Trade directories vs your own electrician website",
    comparisonRows: [
      { them: "Checkatrade: £1,200+/year, shared leads", us: "Your site: £499 once or £55/mo, exclusive leads" },
      { them: "Generic profile, no way to stand out", us: "Custom branded site with your accreditations" },
      { them: "No control over reviews visibility", us: "Your best reviews displayed prominently" },
      { them: "Can't rank for 'EV charger installation Glasgow'", us: "Dedicated service pages for every keyword" },
    ],
    faqs: [
      { q: "What pages should an electrician's website have?", a: "At minimum: Home, Services (with separate pages for EICRs, rewires, consumer units, EV chargers, commercial), About (with your accreditations), Gallery, Reviews, and Contact. Separate service pages massively help local SEO — each one can rank individually." },
      { q: "Can you add an EV charger installation page?", a: "Absolutely — EV charger installation is one of the fastest-growing electrical services in Glasgow, with OZEV grant changes driving demand. A dedicated page optimised for 'EV charger installation Glasgow' is a brilliant way to win those premium jobs." },
      { q: "Do I need to show my public liability insurance?", a: "It helps. Alongside your NICEIC/SELECT number, displaying proof of insurance (a simple badge or a line like 'Fully insured, £5m PLI') significantly improves conversions on electrical enquiries — especially for bigger jobs like rewires." },
    ],
  },

  "builder-websites-glasgow": {
    slug: "builder-websites-glasgow",
    title: "Builder Websites Glasgow | Portfolio-First Sites | MunroStudio",
    metaDescription: "Custom websites for Glasgow builders and construction firms. Project galleries, local SEO, first month free. Call 07485 218 091.",
    h1: "Builder websites, Glasgow",
    h1Accent: "that showcase your work.",
    intro: "Builders win jobs on their portfolio. I build image-heavy, fast-loading sites that show off your extensions, renovations and new builds in full visual glory — and turn browsers into signed contracts.",
    keyword: "builder websites Glasgow",
    audienceLabel: "Glasgow builders",
    heroStats: [{ n: "£0", l: "First month" }, { n: "∞", l: "Project photos" }, { n: "2–3wk", l: "To launch" }],
    benefits: [
      { title: "Portfolio built for serious browsing", desc: "Custom galleries with before/after shots, full project case studies, and filter-by-type (extension, renovation, new build, loft conversion). Buyers spend minutes on your site, not seconds." },
      { title: "Ranks for high-value keywords", desc: "'Extension builder Glasgow', 'loft conversion West End', 'renovation contractor Southside' — these bring in £10k–£100k+ jobs. Every service page targets one of them." },
      { title: "Case study pages that sell", desc: "For each major project, a dedicated page with story, photos, scope, and outcome. Case studies are the single most effective sales tool for a builder." },
      { title: "Works for solo builders and construction firms", desc: "Whether you're a solo builder doing domestic extensions or a 15-person outfit doing commercial fit-outs, I scale the design to match your scope." },
    ],
    comparisonTitle: "Trade directories vs your own builder website",
    comparisonRows: [
      { them: "Checkatrade: generic profile, no portfolio depth", us: "Custom site with unlimited project showcases" },
      { them: "Can't tell the story of a project", us: "Full case study pages for each major build" },
      { them: "Competing with 4 other builders on every lead", us: "Direct enquiries, yours exclusively" },
      { them: "£1,200+/year forever", us: "£499 once or £55/mo (first month free)" },
    ],
    faqs: [
      { q: "How many project photos can I include?", a: "As many as you like. Image optimisation and lazy-loading mean your site stays fast even with 100+ photos. I'd recommend starting with 15–20 of your best across 5–8 projects, then adding case studies over time." },
      { q: "Can you add a quote calculator?", a: "Yes — for things like extensions or loft conversions where pricing follows a rough formula (square footage + spec level), a calculator is a brilliant lead-qualifier. It also filters out tyre-kickers before they eat your time." },
      { q: "Will my site show up on 'extension builder near me' searches?", a: "With proper local SEO and a Google Business Profile, yes — typically within 2–6 months for competitive terms. 'Extension builder Glasgow' is competitive but winnable; longer-tail terms like 'extension builder Shawlands' rank faster." },
    ],
  },

  "web-design-glasgow": {
    slug: "web-design-glasgow",
    title: "Web Design Glasgow | Custom Sites From £55/mo | MunroStudio",
    metaDescription: "Professional web design in Glasgow. Custom-built websites with SEO, booking systems, Google reviews & admin portals. First month free. Call 07485 218 091.",
    h1: "Web design Glasgow",
    h1Accent: "built around your business.",
    intro: "Custom websites for Glasgow businesses — with everything built in. SEO, booking systems, Google reviews integration, admin portals, and online ordering. All from £55 a month.",
    keyword: "web design Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Per month" }, { n: "60+", l: "Pages indexed" }],
    benefits: [
      { title: "Custom design, not a template", desc: "Every site is built from scratch around your brand — not dropped into a Squarespace theme that 10,000 other businesses use." },
      { title: "Everything included at £55/mo", desc: "Hosting, SEO, sitemap, Google reviews, booking systems, admin portal, unlimited content changes. No upsells." },
      { title: "Live in 2–3 weeks", desc: "Fast turnaround, regular updates, and you review everything before launch. I'm on WhatsApp throughout." },
      { title: "First month completely free", desc: "No card needed to start. Use the live site for a full month risk-free, then decide." },
    ],
    comparisonTitle: "MunroStudio vs bigger Glasgow agencies",
    comparisonRows: [
      { them: "Agencies: £2,000–£10,000 upfront", us: "MunroStudio: £0 first month, £55/mo or £499 one-off" },
      { them: "Template shops: generic, poor SEO", us: "Custom Next.js — proper tech, proper rankings" },
      { them: "2–3 month timelines", us: "Live in 2–3 weeks" },
      { them: "No ongoing support after handover", us: "Hosting, updates, and support all included" },
    ],
    faqs: [
      { q: "What does web design cost in Glasgow?", a: "Glasgow agencies typically charge £700–£10,000+ for a custom site. MunroStudio charges £0 for your first month, then £55/month all-in (cancel any time), or a one-off £499, hosted by us (SEO and sitemap submission aren't included on the one-off plan)." },
      { q: "What's included at £55/month?", a: "Everything — custom design, hosting, SEO, sitemap submitted to Google, Google Business Profile setup, Google reviews on your site, booking system integration, admin portal, and unlimited content changes." },
      { q: "How long does the process take?", a: "Most sites are live within 2–3 weeks from kickoff. You review the design before launch and request any changes — nothing goes live without your sign-off." },
    ],
  },

  "seo-services-glasgow": {
    slug: "seo-services-glasgow",
    title: "SEO Services Glasgow | Local SEO & Sitemap XML | MunroStudio",
    metaDescription: "Local SEO for Glasgow businesses. Sitemap XML submitted, Google Business Profile setup, keyword-optimised pages. Included in every site at £55/mo.",
    h1: "SEO services Glasgow",
    h1Accent: "get found first.",
    intro: "Every website I build comes with full local SEO built in — keyword-optimised pages, sitemap XML submitted to Google Search Console, and a Google Business Profile so you appear on Maps from day one.",
    keyword: "SEO services Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "£55", l: "Per month, SEO included" }, { n: "2–6mo", l: "Typical ranking timeline" }, { n: "100%", l: "Sites Google-submitted" }],
    benefits: [
      { title: "Sitemap XML submitted to Google", desc: "Every site I build has a sitemap.xml generated and submitted to Google Search Console so pages get crawled and indexed fast — not sitting invisible for months." },
      { title: "Google Business Profile setup", desc: "Getting into the Google Maps 3-pack is where most local calls come from. I set up and optimise your Google Business Profile so you appear for local searches." },
      { title: "Location-targeted pages", desc: "Dedicated pages targeting your specific Glasgow area and trade terms — 'plumber Shawlands', 'electrician Bearsden' etc. Each page targets its own keyword." },
      { title: "Technical SEO foundations", desc: "Fast load times, mobile-first build, proper heading structure, meta titles, canonical tags — all the technical work that bigger agencies charge separately for." },
    ],
    comparisonTitle: "SEO built-in vs paying an SEO agency on top",
    comparisonRows: [
      { them: "SEO agencies: £300–£1,000/mo on top of your site cost", us: "MunroStudio: SEO included in £55/mo" },
      { them: "Site built first, SEO bolted on later", us: "SEO built into the site architecture from day one" },
      { them: "No Google Business Profile setup", us: "GBP set up and optimised as standard" },
      { them: "Sitemap not submitted — pages take months to index", us: "Sitemap submitted immediately after launch" },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "For a new site, expect 2–6 months before page 1 rankings for competitive local terms. Google Maps (via your Google Business Profile) is faster — you can appear in the local 3-pack within weeks. Long-tail terms like 'plumber Kirkintilloch' rank faster than 'plumber Glasgow'." },
      { q: "Do you submit my sitemap to Google?", a: "Yes — after every site launch I submit the sitemap.xml to Google Search Console. This tells Google exactly which pages exist and prompts faster crawling and indexing." },
      { q: "Is local SEO different from regular SEO?", a: "Yes. Local SEO focuses on appearing for searches like 'plumber near me' or 'cafe Glasgow Southside' — searches with geographic intent. It leans heavily on Google Business Profile, local citations, location-specific pages, and consistent NAP (name, address, phone) data across the web." },
    ],
  },

  "google-reviews-integration": {
    slug: "google-reviews-integration",
    title: "Google Reviews Integration | Live Reviews on Your Website | MunroStudio",
    metaDescription: "I integrate your live Google reviews directly onto your website. Build trust, boost SEO, and turn visitors into customers. Included in £55/mo.",
    h1: "Google Reviews integration",
    h1Accent: "on your website.",
    intro: "Displaying your Google reviews live on your website is one of the fastest ways to build trust with new visitors. I build this into every site — real reviews, live, directly from your Google Business Profile.",
    keyword: "Google reviews website integration",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "5★", l: "Average rating displayed" }, { n: "100%", l: "Real verified reviews" }, { n: "£55", l: "Per month, included" }],
    benefits: [
      { title: "Live verified reviews on your site", desc: "Real Google reviews shown on your site — names, star ratings, review text. Verified by Google, so visitors know they're genuine." },
      { title: "Builds trust before they contact you", desc: "8 out of 10 people read reviews before contacting a business. Having your best Google reviews visible on your homepage converts browsers into enquiries." },
      { title: "Helps with SEO too", desc: "More reviews and review-related content on your site adds fresh, relevant signals that help your local search rankings." },
      { title: "Links to your Google profile", desc: "A direct 'See all reviews on Google' button drives traffic to your Google Business Profile — encouraging more reviews and boosting your Maps presence." },
    ],
    comparisonTitle: "No reviews vs Google reviews integrated",
    comparisonRows: [
      { them: "Blank site — visitors have to search for reviews elsewhere", us: "Reviews visible immediately on your homepage" },
      { them: "Fake review widgets that visitors don't trust", us: "Real Google-verified reviews, linked to your profile" },
      { them: "Reviews hidden on Google only — low conversion", us: "Reviews on your site + link to Google profile" },
      { them: "DIY review integration — complex, breaks easily", us: "Built-in as standard, always works" },
    ],
    faqs: [
      { q: "Do I need a Google Business Profile first?", a: "Yes — I'll set one up for you if you don't have one. A Google Business Profile is free and is also how you appear on Google Maps." },
      { q: "How many reviews will show on my site?", a: "I display all your Google reviews on the site with a link to 'See all on Google'. The fresher and more numerous your reviews, the better it looks — I can show you how to encourage more reviews from happy customers." },
      { q: "Can I choose which reviews to show?", a: "With a standard integration, all your Google reviews are shown (Google doesn't let you filter which ones appear). The best approach is to focus on getting more 5-star reviews so the overall display is always strong." },
    ],
  },

  "admin-portals-glasgow": {
    slug: "admin-portals-glasgow",
    title: "Admin Portals for Websites | Update Your Own Site | MunroStudio",
    metaDescription: "I build admin portals so you or your clients can update photos, services, and content without code. Included in £55/mo from MunroStudio Glasgow.",
    h1: "Admin portals",
    h1Accent: "for your website.",
    intro: "An admin portal means you — or your client — can update photos, services, prices, and content without calling a developer or touching any code. I build this into sites as standard.",
    keyword: "admin portal website Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "0", l: "Code needed to update" }, { n: "∞", l: "Content changes" }, { n: "£55", l: "Per month, included" }],
    benefits: [
      { title: "Update content without calling me", desc: "Add photos, change prices, update your services list, swap out text — all from a simple dashboard. No developer, no waiting, no extra cost." },
      { title: "Built for non-technical users", desc: "Clean, simple interface. If you can use Facebook, you can use your admin portal. No code, no jargon." },
      { title: "Control photos and galleries", desc: "Add, remove and reorder photos of your work directly from your phone or laptop. Perfect for tradespeople, salons, builders, and anyone who wants to keep their portfolio fresh." },
      { title: "Manage services and pricing", desc: "Add new services, remove old ones, update prices — all without emailing or waiting for a developer to make a 5-minute change." },
    ],
    comparisonTitle: "No admin access vs MunroStudio admin portal",
    comparisonRows: [
      { them: "No admin access — email developer for every change", us: "Your own dashboard — update yourself, instantly" },
      { them: "Developers charge £50–£150/hr for small updates", us: "Unlimited changes included at £55/mo" },
      { them: "Wait days or weeks for simple text changes", us: "Make changes yourself in minutes" },
      { them: "No control over your own site", us: "Full control over photos, services, and content" },
    ],
    faqs: [
      { q: "What can I update in the admin portal?", a: "Photos and galleries, services list, pricing, text content, contact details, testimonials — the main things that change regularly. For bigger structural changes (new pages, design changes) I handle those as part of your £55/mo." },
      { q: "Is the admin portal secure?", a: "Yes — it's password-protected and only accessible to you. No public-facing access, and all changes are saved to your site in real time." },
      { q: "Do I need tech skills to use it?", a: "No. It's built for business owners, not developers. If you can upload a photo to Facebook, you can update your site through the admin portal." },
    ],
  },

  "ecommerce-websites-glasgow": {
    slug: "ecommerce-websites-glasgow",
    title: "E-Commerce Websites Glasgow | Online Ordering & Sales | MunroStudio",
    metaDescription: "Custom e-commerce and online ordering websites for Glasgow businesses. Take orders, sell online, manage products. Built for £55/mo+. Call 07485 218 091.",
    h1: "E-commerce websites Glasgow",
    h1Accent: "sell online, 24/7.",
    intro: "Whether you need a full online shop, a simple ordering system, or a booking-and-pay flow, I build it. Custom-built for your Glasgow business — not a Shopify template.",
    keyword: "ecommerce website Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "24/7", l: "Your shop is open" }, { n: "0%", l: "Platform fees on sales" }, { n: "POA", l: "Scoped to your needs" }],
    benefits: [
      { title: "Full product catalogue & checkout", desc: "Products, categories, variants, stock tracking, discount codes, and a smooth checkout. Custom-built to match your brand, not a generic Shopify storefront." },
      { title: "Click & collect or delivery", desc: "Let customers order online and collect in store, or set up delivery options with your own rates. Works for food, retail, trade supplies, and more." },
      { title: "Booking and pay", desc: "For service businesses — customers book a slot and pay a deposit or full amount online. Reduces no-shows and gets revenue in before the job starts." },
      { title: "No monthly platform fees eating your margin", desc: "Unlike Shopify (£29–£259/mo + 2% fees), your custom store has no per-sale platform fees. You keep what you earn." },
    ],
    comparisonTitle: "Shopify vs a custom MunroStudio store",
    comparisonRows: [
      { them: "Shopify: £29–£259/mo + transaction fees on every sale", us: "Custom build: no transaction fees, no platform markup" },
      { them: "Shopify template: looks like everyone else's store", us: "Custom design, unique to your Glasgow business" },
      { them: "Limited control over checkout and UX", us: "Built exactly how your customers need to shop" },
      { them: "SEO limitations with Shopify's URL structure", us: "Proper SEO-first build from the ground up" },
    ],
    faqs: [
      { q: "How much does an e-commerce website cost?", a: "It depends on complexity — a simple ordering/booking flow might be included in the £55/mo plan, while a full product catalogue with checkout, stock management, and a custom admin panel is a custom build priced on scope. Get in touch and I'll give you a straight answer." },
      { q: "Can you build a food ordering site?", a: "Yes — online ordering for cafes, restaurants, and takeaways is one of the most common builds I do. Menu management, item customisation, delivery vs collection, and payment processing all included." },
      { q: "Do you integrate payment systems?", a: "Yes — Stripe and PayPal as standard. Stripe in particular is excellent for Scottish businesses — fast setup, competitive fees (1.5% for UK cards), and no monthly minimums." },
    ],
  },

  "booking-system-website-glasgow": {
    slug: "booking-system-website-glasgow",
    title: "Booking System Integration Glasgow | Google Calendar & More | MunroStudio",
    metaDescription: "I integrate booking systems into your Glasgow business website — Google Calendar, Calendly, custom booking flows. Included at £55/mo. Call 07485 218 091.",
    h1: "Booking system integration",
    h1Accent: "for your Glasgow website.",
    intro: "Customers who can't book online go to the next business that lets them. I integrate Google Calendar, Calendly, and custom booking flows directly into your site — so you take bookings 24/7 without lifting a finger.",
    keyword: "booking system website Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "24/7", l: "Bookings accepted" }, { n: "0", l: "Calls needed to book" }, { n: "£55", l: "Per month, included" }],
    benefits: [
      { title: "Google Calendar integration", desc: "Customers see your real availability and book directly into your Google Calendar. No double-bookings, no back-and-forth. Works for trades, salons, personal trainers, and any appointment business." },
      { title: "Calendly and other tools", desc: "Already using Calendly, Acuity, SimplyBook, or another booking tool? I embed it directly into your site so customers never leave your page to book." },
      { title: "Custom booking flows", desc: "Need something more specific — multi-step booking, deposit collection, job type selection? I build custom flows tailored exactly to how your business takes bookings." },
      { title: "Automated confirmations", desc: "Customers get an email or SMS confirmation the moment they book. Reminders before the appointment reduce no-shows without any manual work from you." },
    ],
    comparisonTitle: "Phone/email bookings vs online booking system",
    comparisonRows: [
      { them: "Phone only — miss calls outside hours", us: "Online booking — customers book 24/7" },
      { them: "Back-and-forth emails to confirm a time", us: "Real-time availability, instant confirmation" },
      { them: "No-shows with no deposit", us: "Automated reminders + optional deposit collection" },
      { them: "Manual diary management", us: "Google Calendar synced automatically" },
    ],
    faqs: [
      { q: "Which booking systems do you integrate?", a: "Google Calendar (direct integration), Calendly, Acuity Scheduling, SimplyBook.me, Fresha (for salons/spas), and custom-built booking flows for businesses with specific needs. If you use something else, ask me — I can usually integrate it." },
      { q: "Is booking integration included in £55/mo?", a: "Basic booking integration (Google Calendar, Calendly embed) is included. More complex custom booking flows — multi-step, payment collection, automated SMS — are built as part of a custom project, priced on scope." },
      { q: "Can I take deposits when customers book?", a: "Yes — via Stripe, customers can pay a deposit or full amount when booking. This is particularly popular for tradespeople, photographers, and personal trainers where no-shows are costly." },
    ],
  },

  "google-business-profile-setup": {
    slug: "google-business-profile-setup",
    title: "Google Business Profile Setup Glasgow | Get on Google Maps | MunroStudio",
    metaDescription: "I set up and optimise your Google Business Profile so your Glasgow business appears on Google Maps. Included in every website at £55/mo.",
    h1: "Google Business Profile setup",
    h1Accent: "get on Google Maps.",
    intro: "Appearing in the Google Maps 3-pack is where most local calls actually come from. I set up and optimise your Google Business Profile as part of every website build — so you're visible on Maps from day one.",
    keyword: "Google Business Profile setup Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "3-pack", l: "Google Maps target" }, { n: "£0", l: "Google Business is free" }, { n: "£55", l: "Setup included in plan" }],
    benefits: [
      { title: "Appear in the Google Maps 3-pack", desc: "When someone searches 'plumber near me' or 'cafe Glasgow Southside', the Google Maps 3-pack appears at the top of results. A properly optimised Google Business Profile gets you in it." },
      { title: "Full profile optimisation", desc: "Category, services, opening hours, photos, description, Q&A — every section filled in correctly. An incomplete profile ranks lower and converts worse." },
      { title: "Linked to your website", desc: "Your Google Business Profile and your website reinforce each other. A verified business with a live website ranks higher on Maps than one without." },
      { title: "Review collection strategy", desc: "More reviews = higher Maps ranking. I set your profile up to make it as easy as possible for happy customers to leave a review — and show you how to ask for them." },
    ],
    comparisonTitle: "No Google Business Profile vs fully optimised",
    comparisonRows: [
      { them: "No GBP — invisible on Google Maps", us: "Optimised GBP — visible in local 3-pack" },
      { them: "Basic listing, half the sections empty", us: "Complete profile with photos, services, hours" },
      { them: "No reviews showing on Maps", us: "Reviews visible + strategy to get more" },
      { them: "GBP not linked to your website", us: "Website and GBP cross-linked and reinforcing each other" },
    ],
    faqs: [
      { q: "Is Google Business Profile free?", a: "Yes — setting up a Google Business Profile is completely free. The value is in getting it properly optimised and linked to a strong website, which is where most Glasgow businesses fall short." },
      { q: "How long does it take to appear on Google Maps?", a: "After setup and verification (which takes 1–2 weeks via postcard from Google), your profile is live. Appearing in the top 3 for competitive local searches takes longer — typically 4–12 weeks of consistent reviews and activity." },
      { q: "Do you manage the profile ongoing?", a: "Initial setup and optimisation is included in every site build. Ongoing management (responding to reviews, posting updates, adding photos) is something I can help with as part of your monthly plan." },
    ],
  },

  "local-seo-glasgow": {
    slug: "local-seo-glasgow",
    title: "Local SEO Glasgow | Rank for 'Near Me' Searches | MunroStudio",
    metaDescription: "Local SEO for Glasgow businesses. Rank for near me searches, Google Maps 3-pack, location pages. Built into every website at £55/mo.",
    h1: "Local SEO Glasgow",
    h1Accent: "rank where customers search.",
    intro: "Local SEO is about getting your Glasgow business to appear when nearby customers search for what you offer. Every site I build is optimised for local searches from day one — sitemap submitted, GBP set up, location pages built.",
    keyword: "local SEO Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "£55", l: "Local SEO included" }, { n: "2–6mo", l: "Typical ranking timeline" }, { n: "3-pack", l: "Google Maps target" }],
    benefits: [
      { title: "Location-specific pages", desc: "Dedicated pages targeting 'plumber Glasgow Southside', 'electrician Bearsden', 'cafe West End' — each one targeting a real search people make in your area." },
      { title: "Sitemap submitted to Google", desc: "A sitemap.xml is generated for every site and submitted to Google Search Console so your pages get crawled and indexed quickly — not sitting unfound for months." },
      { title: "Google Business Profile in the 3-pack", desc: "The Maps 3-pack appears above organic results for local searches. I set up and optimise your GBP to target it." },
      { title: "NAP consistency across the web", desc: "Name, address, and phone number consistent across your site, Google, Bing, Apple Maps, Yell, Yelp, and key directories — a foundational local SEO signal." },
    ],
    comparisonTitle: "No SEO vs local SEO from MunroStudio",
    comparisonRows: [
      { them: "Template site with no SEO work — invisible to Google", us: "SEO-first build, sitemap submitted, pages indexed fast" },
      { them: "No location pages — can't rank for area searches", us: "Location-specific pages for your area and nearby areas" },
      { them: "Missing from Google Maps", us: "Google Business Profile optimised and live" },
      { them: "Paying an SEO agency £300–£1,000/mo separately", us: "Local SEO built into £55/mo" },
    ],
    faqs: [
      { q: "What's the difference between local SEO and regular SEO?", a: "Regular SEO targets broad keywords — 'best plumber UK'. Local SEO targets location-based searches — 'plumber Glasgow', 'emergency plumber near me'. Local SEO also focuses heavily on Google Maps rankings (Google Business Profile), which drive most calls for local service businesses." },
      { q: "How soon will I rank on Google?", a: "New sites typically see movement in 2–4 months and competitive page 1 rankings in 4–8 months. Google Maps (via GBP) is faster — the 3-pack can appear within 4–8 weeks for some searches. Long-tail local terms like 'plumber Kirkintilloch' rank faster than broad terms like 'plumber Glasgow'." },
      { q: "Do you submit my sitemap to Google?", a: "Yes — every site launch includes sitemap.xml generation and submission to Google Search Console. This speeds up indexing significantly compared to waiting for Google to discover your pages naturally." },
    ],
  },

  "website-maintenance-glasgow": {
    slug: "website-maintenance-glasgow",
    title: "Website Maintenance Glasgow | Hosting, Updates & Support | MunroStudio",
    metaDescription: "Website maintenance for Glasgow businesses. Hosting, updates, content changes, security, and support — all included at £55/mo with MunroStudio.",
    h1: "Website maintenance Glasgow",
    h1Accent: "we handle everything.",
    intro: "A website isn't a one-time job — it needs hosting, updates, and occasional changes. At £55/month, MunroStudio handles all of it. You focus on your business, I keep your site running and up to date.",
    keyword: "website maintenance Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "£55", l: "Per month all-in" }, { n: "24/7", l: "Site monitored" }, { n: "∞", l: "Content changes" }],
    benefits: [
      { title: "Hosting managed for you", desc: "Fast, secure hosting included — no separate hosting bill, no technical setup. Your site stays live, loads quickly, and is monitored around the clock." },
      { title: "Unlimited content changes", desc: "Need to update your prices? Add a new service? Swap out photos? Just message me and it's done — usually within 24 hours, often same day." },
      { title: "Security and updates", desc: "Keeping a site secure requires regular updates to dependencies and configurations. I handle all of this so you're never running outdated, vulnerable software." },
      { title: "Cancel any time", desc: "No contract, no minimum term. If you decide to take your site elsewhere, I hand over everything cleanly. Most clients stay because it's easier than managing it themselves." },
    ],
    comparisonTitle: "DIY maintenance vs MunroStudio £55/mo",
    comparisonRows: [
      { them: "DIY: hosting £10/mo + your time managing it", us: "£55/mo: hosting + all maintenance + content changes included" },
      { them: "One-off build + no ongoing support", us: "Always-on support — just message me" },
      { them: "Security updates fall through the cracks", us: "Dependencies and security kept current" },
      { them: "Developer charges £75+/hr for small changes", us: "Unlimited changes included in monthly price" },
    ],
    faqs: [
      { q: "What's included in the £55/month maintenance plan?", a: "Hosting on fast UK infrastructure, SSL certificate, security updates, unlimited content changes (text, photos, services, prices), and priority email/WhatsApp support. Everything your site needs to stay live, fast, and up to date." },
      { q: "How do I request content changes?", a: "WhatsApp or email me directly. Most changes are done within 24 hours — often same day for straightforward updates like text or photo swaps." },
      { q: "What if I want to cancel?", a: "No tie-ins, no notice period. If you decide to leave, I export your site and hand everything over cleanly — code, content, and domain transfer assistance." },
    ],
  },

  "websites-for-small-businesses-glasgow": {
    slug: "websites-for-small-businesses-glasgow",
    title: "Small Business Websites Glasgow | From £0 First Month | MunroStudio",
    metaDescription: "Affordable custom websites for Glasgow small businesses — cafes, salons, shops, gyms, cleaners. First month free. Call 07485 218 091.",
    h1: "Websites for Glasgow",
    h1Accent: "small businesses.",
    intro: "Cafes, salons, shops, gyms, cleaners, personal trainers — if you're a Glasgow small business relying on Instagram or word of mouth, a proper website is the single biggest upgrade you can make. First month free.",
    keyword: "small business websites Glasgow",
    audienceLabel: "Glasgow small businesses",
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Monthly after" }, { n: "£499", l: "Or one-off, hosted by us" }],
    benefits: [
      { title: "More than a link in bio", desc: "Your Instagram is great for awareness, but it doesn't rank on Google, customers can't book through it properly, and you don't own it. Your own website does all three." },
      { title: "Local SEO for neighbourhood searches", desc: "'Cafes Shawlands', 'nail salon Finnieston', 'gym Merchant City' — I optimise every site for your specific Glasgow area so your customers find you first." },
      { title: "Booking, menus, galleries — whatever you need", desc: "Online booking forms, digital menus, photo galleries, shop pages, reservation widgets — I build exactly what your business needs, nothing you don't." },
      { title: "Built for busy owners", desc: "I handle everything — domain, hosting, design, copy, photos, SEO. You send me a rough brief, I build the site, you review it, we go live. Minimal work on your end." },
    ],
    comparisonTitle: "Squarespace DIY vs custom with MunroStudio",
    comparisonRows: [
      { them: "Squarespace: templates everyone else uses", us: "Fully custom design unique to your business" },
      { them: "You spend 40+ hours building it yourself", us: "I build it, you review, we launch" },
      { them: "£192/year for Business plan + extras", us: "£55/mo all-in, or £499 once" },
      { them: "Generic SEO out of the box", us: "Properly optimised for your specific Glasgow area" },
    ],
    faqs: [
      { q: "I already have Instagram — do I need a website?", a: "Short answer: yes. Instagram is great for awareness but poor for conversion. Customers looking for 'best cafes in Glasgow' go to Google, not Instagram, and without a website you're invisible to them. A website also lets people book, buy, or enquire at 2am when Instagram DMs go unread." },
      { q: "Can you integrate online booking?", a: "Yes — I can integrate with whatever booking system you use (Fresha, Treatwell, Calendly, SimplyBook, etc.) or build a simple custom booking flow. For cafes and restaurants I can add OpenTable, Tock, or a simple reservation form." },
      { q: "Will you write the copy for me?", a: "Yes — most small business owners don't have time to write website copy, so I'll draft it based on your existing materials (social posts, menus, Google Business descriptions) and refine it with you until it sounds right." },
      { q: "What about photos? I don't have a photographer.", a: "If you've got decent phone photos I can work with those. If you want a proper photoshoot, I can recommend affordable Glasgow photographers, but it's not essential — modern phone cameras genuinely work for most small business sites." },
    ],
  },

  "web-design-near-me": {
    slug: "web-design-near-me",
    title: "Web Design Near Me | Glasgow-Based Web Designer | MunroStudio",
    metaDescription: "Searching 'web design near me'? MunroStudio is a Glasgow-based web designer covering the whole Greater Glasgow area. First month free, then £55/mo. Call 07485 218 091.",
    h1: "Web design near me",
    h1Accent: "a real Glasgow-based designer.",
    intro: "Searching 'web design near me' usually turns up faceless agencies or freelancers three time zones away. I'm actually based in Glasgow, work across the whole Greater Glasgow area, and I'm happy to meet face-to-face if you'd rather not do everything over email.",
    keyword: "web design near me",
    audienceLabel: "local businesses",
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Per month after" }, { n: "2–3wk", l: "From signup to live" }],
    benefits: [
      { title: "Genuinely local, not just a landing page", desc: "I'm based in Glasgow and work with businesses across the city and surrounding towns — Paisley, Clydebank, East Kilbride, Hamilton and beyond. 'Near me' means near me, not a call centre." },
      { title: "Meet in person if you want to", desc: "Prefer a face-to-face chat over a video call? I'm happy to meet in Glasgow or come to you. Most clients end up preferring WhatsApp once we get going, but the option's there." },
      { title: "Built to rank for local searches", desc: "Every site I build is optimised for the exact kind of local, near-me searches your own customers use to find you — not just generic keywords." },
      { title: "First month completely free", desc: "No card needed to start. Use the live site for a month risk-free, then decide between £55/month or a £499 one-off, hosted by us." },
    ],
    comparisonTitle: "Anonymous agency vs an actual local web designer",
    comparisonRows: [
      { them: "Directory listings: no idea who's actually building your site", us: "You know exactly who I am and where I'm based" },
      { them: "Offshore freelancers: language and time-zone friction", us: "Same time zone, same city, WhatsApp throughout" },
      { them: "Generic template dropped on a subdomain", us: "Custom-built site designed around your business" },
      { them: "No way to meet in person", us: "Happy to meet face-to-face in Glasgow" },
    ],
    faqs: [
      { q: "Are you actually based in Glasgow?", a: "Yes — I'm a Glasgow-based web designer and work with businesses across the whole Greater Glasgow area, plus clients further afield across Scotland and the UK." },
      { q: "Do you only work with businesses right next to you?", a: "No — 'near me' searches usually mean the whole city and surrounding towns, not just one postcode. I cover Glasgow, Paisley, Clydebank, East Kilbride, Hamilton, and the wider Central Belt, all remotely or in person." },
      { q: "Can I meet you before deciding?", a: "Of course. A quick call or WhatsApp chat is usually enough to scope the project, but if you'd rather meet in person in Glasgow first, I'm happy to arrange that." },
      { q: "How is this different from a big web design directory?", a: "Directories connect you with whoever bids lowest — you often don't know who's actually building your site. With MunroStudio you're dealing directly with me, start to finish." },
    ],
  },

  "generative-engine-optimization-glasgow": {
    slug: "generative-engine-optimization-glasgow",
    title: "Generative Engine Optimization (GEO) Glasgow | AI Search Ready Sites | MunroStudio",
    metaDescription: "GEO for Glasgow businesses — get your website structured so ChatGPT, Perplexity and Google AI Overviews can find and cite it. Built into every MunroStudio site.",
    h1: "Generative Engine Optimization",
    h1Accent: "get found by AI, not just Google.",
    intro: "More customers are asking ChatGPT, Perplexity and Google's AI Overviews for recommendations instead of typing a search and scrolling. GEO — Generative Engine Optimization — is about structuring your site so those tools can actually read, understand and recommend your business. I build it into every site as standard.",
    keyword: "generative engine optimization Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "AI", l: "Search is growing fast" }, { n: "£55", l: "GEO included, per month" }, { n: "3", l: "Engines targeted: ChatGPT, Perplexity, Google AI" }],
    benefits: [
      { title: "Structured, quotable content", desc: "AI engines pull clear, direct answers — not vague marketing copy. I write your service and FAQ content in a structured, quotable format that's easy for an AI model to lift and cite." },
      { title: "FAQ schema on every page", desc: "Every site ships with FAQPage structured data — the same markup AI answer engines and Google's AI Overviews use to pull direct Q&A content straight from your site." },
      { title: "Clean, crawlable technical foundations", desc: "AI crawlers need fast, simple, well-structured HTML to read your site properly. No bloated page builders or JavaScript-heavy templates blocking access to your content." },
      { title: "Consistent facts across the web", desc: "AI engines cross-reference your website against Google Business Profile, directories and reviews. I keep your name, address, phone number and service details consistent everywhere, which builds the trust these tools look for." },
    ],
    comparisonTitle: "Traditional SEO-only agencies vs GEO built in",
    comparisonRows: [
      { them: "Most agencies: SEO for Google only, AI search ignored", us: "MunroStudio: structured for Google and AI answer engines" },
      { them: "Vague marketing copy AI can't quote", us: "Clear, direct, quotable answers throughout" },
      { them: "No FAQ or structured data markup", us: "FAQPage + LocalBusiness schema on every page" },
      { them: "Paying an SEO agency extra for 'AI SEO'", us: "GEO included in your £55/mo, no extra charge" },
    ],
    faqs: [
      { q: "What is Generative Engine Optimization (GEO)?", a: "GEO is the practice of structuring a website so AI answer engines — ChatGPT, Perplexity, Google's AI Overviews, Copilot — can read, understand and cite it when answering a user's question. It sits alongside traditional SEO rather than replacing it." },
      { q: "How is GEO different from normal SEO?", a: "Traditional SEO targets ranking positions in a list of blue links. GEO targets being the source an AI model quotes or recommends directly in its answer — which means clear, structured, factual content matters more than keyword density." },
      { q: "Can you guarantee my business gets mentioned by ChatGPT?", a: "No one can guarantee a specific AI mention — the engines are black boxes and constantly changing. What I can do is build your site with the structure, schema and clarity that make it far more likely to be read, understood and cited than a typical local competitor's site." },
      { q: "Is GEO included in the £55/month plan?", a: "Yes — structured content, FAQ schema, and clean technical foundations are built into every site I make, at no extra cost on top of the standard £55/month plan." },
    ],
  },

  "ai-search-optimization-glasgow": {
    slug: "ai-search-optimization-glasgow",
    title: "AI Search Optimization Glasgow | Get Found on ChatGPT & AI Overviews | MunroStudio",
    metaDescription: "AI search optimization for Glasgow businesses — appear in ChatGPT answers, Google AI Overviews and Perplexity results. Built into every MunroStudio website.",
    h1: "AI search optimization",
    h1Accent: "for Glasgow businesses.",
    intro: "Google's AI Overviews now sit above the normal results for most searches, and millions of people ask ChatGPT and Perplexity for recommendations directly. If your site isn't built for AI search, you're invisible to a growing slice of your customers before they even reach a traditional results page.",
    keyword: "AI search optimization Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "AI Overviews", l: "Now above search results" }, { n: "£55", l: "Per month, included" }, { n: "2–3wk", l: "To launch" }],
    benefits: [
      { title: "Built for AI Overviews, not just page one", desc: "Google's AI Overviews pull from clearly structured, high-trust content. I write and structure your pages so they're a strong candidate for those AI-generated summaries, not just the classic 10 blue links." },
      { title: "Answers written the way people ask AI tools", desc: "People ask ChatGPT and Perplexity full questions in plain language — 'who's a good plumber in Paisley' — not keyword fragments. Your FAQ content is written to match that conversational style." },
      { title: "Technical SEO an AI crawler can actually parse", desc: "Fast load times, semantic HTML, and no walls of unindexable JavaScript. AI crawlers need clean markup to extract facts about your business reliably." },
      { title: "Works alongside your normal Google rankings", desc: "AI search optimization isn't a replacement for local SEO — it's layered on top. You still get sitemap submission, Google Business Profile setup, and standard local SEO as part of every build." },
    ],
    comparisonTitle: "Ignoring AI search vs optimizing for it",
    comparisonRows: [
      { them: "Site only targets classic Google rankings", us: "Site targets Google, AI Overviews and chat-based search" },
      { them: "No structured data — AI tools skip past it", us: "FAQ and LocalBusiness schema on every page" },
      { them: "Answers buried in long paragraphs", us: "Clear, direct answers AI models can lift and quote" },
      { them: "Paying a specialist agency separately for 'AI SEO'", us: "Included as standard in every MunroStudio build" },
    ],
    faqs: [
      { q: "What's the difference between AI search optimization and GEO?", a: "They're the same idea, different names — Generative Engine Optimization (GEO) is the more formal term for optimizing content so AI answer engines like ChatGPT, Perplexity and Google AI Overviews can find and cite it." },
      { q: "Do AI Overviews actually send traffic?", a: "Being featured in an AI Overview or cited by ChatGPT often builds trust and brand recall even without a click — and when there is a click-through, it tends to be a highly qualified visitor who already trusts the recommendation." },
      { q: "Will this replace my need for normal SEO?", a: "No — AI search optimization works alongside standard local SEO, not instead of it. Every site still gets sitemap submission, Google Business Profile setup, and keyword-optimised pages as standard." },
      { q: "How do I know if my current site is AI-search ready?", a: "Ask ChatGPT or Perplexity a question your ideal customer might ask — 'best plumber in Glasgow Southside', for example — and see if your business comes up. If it doesn't, message me and I'll take a look at what's missing." },
    ],
  },

  "chatgpt-seo-glasgow": {
    slug: "chatgpt-seo-glasgow",
    title: "Get Found on ChatGPT | ChatGPT SEO for Glasgow Businesses | MunroStudio",
    metaDescription: "Want your Glasgow business recommended by ChatGPT? I structure your website and online presence so AI chat tools can find, trust and cite you.",
    h1: "Get found on ChatGPT",
    h1Accent: "not just Google.",
    intro: "When someone asks ChatGPT 'who's a good electrician in Glasgow', the answer comes from somewhere. I build and structure Glasgow business websites so they're a credible, citable source for that answer — clear facts, consistent details, and content AI tools can actually trust.",
    keyword: "ChatGPT SEO Glasgow",
    audienceLabel: "Glasgow businesses",
    heroStats: [{ n: "1", l: "Consistent business profile everywhere" }, { n: "£55", l: "Per month, included" }, { n: "AI-ready", l: "Content structure" }],
    benefits: [
      { title: "Clear facts, not vague marketing", desc: "ChatGPT and similar tools favour concrete, specific facts — your services, area covered, pricing model, contact details — over generic marketing language it can't verify." },
      { title: "Consistent details across the web", desc: "Your business name, address, phone number and services need to match across your website, Google Business Profile, and directories. Inconsistency makes AI tools less confident recommending you." },
      { title: "FAQ content written the way people actually ask", desc: "ChatGPT users type full, conversational questions. Your site's FAQ section is written to directly answer the kind of questions real customers ask an AI assistant." },
      { title: "A real Google Business Profile behind it", desc: "AI tools lean heavily on Google's own data. I set up and optimise your Google Business Profile as part of every build, reinforcing what your website already says." },
    ],
    comparisonTitle: "Invisible to AI chat tools vs built to be found",
    comparisonRows: [
      { them: "No structured facts — AI has nothing solid to cite", us: "Clear services, area and pricing facts throughout" },
      { them: "Inconsistent business details across the web", us: "Consistent name, address, phone and services everywhere" },
      { them: "Marketing fluff instead of direct answers", us: "FAQ content written to directly answer real questions" },
      { them: "No Google Business Profile, or a half-finished one", us: "Google Business Profile set up and optimised as standard" },
    ],
    faqs: [
      { q: "Can you guarantee ChatGPT recommends my business?", a: "No — no one controls what ChatGPT says, and it changes over time. What I can do is remove the reasons it wouldn't recommend you: unclear facts, inconsistent details, and thin content — and build in the reasons it would." },
      { q: "Does ChatGPT use my website directly?", a: "It depends on the version and whether browsing is enabled, but AI tools are increasingly trained on and reference live web content, alongside data sources like Google's own index and Business Profiles. A well-structured, up-to-date site helps on every front." },
      { q: "Is this different from normal SEO work?", a: "It builds on the same foundation — a fast, well-structured, keyword-relevant site — but adds a layer focused specifically on clarity and consistency, which is what AI tools weigh most heavily." },
      { q: "Is this included in my monthly plan?", a: "Yes — every site I build follows this approach as standard, at no extra cost on top of your £55/month plan." },
    ],
  },
};

// ─── Generate Glasgow area pages automatically ──────────────────────────────
// Each area gets ONE canonical URL: /web-design-{area} (SEO-optimised for
// "web design {area}" searches). The short /{area} form (e.g. for ad copy
// like "munrostudio.co.uk/lenzie") 301-redirects here — see next.config.js.
// Serving both as separate pages created duplicate content that Google
// flagged in Search Console ("Duplicate, Google chose different canonical
// than user") and left the short URLs unindexed.

glasgowAreas.forEach((area) => {
  const pageData = {
    title: `Web Design ${area.name} | Custom Websites from £0 | MunroStudio`,
    metaDescription: `Custom web design for ${area.name} businesses. Local SEO, first month free, then £55/mo. Glasgow-based. Call 07485 218 091.`,
    h1: `Web design in ${area.name}`,
    h1Accent: "built to win local jobs.",
    intro: `Custom-built websites for ${area.name} businesses and tradespeople. I'm Glasgow-based, which means I know the area — and I build sites that rank for '${area.name.toLowerCase()}' searches on Google. First month on me.`,
    keyword: `web design ${area.name}`,
    audienceLabel: `${area.name} businesses`,
    heroStats: [
      { n: "£0", l: "First month" },
      { n: "£55", l: "Per month after" },
      { n: "£499", l: "Or one-off" },
    ],
    benefits: [
      { title: `Ranks for '${area.name}' searches`, desc: `Your site will be optimised for high-intent local terms — 'plumber ${area.name}', 'electrician ${area.name}', 'cafe ${area.name}'. Where real customers search.` },
      { title: "Glasgow-based — I know the area", desc: `${area.blurb} I understand local customers, nearby areas (${area.nearby.join(", ")}), and what works for ${area.name} businesses specifically.` },
      { title: "Custom design, no templates", desc: `Every site is hand-built in Next.js — the same tech used by the biggest tech companies. You won't look like every other ${area.name} small business.` },
      { title: "First month free, then £55/mo", desc: "Launch for £0. Use it for a month risk-free. If it's not bringing in enquiries, cancel — no fee. Otherwise £55/month, or £499 one-off, hosted by us." },
    ],
    comparisonTitle: `Why MunroStudio vs a template builder for ${area.name}`,
    comparisonRows: [
      { them: `Template builders: same site as every other ${area.name} business`, us: `MunroStudio: fully custom, made for your brand` },
      { them: "Squarespace/Wix: you spend 40+ hours, it still looks generic", us: "I build everything, you review and approve" },
      { them: "No proper local SEO out of the box", us: `Optimised for '${area.name}' and local searches from day one` },
      { them: "Pay forever with no ownership", us: "£499 one-off, hosted by us — no monthly fee" },
    ],
    faqs: [
      { q: `Do you work with ${area.name} businesses?`, a: `Yes — I'm based in Glasgow but work with businesses and tradespeople across ${area.name} and nearby areas like ${area.nearby.join(", ")}. Most communication happens over WhatsApp or phone, and I'm happy to meet in person if you prefer.` },
      { q: `How long will it take to rank for '${area.name.toLowerCase()}' searches?`, a: `2–6 months for new sites to rank on page 1 for competitive local terms is realistic. However, with a properly set-up Google Business Profile, you can appear in the Google Maps pack within weeks, which is where most actual calls come from.` },
      { q: "Do you offer meetings in person?", a: `Absolutely — if you're in ${area.name} or nearby, I'm happy to come meet you. Most clients prefer a WhatsApp chat or quick call first, but in-person works fine if that suits you better.` },
      { q: "Is my business too small for a custom website?", a: `No business is too small. Whether you're a solo tradesman, a cafe, a single-chair salon or a small shop in ${area.name}, a proper website is still the single biggest upgrade you can make to how customers find you.` },
    ],
  };

  seoPages[`web-design-${area.slug}`] = { ...pageData, slug: `web-design-${area.slug}` };
});

// ─── Generate trade × area pages automatically ──────────────────────────────
// One page per (trade, area) pair — e.g. /plumber-website-paisley,
// /electrician-website-hamilton. Each combination targets a genuinely
// distinct search query ("plumber Paisley" vs "electrician Hamilton" are
// different intents, unlike the old /{area} vs /web-design-{area} pair which
// was literally the same content at two URLs). Content varies by BOTH trade
// (benefits/comparisons/FAQs are trade-specific) and area (name/blurb/nearby
// towns), so no two pages are near-duplicates of each other.
export const trades = [
  {
    slug: "plumber",
    name: "Plumber",
    namePlural: "plumbers",
    h1Accent: "that ring your phone.",
    heroStat: { n: "24/7", l: "Website works" },
    intro: (area) => `Every ${area.name} plumber needs a website that ranks for 'plumber near me' and 'emergency plumber ${area.name}'. I build fast, mobile-first sites that turn searches into phone calls.`,
    benefits: (area) => [
      { title: `Ranks for 'emergency plumber ${area.name}'`, desc: `Emergency plumbing searches are the most valuable jobs you can win. I optimise every site specifically for urgent, local ${area.name} terms so you're the first call when a pipe bursts.` },
      { title: "Click-to-call everywhere", desc: "Every page has your phone number one tap away. People searching for a plumber at 11pm aren't filling in forms — they're calling. Your site needs to make that easy." },
      { title: "Shows your accreditations", desc: "Gas Safe, WaterSafe, SNIPEF, insurance docs — I design sections that highlight your credentials so customers trust you before they even pick up the phone." },
      { title: "Gallery of your work", desc: "Before/after photos of boilers, bathrooms, leaks fixed — visual proof of your work is the single biggest trust factor for local plumbing jobs." },
    ],
    comparisonRows: (area) => [
      { them: `Checkatrade: £100+/month shared with other ${area.name} plumbers`, us: "Your site: every call is yours, exclusively" },
      { them: "No control over your profile's design", us: "Fully branded site that looks trustworthy" },
      { them: "Stop paying, you disappear", us: "Site stays live, hosted by us — no monthly fee on the one-off plan" },
      { them: "No way to rank in Google Maps", us: "Google Business Profile optimised day one" },
    ],
    faqs: (area) => [
      { q: `How long does it take to rank for 'plumber ${area.name}'?`, a: `Honest answer: 2–6 months for a new site to rank on page 1 for competitive local terms. BUT — Google Maps is different. With a properly set-up Google Business Profile, you can appear in the 3-pack on Maps within weeks for ${area.name} searches, which is where most actual calls come from.` },
      { q: "Do I need an emergency call-out page?", a: "100%. Emergency jobs are the highest-paying plumbing work, and people searching for 'emergency plumber' at 10pm are ready to pay — they just want someone to pick up. I'll build you a dedicated emergency page optimised for those high-intent searches." },
      { q: "Can you integrate a booking system?", a: "Yes — I can add a simple enquiry form, a 'request a quote' flow, or a proper booking calendar if you need one. Most plumbers prefer just a clear phone number and a form, because urgent jobs are phone calls." },
      { q: `Do you work with plumbers outside ${area.name} too?`, a: `Yes — I'm Glasgow-based and build sites for plumbers right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
  {
    slug: "electrician",
    name: "Electrician",
    namePlural: "electricians",
    h1Accent: "that build trust fast.",
    heroStat: { n: "100%", l: "Mobile-first" },
    intro: (area) => `A domestic or commercial electrician in ${area.name} needs a website that signals qualification and trust instantly. I build sites that show off your NICEIC, SELECT or NAPIT accreditation and turn local searches into bookings.`,
    benefits: (area) => [
      { title: "NICEIC / SELECT / NAPIT badges front and centre", desc: "Qualifications are the #1 trust signal for electrical work. I make sure your accreditations are impossible to miss — on the header, near every CTA, and on a dedicated credentials page." },
      { title: `Ranks for local electrical searches in ${area.name}`, desc: `'EICR ${area.name}', 'electrician ${area.name}', 'rewire quote ${area.name}' — these are the searches that turn into actual jobs. Every page is built to target them.` },
      { title: "Service pages that convert", desc: "Separate optimised pages for EICRs, rewires, consumer unit upgrades, EV charger installation, commercial work — each targeting the right keyword." },
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or go one-off for £499, hosted by us. No card up front." },
    ],
    comparisonRows: (area) => [
      { them: `Checkatrade: £1,200+/year, shared leads across ${area.name}`, us: "Your site: £499 once or £55/mo, exclusive leads" },
      { them: "Generic profile, no way to stand out", us: "Custom branded site with your accreditations" },
      { them: "No control over reviews visibility", us: "Your best reviews displayed prominently" },
      { them: `Can't rank for 'EV charger installation ${area.name}'`, us: "Dedicated service pages for every keyword" },
    ],
    faqs: (area) => [
      { q: "What pages should an electrician's website have?", a: "At minimum: Home, Services (with separate pages for EICRs, rewires, consumer units, EV chargers, commercial), About (with your accreditations), Gallery, Reviews, and Contact. Separate service pages massively help local SEO — each one can rank individually." },
      { q: "Can you add an EV charger installation page?", a: "Absolutely — EV charger installation is one of the fastest-growing electrical services, with OZEV grant changes driving demand. A dedicated page optimised for your local search is a brilliant way to win those premium jobs." },
      { q: "Do I need to show my public liability insurance?", a: "It helps. Alongside your NICEIC/SELECT number, displaying proof of insurance (a simple badge or a line like 'Fully insured, £5m PLI') significantly improves conversions on electrical enquiries — especially for bigger jobs like rewires." },
      { q: `Do you work with electricians outside ${area.name}?`, a: `Yes — I'm Glasgow-based and build sites for electricians right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
  {
    slug: "builder",
    name: "Builder",
    namePlural: "builders",
    h1Accent: "that showcase your work.",
    heroStat: { n: "∞", l: "Project photos" },
    intro: (area) => `Builders in ${area.name} win jobs on their portfolio. I build image-heavy, fast-loading sites that show off your extensions, renovations and new builds in full visual glory — and turn browsers into signed contracts.`,
    benefits: (area) => [
      { title: "Portfolio built for serious browsing", desc: "Custom galleries with before/after shots, full project case studies, and filter-by-type (extension, renovation, new build, loft conversion). Buyers spend minutes on your site, not seconds." },
      { title: `Ranks for high-value ${area.name} keywords`, desc: `'Extension builder ${area.name}', 'loft conversion ${area.name}', 'renovation contractor ${area.name}' — these bring in £10k–£100k+ jobs. Every service page targets one of them.` },
      { title: "Case study pages that sell", desc: "For each major project, a dedicated page with story, photos, scope, and outcome. Case studies are the single most effective sales tool for a builder." },
      { title: "Works for solo builders and construction firms", desc: "Whether you're a solo builder doing domestic extensions or a 15-person outfit doing commercial fit-outs, I scale the design to match your scope." },
    ],
    comparisonRows: (area) => [
      { them: "Checkatrade: generic profile, no portfolio depth", us: "Custom site with unlimited project showcases" },
      { them: "Can't tell the story of a project", us: "Full case study pages for each major build" },
      { them: `Competing with other ${area.name} builders on every lead`, us: "Direct enquiries, yours exclusively" },
      { them: "£1,200+/year forever", us: "£499 once or £55/mo (first month free)" },
    ],
    faqs: (area) => [
      { q: "How many project photos can I include?", a: "As many as you like. Image optimisation and lazy-loading mean your site stays fast even with 100+ photos. I'd recommend starting with 15–20 of your best across 5–8 projects, then adding case studies over time." },
      { q: "Can you add a quote calculator?", a: "Yes — for things like extensions or loft conversions where pricing follows a rough formula (square footage + spec level), a calculator is a brilliant lead-qualifier. It also filters out tyre-kickers before they eat your time." },
      { q: `Will my site show up on 'extension builder ${area.name}' searches?`, a: `With proper local SEO and a Google Business Profile, yes — typically within 2–6 months for competitive terms. Longer-tail terms specific to ${area.name} tend to rank faster than broad city-wide terms.` },
      { q: `Do you work with builders outside ${area.name}?`, a: `Yes — I'm Glasgow-based and build sites for builders right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
  {
    slug: "roofer",
    name: "Roofer",
    namePlural: "roofers",
    h1Accent: "that win the next roof job.",
    heroStat: { n: "100%", l: "Guarantees showcased" },
    intro: (area) => `Roofing jobs in ${area.name} go to whoever looks most trustworthy in the first ten seconds. I build sites that lead with your guarantees, insurance and finished work — and rank for 'roofer near me' and 'emergency roof repair ${area.name}'.`,
    benefits: (area) => [
      { title: `Ranks for 'emergency roof repair ${area.name}'`, desc: `Storm damage and leaks are urgent, high-value jobs. Every site is optimised for the local, high-intent searches ${area.name} homeowners make when a roof needs fixing now.` },
      { title: "Guarantees and accreditations front and centre", desc: "NFRC membership, insurance-backed guarantees, public liability cover — these are the details that turn a nervous homeowner into a booked job. I design sections that put them front and centre." },
      { title: "Before/after roof photos that sell the job", desc: "A gallery of finished roofs — reslates, flat roof replacements, guttering — is the single biggest trust factor for a job most people can't inspect themselves." },
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or go one-off for £499, hosted by us. No card up front." },
    ],
    comparisonRows: (area) => [
      { them: `Checkatrade: shared leads with other ${area.name} roofers`, us: "Your site: exclusive leads, yours only" },
      { them: "No way to show guarantee-backed work", us: "Guarantees and accreditations front and centre" },
      { them: "Generic profile, no photos of your actual roofs", us: "Full photo gallery of finished jobs" },
      { them: "Stop paying, you disappear", us: "Site stays live, hosted by us — no monthly fee on the one-off plan" },
    ],
    faqs: (area) => [
      { q: `How long does it take to rank for 'roofer ${area.name}'?`, a: "2–6 months for a new site to rank on page 1 for competitive local terms is realistic. Google Maps, via a properly set-up Google Business Profile, is faster and is where most emergency call-outs actually come from." },
      { q: "Do I need an emergency repair page?", a: "Yes — storm damage and sudden leaks are some of the highest-value, most urgent roofing jobs. A dedicated emergency page optimised for that intent is one of the best-converting pages I can build for a roofer." },
      { q: "Can you show my guarantees and insurance?", a: "Absolutely — insurance-backed guarantees, NFRC or Competent Roofer accreditation, and public liability cover are exactly the kind of trust signals I design prominently into every roofer site." },
      { q: `Do you work with roofers outside ${area.name}?`, a: `Yes — I'm Glasgow-based and build sites for roofers right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
  {
    slug: "joiner",
    name: "Joiner",
    namePlural: "joiners",
    h1Accent: "that show off your craft.",
    heroStat: { n: "100%", l: "Bespoke work showcased" },
    intro: (area) => `Joinery is a craft trade — customers in ${area.name} want to see the work before they trust you with a bespoke kitchen, staircase or fitted furniture job. I build portfolio-led sites that make that decision easy.`,
    benefits: (area) => [
      { title: `Ranks for 'joiner ${area.name}' and bespoke carpentry searches`, desc: `From fitted wardrobes to staircases to full kitchen fit-outs, I optimise your site for the specific ${area.name} searches that lead to real bespoke work.` },
      { title: "Portfolio of bespoke work", desc: "A proper gallery — fitted kitchens, staircases, custom furniture, doors and skirting — does more to win joinery work than any amount of text ever could." },
      { title: "Quote request forms built for custom jobs", desc: "Bespoke joinery doesn't fit a fixed price list. I build a simple quote request flow that captures the details you need without scaring off a genuine enquiry." },
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or go one-off for £499, hosted by us. No card up front." },
    ],
    comparisonRows: (area) => [
      { them: `Checkatrade: generic profile, shared with other ${area.name} joiners`, us: "Custom site built around your own portfolio" },
      { them: "No way to show craftsmanship in detail", us: "Full gallery of bespoke, finished work" },
      { them: "Fixed-price directory listing", us: "Custom quote flow built for bespoke jobs" },
      { them: "£1,200+/year forever", us: "£499 once or £55/mo (first month free)" },
    ],
    faqs: (area) => [
      { q: "How many photos of my work can you include?", a: "As many as you like — fitted kitchens, staircases, custom furniture, doors. I'd recommend 15–20 strong photos across your best projects to start, with room to add more as you finish new jobs." },
      { q: "Can you build a quote request form for bespoke jobs?", a: "Yes — since joinery pricing depends heavily on the specific job, I build a request form that captures room dimensions, material preferences and photos upfront, so you can quote properly first time." },
      { q: `Will my site rank for 'joiner ${area.name}' searches?`, a: "With proper local SEO and a Google Business Profile, yes — typically within 2–6 months for competitive terms, faster for more specific searches like fitted wardrobes or staircases." },
      { q: `Do you work with joiners outside ${area.name}?`, a: `Yes — I'm Glasgow-based and build sites for joiners right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
  {
    slug: "painter-decorator",
    name: "Painter & Decorator",
    namePlural: "painters and decorators",
    h1Accent: "that win the next job.",
    heroStat: { n: "100%", l: "Before/after photos" },
    intro: (area) => `A painter and decorator in ${area.name} sells on finish quality and reliability. I build sites led by before/after photography that make the decision to book easy — and rank for 'painter and decorator near me' searches.`,
    benefits: (area) => [
      { title: `Ranks for 'painter and decorator ${area.name}'`, desc: `Interior repaints, exterior work, wallpapering — every service page is optimised for the specific searches ${area.name} homeowners actually make.` },
      { title: "Before/after gallery that sells the job", desc: "Nothing convinces a homeowner faster than seeing a room transformed. A clean before/after gallery is the single most effective trust builder for decorating work." },
      { title: "Interior & exterior service pages", desc: "Separate pages for interior repaints, exterior painting, wallpapering and commercial decorating — each targeting its own keyword and its own customer." },
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or go one-off for £499, hosted by us. No card up front." },
    ],
    comparisonRows: (area) => [
      { them: `Checkatrade: shared leads with other ${area.name} decorators`, us: "Your site: exclusive leads, yours only" },
      { them: "No before/after gallery", us: "Clean gallery that sells the transformation" },
      { them: "One generic services blurb", us: "Separate pages for interior, exterior and commercial work" },
      { them: "Stop paying, you disappear", us: "Site stays live, hosted by us — no monthly fee on the one-off plan" },
    ],
    faqs: (area) => [
      { q: "How many before/after photos should I include?", a: "As many strong ones as you have — 15–20 to start is plenty. Consistent lighting and the same angle before and after makes the biggest difference to how convincing they look." },
      { q: "Do you build separate pages for interior and exterior work?", a: "Yes — interior repaints, exterior painting, wallpapering and commercial decorating are different searches with different customers, so I build each as its own optimised page where it makes sense." },
      { q: `Will my site rank for 'painter and decorator ${area.name}'?`, a: "With proper local SEO and a Google Business Profile, yes — typically within 2–6 months for competitive terms. Google Maps tends to move faster and is where most local bookings come from." },
      { q: `Do you work with decorators outside ${area.name}?`, a: `Yes — I'm Glasgow-based and build sites for painters and decorators right across the region, including ${area.nearby.join(", ")}.` },
    ],
  },
];

trades.forEach((trade) => {
  glasgowAreas.forEach((area) => {
    const slug = `${trade.slug}-website-${area.slug}`;
    seoPages[slug] = {
      slug,
      title: `${trade.name} Website ${area.name} | Rank On Google | MunroStudio`,
      metaDescription: `Custom website for ${area.name} ${trade.namePlural}. Local SEO, first month free, then £55/mo or £499 one-off. Call 07485 218 091.`,
      h1: `${trade.name} websites, ${area.name}`,
      h1Accent: trade.h1Accent,
      intro: trade.intro(area),
      keyword: `${trade.name.toLowerCase()} website ${area.name}`,
      audienceLabel: `${area.name} ${trade.namePlural}`,
      heroStats: [
        { n: "£0", l: "First month" },
        trade.heroStat,
        { n: "2–3wk", l: "To go live" },
      ],
      benefits: trade.benefits(area),
      comparisonTitle: `Trade directories vs your own ${trade.name.toLowerCase()} website in ${area.name}`,
      comparisonRows: trade.comparisonRows(area),
      faqs: trade.faqs(area),
    };
  });
});

// ─── Generate trade-specific GEO pages ──────────────────────────────────────
// One AI-search-optimization angle page per trade (Glasgow-wide, not per
// area — a 6×37 GEO combinatorial would be excessive and thin). Pairs with
// the general GEO hub pages above (generative-engine-optimization-glasgow,
// ai-search-optimization-glasgow, chatgpt-seo-glasgow).
const tradeSlugPlural = {
  plumber: "plumbers",
  electrician: "electricians",
  builder: "builders",
  roofer: "roofers",
  joiner: "joiners",
  "painter-decorator": "painters-decorators",
};

trades.forEach((trade) => {
  const slug = `get-found-on-chatgpt-${tradeSlugPlural[trade.slug]}-glasgow`;
  seoPages[slug] = {
    slug,
    title: `Get Found on ChatGPT | AI Search for Glasgow ${trade.namePlural} | MunroStudio`,
    metaDescription: `When someone asks ChatGPT for a good ${trade.name.toLowerCase()} in Glasgow, will your name come up? I structure ${trade.namePlural}' websites so AI tools can find and recommend them.`,
    h1: `Get found on ChatGPT`,
    h1Accent: `if you're a Glasgow ${trade.name.toLowerCase()}.`,
    intro: `More people are asking ChatGPT and Perplexity for a "good ${trade.name.toLowerCase()} in Glasgow" instead of scrolling Google. I build ${trade.namePlural}' websites with the clear facts, consistent details and structured content that make AI tools confident recommending you.`,
    keyword: `chatgpt seo ${trade.name.toLowerCase()} Glasgow`,
    audienceLabel: `Glasgow ${trade.namePlural}`,
    heroStats: [{ n: "AI-ready", l: "Content structure" }, { n: "£55", l: "GEO included, per month" }, { n: "1", l: "Consistent profile everywhere" }],
    benefits: [
      { title: `Structured for 'best ${trade.name.toLowerCase()} in Glasgow' questions`, desc: `AI tools favour clear, specific facts over vague marketing copy. Your services, coverage area and pricing model are written so an AI model can confidently lift and cite them.` },
      { title: "FAQ schema on every page", desc: "Every site ships with FAQPage structured data — the same markup AI answer engines and Google's AI Overviews use to pull direct Q&A content straight from your site." },
      { title: "Consistent facts across the web", desc: "Your name, address, phone number and services need to match across your website, Google Business Profile and directories. Inconsistency makes AI tools less confident recommending you." },
      { title: "Included at no extra cost", desc: "GEO and AI search structure is built into every site as standard — no separate 'AI SEO' package, no extra charge on top of your £55/month plan." },
    ],
    comparisonTitle: `Invisible to AI tools vs built to be recommended`,
    comparisonRows: [
      { them: "No structured facts — AI has nothing solid to cite", us: "Clear services, area and pricing facts throughout" },
      { them: `Inconsistent details across directories`, us: "Consistent name, address, phone and services everywhere" },
      { them: "Marketing fluff instead of direct answers", us: "FAQ content written to directly answer real questions" },
      { them: `Competing ${trade.namePlural} all look the same to an AI model`, us: "Clear, specific facts make you the easy citation" },
    ],
    faqs: [
      { q: `Can you guarantee ChatGPT recommends my ${trade.name.toLowerCase()} business?`, a: "No — no one controls what ChatGPT says, and it changes over time. What I can do is remove the reasons it wouldn't recommend you (unclear facts, inconsistent details, thin content) and build in the reasons it would." },
      { q: "Is this different from normal local SEO?", a: "It builds on the same foundation — a fast, well-structured, keyword-relevant site — but adds a layer focused specifically on clarity and consistency, which is what AI tools weigh most heavily." },
      { q: "Is this included in my monthly plan?", a: "Yes — every site I build follows this approach as standard, at no extra cost on top of your £55/month plan." },
      { q: `Do you build sites for ${trade.namePlural} outside Glasgow too?`, a: `Yes — I work with ${trade.namePlural} across Greater Glasgow and the wider Central Belt, all built the same way.` },
    ],
  };
});

// ─── Additional standalone GEO topic pages ──────────────────────────────────
seoPages["perplexity-seo-glasgow"] = {
  slug: "perplexity-seo-glasgow",
  title: "Perplexity SEO Glasgow | Get Cited by AI Search | MunroStudio",
  metaDescription: "Optimise your Glasgow business website to be found and cited by Perplexity and other AI search tools. Built into every MunroStudio site at £55/mo.",
  h1: "Perplexity SEO",
  h1Accent: "for Glasgow businesses.",
  intro: "Perplexity answers questions by citing real web sources directly in its results — which means a well-structured business website can be quoted by name, with a link, in response to a customer's question. I build sites that are strong candidates for exactly that.",
  keyword: "Perplexity SEO Glasgow",
  audienceLabel: "Glasgow businesses",
  heroStats: [{ n: "Cited", l: "Not just ranked" }, { n: "£55", l: "Per month, included" }, { n: "100%", l: "Sites structured for AI" }],
  benefits: [
    { title: "Written to be quoted, not just read", desc: "Perplexity pulls short, factual snippets to cite. I write your key pages — services, pricing, coverage area — in clear, quotable statements rather than long marketing paragraphs." },
    { title: "Fast, crawlable pages", desc: "AI search tools crawl and re-crawl pages to keep answers current. A fast, simple, well-structured site gets picked up and refreshed more reliably than a bloated template site." },
    { title: "FAQ content matched to real questions", desc: "Perplexity users type full questions. Your FAQ sections are written to directly answer the kind of questions a real customer would type, in the same conversational phrasing." },
    { title: "Consistent facts Perplexity can trust", desc: "Citations lean on confidence in the source. Consistent name, address, phone number and service details across your site and Google Business Profile build that confidence." },
  ],
  comparisonTitle: "Ignored by AI search vs built to be cited",
  comparisonRows: [
    { them: "Long marketing paragraphs, nothing quotable", us: "Clear, factual statements AI tools can lift directly" },
    { them: "Slow, template-heavy site rarely re-crawled", us: "Fast, simple site that stays current" },
    { them: "No FAQ content matched to real questions", us: "FAQ sections written in the way people actually ask" },
    { them: "Inconsistent details undermine trust", us: "Consistent facts across your site and Google profile" },
  ],
  faqs: [
    { q: "What is Perplexity, and why does it matter?", a: "Perplexity is an AI answer engine that responds to questions with a summary and direct source citations — unlike a traditional search engine, it shows its sources inline, so being one of them puts your business directly in front of the searcher." },
    { q: "Can you guarantee Perplexity cites my site?", a: "No one can guarantee a specific citation — it's an algorithm outside my control. What I can guarantee is a site structured, written and technically built to be a strong candidate, rather than one that's invisible to AI crawlers by default." },
    { q: "Is this the same as normal SEO?", a: "It's built on the same foundation of a fast, well-structured, keyword-relevant site, with an added layer of clear, quotable writing and consistent facts — which is what AI citation tools weigh most heavily." },
  ],
};

seoPages["voice-search-optimization-glasgow"] = {
  slug: "voice-search-optimization-glasgow",
  title: "Voice Search Optimization Glasgow | Siri, Alexa & Google Assistant | MunroStudio",
  metaDescription: "Optimise your Glasgow business for voice search — Siri, Alexa and Google Assistant answer 'near me' questions from structured, local business data.",
  h1: "Voice search optimization",
  h1Accent: "for Glasgow businesses.",
  intro: "When someone asks Siri or Google Assistant to find a plumber or a cafe nearby, the answer comes from structured local business data — not a page of blue links. I set your site and Google Business Profile up to be that answer.",
  keyword: "voice search optimization Glasgow",
  audienceLabel: "Glasgow businesses",
  heroStats: [{ n: "1", l: "Answer read aloud" }, { n: "£55", l: "Per month, included" }, { n: "3-pack", l: "Google Maps target" }],
  benefits: [
    { title: "Built on the same data voice assistants use", desc: "Siri, Alexa and Google Assistant lean heavily on Google Business Profile and structured LocalBusiness data to answer 'near me' voice queries — both of which I set up and optimise as standard." },
    { title: "Conversational FAQ content", desc: "Voice queries are longer and more conversational than typed searches — 'who's a good electrician near me' rather than 'electrician Glasgow'. FAQ content is written to match that natural phrasing." },
    { title: "Structured data (schema) on every page", desc: "LocalBusiness and FAQPage schema markup gives voice assistants clean, structured facts to read from — name, services, hours, area covered — rather than having to guess." },
    { title: "Fast-loading, mobile-first pages", desc: "Voice search results often lead to a quick mobile visit to confirm details or call. A fast, mobile-first site keeps that visitor rather than losing them to a slow load." },
  ],
  comparisonTitle: "No voice search presence vs optimised for it",
  comparisonRows: [
    { them: "Incomplete or missing Google Business Profile", us: "Fully optimised GBP — the main data source voice assistants use" },
    { them: "No structured data on the website", us: "LocalBusiness and FAQPage schema on every page" },
    { them: "Content written for typed keywords only", us: "FAQ content matched to natural, spoken questions" },
    { them: "Slow site loses the follow-up visit", us: "Fast, mobile-first pages built to convert on the spot" },
  ],
  faqs: [
    { q: "How is voice search different from typing a search?", a: "Voice queries tend to be longer, more conversational, and more likely to have local intent — 'find a plumber near me' rather than 'plumber Glasgow'. Content and structured data need to match that natural phrasing to be picked up." },
    { q: "Do I need a Google Business Profile for voice search?", a: "Yes — it's one of the primary data sources voice assistants pull from for local business queries, alongside your website's own structured data. I set one up and optimise it as part of every build." },
    { q: "Is voice search optimization included in my plan?", a: "Yes — structured data, a properly optimised Google Business Profile, and conversational FAQ content are all built into every site as standard, at no extra cost." },
  ],
};

export const seoPageSlugs = Object.keys(seoPages);