// Single source of truth for all SEO landing pages.
//
// THREE URL STRUCTURES supported:
// 1. /glasgow-web-design, /tradesmen-websites-glasgow (main hub pages — hand-written)
// 2. /web-design-{area} (Glasgow area pages — auto-generated, SEO-optimised)
// 3. /{area} (short redirect URLs that resolve to same page — for ad copy brevity)

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
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Per month after" }, { n: "£499", l: "Or one-off, yours forever" }],
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
      { q: "How much does web design cost in Glasgow?", a: "Glasgow web design prices range widely — small agencies typically charge £700–£2,400 for a basic site, while larger agencies start at £2,000+. MunroStudio keeps it simple: £0 for your first month, then £55/month (cancel any time), or a one-off £499 to own the site outright." },
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
      { title: "Beats Checkatrade on every metric", desc: "Checkatrade costs £1,200+ a year forever, and your leads are shared with 3+ other trades. A MunroStudio site is £499 once — yours for life — and every lead comes direct to your phone." },
      { title: "Built for 'plumber near me' searches", desc: "I build every site to rank for local trade terms — 'electrician Glasgow', 'roofer Paisley', 'builder East Kilbride'. That's where the real jobs come from." },
      { title: "Mobile-first — where your customers are", desc: "70% of 'tradesman near me' searches happen on a phone. Every site is built mobile-first with click-to-call buttons, so enquiries come through while you're on the job." },
      { title: "Done by someone who gets it", desc: "I've built sites for recovery operators, MOT centres, groundcare, waste clearance — I know trade businesses and what converts for them." },
    ],
    comparisonTitle: "Checkatrade vs your own website",
    comparisonRows: [
      { them: "Checkatrade: £100+/month, forever", us: "MunroStudio: £499 once, or £55/mo (first free)" },
      { them: "Leads shared with 3–5 competitors", us: "Exclusive leads — yours only" },
      { them: "You vanish when you stop paying", us: "You own the site forever on the one-off plan" },
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
      { them: "Stop paying, you disappear", us: "Own the one-off build forever" },
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
      { title: "Free month to see results", desc: "Launch for £0, use it for a month, see the enquiries come in. Then stay on £55/month, or buy it outright for £499. No card up front." },
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

  "websites-for-small-businesses-glasgow": {
    slug: "websites-for-small-businesses-glasgow",
    title: "Small Business Websites Glasgow | From £0 First Month | MunroStudio",
    metaDescription: "Affordable custom websites for Glasgow small businesses — cafes, salons, shops, gyms, cleaners. First month free. Call 07485 218 091.",
    h1: "Websites for Glasgow",
    h1Accent: "small businesses.",
    intro: "Cafes, salons, shops, gyms, cleaners, personal trainers — if you're a Glasgow small business relying on Instagram or word of mouth, a proper website is the single biggest upgrade you can make. First month free.",
    keyword: "small business websites Glasgow",
    audienceLabel: "Glasgow small businesses",
    heroStats: [{ n: "£0", l: "First month" }, { n: "£55", l: "Monthly after" }, { n: "£499", l: "Or own it outright" }],
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
};

// ─── Generate Glasgow area pages automatically ──────────────────────────────
// Each area gets TWO URLs that serve the same page:
// 1. /web-design-{area}  (long, SEO-optimised for "web design {area}" searches)
// 2. /{area}             (short, for ad copy like "munrostudio.co.uk/lenzie")

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
      { title: "First month free, then £55/mo", desc: "Launch for £0. Use it for a month risk-free. If it's not bringing in enquiries, cancel — no fee. Otherwise £55/month, or £499 one-off to own it outright." },
    ],
    comparisonTitle: `Why MunroStudio vs a template builder for ${area.name}`,
    comparisonRows: [
      { them: `Template builders: same site as every other ${area.name} business`, us: `MunroStudio: fully custom, made for your brand` },
      { them: "Squarespace/Wix: you spend 40+ hours, it still looks generic", us: "I build everything, you review and approve" },
      { them: "No proper local SEO out of the box", us: `Optimised for '${area.name}' and local searches from day one` },
      { them: "Pay forever with no ownership", us: "£499 one-off = yours forever" },
    ],
    faqs: [
      { q: `Do you work with ${area.name} businesses?`, a: `Yes — I'm based in Glasgow but work with businesses and tradespeople across ${area.name} and nearby areas like ${area.nearby.join(", ")}. Most communication happens over WhatsApp or phone, and I'm happy to meet in person if you prefer.` },
      { q: `How long will it take to rank for '${area.name.toLowerCase()}' searches?`, a: `2–6 months for new sites to rank on page 1 for competitive local terms is realistic. However, with a properly set-up Google Business Profile, you can appear in the Google Maps pack within weeks, which is where most actual calls come from.` },
      { q: "Do you offer meetings in person?", a: `Absolutely — if you're in ${area.name} or nearby, I'm happy to come meet you. Most clients prefer a WhatsApp chat or quick call first, but in-person works fine if that suits you better.` },
      { q: "Is my business too small for a custom website?", a: `No business is too small. Whether you're a solo tradesman, a cafe, a single-chair salon or a small shop in ${area.name}, a proper website is still the single biggest upgrade you can make to how customers find you.` },
    ],
  };

  // Add BOTH URL versions — same page, different slugs
  seoPages[`web-design-${area.slug}`] = { ...pageData, slug: `web-design-${area.slug}` };
  seoPages[area.slug] = { ...pageData, slug: area.slug };
});

export const seoPageSlugs = Object.keys(seoPages);