import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig, destinations } from "@/lib/site-config";
import { getImageUrl } from "@/lib/images";
import Script from "next/script";
import "./globals.css";

const ogImage = destinations[0].image;
const logoImage = getImageUrl("/images/logo-mark.png");

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pageTitle = `${siteConfig.name} | Taxi & Cab Booking in Ujjain`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  other: {
    keywords: [
      "taxi service Ujjain",
      "cab booking Ujjain",
      "taxi service in Ujjain",
      "car rental Ujjain",
      "Travels Ujjain",
      "Ujjain to Omkareshwar taxi",
      "Ujjain to Indore taxi",
      "Ujjain to Maheshwar taxi",
      "Ujjain to Mandu taxi",
      "Ujjain to Sehore taxi",
      "Indore to Ujjain taxi",
      "Indore airport to Ujjain taxi",
      "Mahakaleshwar darshan taxi",
      "Ujjain darshan cab package",
      "Omkareshwar Jyotirlinga taxi",
      "Ujjain Indore Omkareshwar cab service",
      "outstation taxi Ujjain",
      "one way taxi Ujjain",
      "round trip taxi Ujjain",
      "taxi booking Mahakal Ujjain",
      "Ujjain pilgrim taxi service",
      "24x7 taxi service Ujjain",
      "Kubereshwar Mahadev Sehore taxi",
      "Baglamukhi Nalkheda taxi",
      "Swift Dzire taxi Ujjain",
      "Ertiga taxi booking Ujjain",
      "Innova Crysta taxi Ujjain",
      "Shree Mahadev Travels Ujjain",
    ],
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Travel",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: pageTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1820,
        height: 864,
        alt: siteConfig.name,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteConfig.name,
    description: siteConfig.description,
    image: [ogImage],
    logo: logoImage,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.phones[0],
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: "IN",
    },
    areaServed: [
      "Ujjain",
      "Omkareshwar",
      "Indore",
      "Maheshwar",
      "Mandu",
      "Sehore",
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${siteConfig.googleMapsQuery}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₹₹",
  };

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18418319567"
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18418319567');
        `}
      </Script>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster richColors position="top-center" theme="light" />
      </body>
    </html>
  );
}
