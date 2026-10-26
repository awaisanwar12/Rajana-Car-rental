import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Rent a Car in Lahore with Driver | 24/7 Rates | Get Car", template: "%s | Get Car" },
  description: "24/7 rent a car in Lahore with driver from Rs 5,000/day. Corolla, Yaris, Civic, BR-V, Fortuner, V8 & Grand Cabin for airport, wedding & intercity trips.",
  keywords: [
    "rent a car in Lahore",
    "rent a car Lahore",
    "car rental Lahore with driver",
    "rent a car Lahore rates",
    "DHA Lahore rent a car",
    "Lahore airport car rental",
    "Lahore to Islamabad car rental",
    "Grand Cabin for rent in Lahore",
    "Coaster for rent in Lahore",
    "SUV rental Lahore",
    "wedding car rental Lahore",
    "corporate car rental Lahore",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    title: "Rent a Car in Lahore with Driver | 24/7 Rates | Get Car",
    description: "24/7 chauffeur-driven cars, SUVs and Grand Cabins in Lahore from Rs 5,000/day. Request an exact quote on WhatsApp.",
    images: [{ url: "/images/honda-civic-rs.jpg", width: 1024, height: 576, alt: "Get Car Lahore chauffeur car rental" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent a Car in Lahore with Driver | Get Car",
    description: "24/7 chauffeur-driven cars, SUVs and group vans in Lahore from Rs 5,000/day.",
    images: ["/images/honda-civic-rs.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "travel",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2235" };

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5Z5GH8VK";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
