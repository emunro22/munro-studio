// Short ad-copy URLs (e.g. munrostudio.co.uk/lenzie) 301-redirect to their
// canonical /web-design-{area} SEO page. Keep this list in sync with the
// `glasgowAreas` slugs in app/seo-pages/seoPages.js — these are no longer
// separately rendered pages (see that file for why: Search Console flagged
// the previous duplicate-content setup and left the short URLs unindexed).
const glasgowAreaSlugs = [
  "paisley",
  "clydebank",
  "east-kilbride",
  "erskine",
  "kirkintilloch",
  "lenzie",
  "bishopbriggs",
  "bearsden",
  "milngavie",
  "rutherglen",
  "cambuslang",
  "hamilton",
  "motherwell",
  "wishaw",
  "bellshill",
  "coatbridge",
  "airdrie",
  "cumbernauld",
  "renfrew",
  "johnstone",
  "west-end",
  "southside",
  "dumbarton",
  "helensburgh",
  "barrhead",
  "newton-mearns",
  "giffnock",
  "clarkston",
  "uddingston",
  "blantyre",
  "larkhall",
  "kilsyth",
  "stepps",
  "maryhill",
  "partick",
  "drumchapel",
  "bridge-of-weir",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return glasgowAreaSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/web-design-${slug}`,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
