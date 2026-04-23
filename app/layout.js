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
  title: "MunroStudio — Glasgow Web Design | First Month Free | Websites From £55/mo",
  description:
    "Glasgow-based web design for tradespeople and small businesses. Custom websites, local SEO, first month free, then £55/month or £499 one-off. Call 07485 218 091.",
  keywords: [
    "Glasgow web design",
    "web design Glasgow",
    "tradesmen websites Glasgow",
    "plumber website Glasgow",
    "electrician website Glasgow",
    "builder website Glasgow",
    "small business website Glasgow",
    "affordable web design Glasgow",
    "Glasgow website designer",
    "ad design Glasgow",
    "local SEO Glasgow",
    "MunroStudio",
  ],
  authors: [{ name: "MunroStudio", url: "https://munrostudio.co.uk" }],
  openGraph: {
    title: "MunroStudio — Glasgow Web Design | First Month Free",
    description:
      "Custom websites for Glasgow tradespeople and small businesses. First month on me, then £55/month or £499 one-off. Call 07485 218 091.",
    url: "https://munrostudio.co.uk",
    siteName: "MunroStudio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MunroStudio — Glasgow Web Design | First Month Free",
    description:
      "Custom websites for Glasgow businesses. First month free, then £55/month or £499 one-off.",
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
              "@type": "LocalBusiness",
              "@id": "https://munrostudio.co.uk/#business",
              "name": "MunroStudio",
              "description": "Glasgow-based web design and ad design for tradespeople and small businesses. First month free, then £55/month or £499 one-off.",
              "url": "https://munrostudio.co.uk",
              "telephone": "+447485218091",
              "email": "euanmunroo@gmail.com",
              "priceRange": "££",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Glasgow",
                "addressRegion": "Scotland",
                "addressCountry": "GB"
              },
              "areaServed": [
                { "@type": "City", "name": "Glasgow" },
                { "@type": "Country", "name": "United Kingdom" }
              ],
              "founder": { "@type": "Person", "name": "Euan Munro" }
            }
          `}
        </Script>
      </body>
    </html>
  );
}