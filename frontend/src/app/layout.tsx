import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vera Sync — Sustainable & Exotic Leather Sourcing",
  description:
    "B2B platform for sourcing and ordering samples of sustainable, exotic, and vegan leathers from certified suppliers worldwide.",
  keywords: [
    "sustainable leather",
    "exotic leather",
    "vegan leather",
    "B2B sourcing",
    "leather samples",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
