"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LeatherCard } from "@/components/catalog/LeatherCard";
import { FilterSidebar, type CatalogFilters } from "@/components/catalog/FilterSidebar";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { LeatherOrigin } from "@/types";

// ── Mock Data ────────────────────────────────────────────────
// This will be replaced with API calls in Step 3.

interface MockLeather {
  id: string;
  name: string;
  description: string;
  origin: LeatherOrigin;
  animalSource?: string;
  thickness?: number;
  pricePerSqFt?: number;
  color?: string;
  finish?: string;
  certifications: string[];
  supplierName: string;
}

const MOCK_LEATHERS: MockLeather[] = [
  {
    id: "1",
    name: "Nile Crocodile Belly",
    description: "Premium belly cut from sustainably farmed Nile crocodile. Ideal for luxury handbags and accessories.",
    origin: "EXOTIC",
    animalSource: "Crocodile",
    thickness: 1.2,
    pricePerSqFt: 285,
    color: "Cognac",
    finish: "Glossy",
    certifications: ["CITES", "LWG"],
    supplierName: "Exotic Skins Co.",
  },
  {
    id: "2",
    name: "Vegetable-Tanned Cowhide",
    description: "Full-grain vegetable-tanned cowhide from certified tanneries. Ages beautifully with natural patina.",
    origin: "SUSTAINABLE",
    animalSource: "Cow",
    thickness: 1.4,
    pricePerSqFt: 12,
    color: "Natural",
    finish: "Matte",
    certifications: ["LWG Gold", "OEKO-TEX"],
    supplierName: "Tuscan Tannery",
  },
  {
    id: "3",
    name: "Piñatex™ Pineapple Leaf",
    description: "Innovative vegan leather made from pineapple leaf fibers. Lightweight, durable, and fully biodegradable.",
    origin: "VEGAN",
    thickness: 1.0,
    pricePerSqFt: 18,
    color: "Natural",
    finish: "Matte",
    certifications: ["PETA Approved", "B Corp"],
    supplierName: "Ananas Anam",
  },
  {
    id: "4",
    name: "Ostrich Full Quill",
    description: "Distinctive full-quill ostrich leather with characteristic bumps. Sourced from ethical farms in South Africa.",
    origin: "EXOTIC",
    animalSource: "Ostrich",
    thickness: 0.8,
    pricePerSqFt: 145,
    color: "Black",
    finish: "Nubuck",
    certifications: ["SAOFA", "LWG"],
    supplierName: "Cape Ostrich Leather",
  },
  {
    id: "5",
    name: "Recycled Ocean Leather",
    description: "Innovative material crafted from recycled ocean plastics bonded with natural fibers. Water-resistant and durable.",
    origin: "RECYCLED",
    thickness: 1.1,
    pricePerSqFt: 22,
    color: "Navy",
    finish: "Matte",
    certifications: ["GRS", "Blue Angel"],
    supplierName: "OceanTex",
  },
  {
    id: "6",
    name: "Chrome-Free Nappa",
    description: "Ultra-soft chrome-free nappa leather. Metal-free tanning process for hypoallergenic properties.",
    origin: "SUSTAINABLE",
    animalSource: "Lamb",
    thickness: 0.7,
    pricePerSqFt: 35,
    color: "Burgundy",
    finish: "Glossy",
    certifications: ["LWG Silver", "REACH"],
    supplierName: "Nordic Leather",
  },
  {
    id: "7",
    name: "Mushroom Mycelium",
    description: "Lab-grown mycelium leather alternative. Customizable thickness and texture. Carbon-negative production process.",
    origin: "VEGAN",
    thickness: 1.3,
    pricePerSqFt: 42,
    color: "Brown",
    finish: "Suede",
    certifications: ["USDA Bio-Preferred"],
    supplierName: "MycoWorks",
  },
  {
    id: "8",
    name: "Python Belly Grade A",
    description: "Premium grade-A python belly skin with symmetrical scales. Ethically sourced from managed populations.",
    origin: "EXOTIC",
    animalSource: "Python",
    thickness: 0.6,
    pricePerSqFt: 195,
    color: "Natural",
    finish: "Glossy",
    certifications: ["CITES", "LVMH Standards"],
    supplierName: "Southeast Asia Skins",
  },
  {
    id: "9",
    name: "Upcycled Denim Leather",
    description: "Unique textured material made from post-consumer denim waste bonded with bio-based adhesives.",
    origin: "RECYCLED",
    thickness: 1.5,
    pricePerSqFt: 8,
    color: "Blue",
    finish: "Distressed",
    certifications: ["GRS", "EU Ecolabel"],
    supplierName: "Re:Fabric Labs",
  },
];

export default function CatalogPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

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

  // Apply filters to mock data
  const filteredLeathers = MOCK_LEATHERS.filter((leather) => {
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
                      {...leather}
                      locale={locale}
                      onAddToCart={(id) => {
                        const leather = MOCK_LEATHERS.find(l => l.id === id);
                        if (leather) {
                          addItem({
                            id: leather.id,
                            name: leather.name,
                            origin: leather.origin,
                            color: leather.color,
                            finish: leather.finish,
                            pricePerSqFt: leather.pricePerSqFt,
                            supplierName: leather.supplierName,
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
