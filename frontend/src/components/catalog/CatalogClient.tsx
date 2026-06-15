"use client";

import { useState } from "react";
import { LeatherCard } from "@/components/catalog/LeatherCard";
import { FilterSidebar, type CatalogFilters } from "@/components/catalog/FilterSidebar";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { LeatherOrigin } from "@/types";

// ── Types for the data passed from the Server Component ──────
export interface CatalogLeather {
  id: string;
  name: string;
  description: string;
  origin: LeatherOrigin;
  animalSource: string | null;
  thickness: number | null;
  pricePerSqFt: number | null;
  color: string | null;
  finish: string | null;
  certifications: string[];
  imageUrls: string[];
  supplierName: string;
}

interface CatalogClientProps {
  leathers: CatalogLeather[];
  locale: string;
}

export default function CatalogClient({ leathers, locale }: CatalogClientProps) {
  const [filters, setFilters] = useState<CatalogFilters>({
    origins: [],
    colors: [],
    finishes: [],
    priceRange: [0, 500],
    search: "",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addItem } = useCart();

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  // Apply client-side filters to the database-fetched data
  const filteredLeathers = leathers.filter((leather) => {
    if (filters.origins.length > 0 && !filters.origins.includes(leather.origin)) {
      return false;
    }
    if (filters.colors.length > 0 && leather.color && !filters.colors.includes(leather.color)) {
      return false;
    }
    if (filters.finishes.length > 0 && leather.finish && !filters.finishes.includes(leather.finish)) {
      return false;
    }
    if (leather.pricePerSqFt && leather.pricePerSqFt > filters.priceRange[1]) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        leather.name.toLowerCase().includes(searchLower) ||
        leather.description.toLowerCase().includes(searchLower) ||
        leather.supplierName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Page Header */}
      <div className="border-b border-stone-200/60 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-heading font-bold text-stone-900">
              {t("Leather Catalog", "Catalogo Pelli")}
            </h1>
            <p className="mt-2 text-stone-500 max-w-2xl">
              {t(
                "Explore our curated collection of sustainable, exotic, and innovative leather materials from verified suppliers worldwide.",
                "Esplora la nostra collezione curata di pelli sostenibili, esotiche e innovative da fornitori verificati in tutto il mondo."
              )}
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold text-accent">
                {filteredLeathers.length}
              </span>
              <span className="text-sm text-stone-500">
                {t("leathers found", "pelli trovate")}
              </span>
            </div>

            {/* Quick filter pills */}
            <div className="flex items-center gap-2">
              {[
                { label: t("All", "Tutte"), value: "" },
                { label: t("Sustainable", "Sostenibili"), value: "SUSTAINABLE" },
                { label: t("Exotic", "Esotiche"), value: "EXOTIC" },
                { label: t("Vegan", "Vegane"), value: "VEGAN" },
                { label: t("Recycled", "Riciclate"), value: "RECYCLED" },
              ].map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      origins: pill.value ? [pill.value] : [],
                    }));
                  }}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer",
                    (pill.value === "" && filters.origins.length === 0) ||
                      (filters.origins.length === 1 && filters.origins[0] === pill.value)
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-accent text-white px-5 py-3 rounded-full shadow-elevated flex items-center gap-2 cursor-pointer hover:bg-accent-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            {t("Filters", "Filtri")}
          </button>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-elevated p-6 overflow-y-auto animate-slide-in-right">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-semibold text-stone-900">
                    {t("Filters", "Filtri")}
                  </h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 hover:bg-stone-100 rounded cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  locale={locale}
                  onFiltersChange={(f) => {
                    setFilters(f);
                  }}
                />
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                locale={locale}
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          {/* Leather Grid */}
          <div className="flex-1">
            {filteredLeathers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredLeathers.map((leather, index) => (
                  <div
                    key={leather.id}
                    className={cn("animate-fade-in-up", `stagger-${Math.min(index + 1, 6)}`)}
                  >
                    <LeatherCard
                      id={leather.id}
                      name={leather.name}
                      description={leather.description}
                      origin={leather.origin}
                      animalSource={leather.animalSource ?? undefined}
                      thickness={leather.thickness ?? undefined}
                      pricePerSqFt={leather.pricePerSqFt ?? undefined}
                      color={leather.color ?? undefined}
                      finish={leather.finish ?? undefined}
                      certifications={leather.certifications}
                      supplierName={leather.supplierName}
                      locale={locale}
                      onAddToCart={(id) => {
                        const item = leathers.find(l => l.id === id);
                        if (item) {
                          addItem({
                            id: item.id,
                            name: item.name,
                            origin: item.origin,
                            color: item.color ?? undefined,
                            finish: item.finish ?? undefined,
                            pricePerSqFt: item.pricePerSqFt ?? undefined,
                            supplierName: item.supplierName,
                            quantity: 1
                          });
                        }
                      }}
                      onViewDetails={(id) => {
                        // TODO: Navigate to detail page
                        console.log("View details:", id);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-700">
                  {t("No leathers found", "Nessuna pelle trovata")}
                </h3>
                <p className="mt-1 text-sm text-stone-500 max-w-sm">
                  {t(
                    "Try adjusting your filters or search terms to find what you're looking for.",
                    "Prova a modificare i filtri o i termini di ricerca per trovare ciò che cerchi."
                  )}
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      origins: [],
                      colors: [],
                      finishes: [],
                      priceRange: [0, 500],
                      search: "",
                    })
                  }
                  className="mt-4 text-sm text-accent hover:text-accent-dark font-medium transition-colors cursor-pointer"
                >
                  {t("Clear all filters", "Cancella tutti i filtri")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
