import "./globals.css";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "MunroStudio — Websites for UK Tradespeople | From £55/month",
  description:
    "Professional websites for plumbers, electricians, builders & tradespeople across the UK. Custom design, local SEO, mobile-first. From £55/month or £499 one-off. No setup fee.",
  keywords: [
    "web design for tradespeople",
    "plumber website UK",
    "electrician website",
    "builder website design",
    "tradesman website",
    "local SEO web design",
    "small business website UK",
    "MunroStudio",
  ],
  authors: [{ name: "MunroStudio", url: "https://munrostudio.co.uk" }],
  openGraph: {
    title: "MunroStudio — Websites for UK Tradespeople | From £55/month",
    description:
      "Custom websites for UK tradespeople. Local SEO-ready, mobile-first, fully managed. From £55/month or £499 one-off.",
    url: "https://munrostudio.co.uk",
    siteName: "MunroStudio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MunroStudio — Websites for UK Tradespeople",
    description: "From £55/month or £499 one-off. Custom, SEO-ready websites for UK tradespeople.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://munrostudio.co.uk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17955330138"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17955330138');
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "MunroStudio",
              "description": "Professional web design and development for UK tradespeople. Custom websites from £55/month or £499 one-off.",
              "url": "https://munrostudio.co.uk",
              "telephone": "+447485218091",
              "email": "euanmunroo@gmail.com",
              "areaServed": "GB",
              "priceRange": "£55–£499"
            }
          `}
        </Script>
      </body>
    </html>
  );
}