import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Michelle Bakels - Software Developer & Community Builder",
  description:
    "Michelle Bakels is a software developer, community builder, and conference organizer. Creator of Let Me Show You Something, co-organizer of React Miami and AI Engineer: Miami, and board member for South Florida Tech Hub and 1909.",
  keywords: [
    "software developer",
    "community builder",
    "conference organizer",
    "React Miami",
    "AI Engineer Miami",
    "tech community",
    "speaker",
    "organizer",
  ],
  authors: [{ name: "Michelle Bakels" }],
  creator: "Michelle Bakels",
  openGraph: {
    title: "Michelle Bakels - Software Developer & Community Builder",
    description:
      "Software developer, community builder, and conference organizer. Creating meaningful connections in the tech community through events like React Miami and Let Me Show You Something.",
    url: "https://michellebakels.com",
    siteName: "Michelle Bakels",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Michelle Bakels - Software Developer & Community Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michelle Bakels - Software Developer & Community Builder",
    description:
      "Software developer, community builder, and conference organizer. Creating meaningful connections in the tech community.",
    creator: "@MichelleBakels",
    images: ["/og-image.svg"],
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
  metadataBase: new URL("https://michellebakels.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
