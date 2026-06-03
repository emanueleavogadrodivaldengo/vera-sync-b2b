import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/app/providers";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Vera Sync — Sustainable & Exotic Leather Sourcing",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" data-locale={locale} suppressHydrationWarning>
        <Providers>
          <Navbar locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <ChatWidget locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
