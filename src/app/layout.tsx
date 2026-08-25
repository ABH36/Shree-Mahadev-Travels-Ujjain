import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig, destinations } from "@/lib/site-config";
import "./globals.css";

const ogImage = destinations[0].image;

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Taxi & Cab Booking in Ujjain`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "taxi service Ujjain",
    "cab booking Ujjain",
    "Ujjain to Omkareshwar taxi",
    "Ujjain to Indore taxi",
    "Mahakaleshwar darshan taxi",
    "Ujjain Indore Omkareshwar cab service",
    "outstation taxi Ujjain",
    "Shree Mahadev Travels Ujjain",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} | Taxi & Cab Booking in Ujjain`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1820,
        height: 864,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Taxi & Cab Booking in Ujjain`,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "https://res.cloudinary.com/zxmmvaju/image/upload/v1787644226/shree-mahadev-travels/images/logo-mark.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteConfig.name,
    image: ogImage,
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
    priceRange: "₹₹",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
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
