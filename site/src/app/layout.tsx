import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE = "https://pijarui.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Pijar UI — dark-first React design system",
    template: "%s · Pijar UI",
  },
  description:
    "A dark-first React design system on Tailwind v4. Accessible by construction: 44px touch targets, WCAG AA contrast, and focus states you cannot forget to write.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Pijar UI",
    title: "Pijar UI — dark-first React design system",
    description:
      "Accessible by construction. 44px touch targets, WCAG AA contrast, and focus states you cannot forget to write.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pijar UI — dark-first React design system",
    description:
      "Accessible by construction. Built on Tailwind v4, shadcn-compatible tokens.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
