"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/4 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cream-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent-dark font-medium tracking-wide">
                  {t("B2B Leather Sourcing Platform", "Piattaforma B2B per il Sourcing di Pelli")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-stone-900 leading-[1.1] text-balance">
                {t("Discover Premium", "Scopri Pelli")}{" "}
                <span className="text-accent">{t("Sustainable", "Sostenibili")}</span>{" "}
                {t("Leathers", "Premium")}
              </h1>

              <p className="mt-6 text-lg text-stone-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t(
                  "Source exotic, sustainable, and vegan leather samples from certified suppliers worldwide. Request samples with a single tap.",
                  "Trova campioni di pelle esotica, sostenibile e vegana da fornitori certificati in tutto il mondo. Richiedi campioni con un solo tocco."
                )}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link href={`/${locale}/catalog`}>
                  <Button size="lg" variant="primary">
                    {t("Browse Catalog", "Sfoglia il Catalogo")}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href={`/${locale}/auth/register`}>
                  <Button size="lg" variant="secondary">
                    {t("Become a Supplier", "Diventa Fornitore")}
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex items-center gap-8 justify-center lg:justify-start">
                {[
                  { num: "200+", label: t("Suppliers", "Fornitori") },
                  { num: "50+", label: t("Countries", "Paesi") },
                  { num: "1.2k", label: t("Leathers", "Pelli") },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-heading font-bold text-stone-900">{stat.num}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual — Leather Category Cards */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none animate-slide-in-right">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: t("Exotic", "Esotiche"),
                    desc: t("Crocodile, Ostrich, Python", "Coccodrillo, Struzzo, Pitone"),
                    gradient: "from-amber-700 to-amber-900",
                    badge: "exotic" as const,
                  },
                  {
                    label: t("Sustainable", "Sostenibili"),
                    desc: t("LWG Certified, Chrome-Free", "Certificato LWG, Senza Cromo"),
                    gradient: "from-emerald-700 to-emerald-900",
                    badge: "sustainable" as const,
                  },
                  {
                    label: t("Vegan", "Vegane"),
                    desc: t("Mycelium, Piñatex, Cactus", "Micelio, Piñatex, Cactus"),
                    gradient: "from-lime-700 to-lime-900",
                    badge: "vegan" as const,
                  },
                  {
                    label: t("Recycled", "Riciclate"),
                    desc: t("Ocean Plastic, Upcycled", "Plastica Oceanica, Upcycled"),
                    gradient: "from-sky-700 to-sky-900",
                    badge: "recycled" as const,
                  },
                ].map((cat, i) => (
                  <Link
                    key={cat.label}
                    href={`/${locale}/catalog`}
                    className={`group relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${cat.gradient} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated stagger-${i + 1} animate-fade-in-up`}
                  >
                    {/* Texture overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:12px_12px]" />
                    </div>

                    <div className="relative h-full flex flex-col justify-end p-4">
                      <Badge variant={cat.badge} size="sm" className="self-start mb-2">
                        {cat.label}
                      </Badge>
                      <p className="text-[11px] text-white/60 leading-snug">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-heading font-bold text-stone-900">
              {t("How It Works", "Come Funziona")}
            </h2>
            <p className="mt-3 text-stone-500 max-w-lg mx-auto">
              {t(
                "From discovery to delivery, in three simple steps.",
                "Dalla scoperta alla consegna, in tre semplici passaggi."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: t("Browse & Discover", "Sfoglia e Scopri"),
                desc: t(
                  "Explore our curated catalog of premium leathers. Filter by origin, color, finish, and price.",
                  "Esplora il nostro catalogo curato di pelli premium. Filtra per origine, colore, finitura e prezzo."
                ),
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: t("Request Samples", "Richiedi Campioni"),
                desc: t(
                  "Add your favorite leathers to the cart and send your sample request directly via WhatsApp.",
                  "Aggiungi le pelli preferite al carrello e invia la tua richiesta campioni direttamente via WhatsApp."
                ),
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: t("Receive & Evaluate", "Ricevi e Valuta"),
                desc: t(
                  "Get your samples delivered and evaluate quality. Place bulk orders directly with trusted suppliers.",
                  "Ricevi i tuoi campioni e valuta la qualità. Effettua ordini all'ingrosso direttamente con fornitori fidati."
                ),
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent/40 tracking-widest">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-accent-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:24px_24px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white leading-tight">
            {t(
              "Ready to source your next material?",
              "Pronto a trovare il tuo prossimo materiale?"
            )}
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-lg mx-auto">
            {t(
              "Join hundreds of buyers and suppliers already using Vera Sync to connect and trade.",
              "Unisciti a centinaia di acquirenti e fornitori che già usano Vera Sync per connettersi e commerciare."
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`/${locale}/auth/register`}>
              <Button size="lg" className="bg-white text-stone-900 hover:bg-cream-100">
                {t("Get Started Free", "Inizia Gratis")}
              </Button>
            </Link>
            <Link href={`/${locale}/catalog`}>
              <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                {t("Explore Catalog", "Esplora il Catalogo")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
