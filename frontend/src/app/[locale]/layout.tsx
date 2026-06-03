import type { Metadata } from "next";

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
    <div data-locale={locale}>
      {/* TODO: Add Navbar component */}
      <main>{children}</main>
      {/* TODO: Add Footer component */}
      {/* TODO: Add AI Chat widget */}
    </div>
  );
}
