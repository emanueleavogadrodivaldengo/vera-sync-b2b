"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: string;
}

const navLinks = [
  { key: "home", href: "", label: { en: "Home", it: "Home" } },
  { key: "catalog", href: "/catalog", label: { en: "Catalog", it: "Catalogo" } },
  { key: "cart", href: "/cart", label: { en: "Cart", it: "Carrello" } },
];

export function Navbar({ locale }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (labels: { en: string; it: string }) =>
    labels[locale as keyof typeof labels] || labels.en;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-stone-200/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100/80 transition-all duration-200"
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <Link
            href={`/${locale === "en" ? "it" : "en"}`}
            className="px-2.5 py-1.5 text-xs font-medium text-stone-500 uppercase tracking-wider border border-stone-200 rounded-md hover:bg-stone-50 hover:text-stone-700 transition-all duration-200"
          >
            {locale === "en" ? "IT" : "EN"}
          </Link>

          <Link href={`/${locale}/auth/login`}>
            <Button variant="ghost" size="sm">
              {t({ en: "Sign In", it: "Accedi" })}
            </Button>
          </Link>
          <Link href={`/${locale}/auth/register`}>
            <Button variant="primary" size="sm">
              {t({ en: "Get Started", it: "Inizia" })}
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out border-t border-stone-100",
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1 bg-white/95">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-50 transition-colors"
            >
              {t(link.label)}
            </Link>
          ))}

          <div className="pt-3 mt-3 border-t border-stone-100 flex flex-col gap-2">
            <Link href={`/${locale}/auth/login`} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" size="sm" fullWidth>
                {t({ en: "Sign In", it: "Accedi" })}
              </Button>
            </Link>
            <Link href={`/${locale}/auth/register`} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" fullWidth>
                {t({ en: "Get Started", it: "Inizia" })}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
