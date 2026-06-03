"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  locale?: string;
  onFiltersChange?: (filters: CatalogFilters) => void;
}

export interface CatalogFilters {
  origins: string[];
  colors: string[];
  finishes: string[];
  priceRange: [number, number];
  search: string;
}

const ORIGINS = [
  { value: "EXOTIC", label: { en: "Exotic", it: "Esotica" }, color: "bg-amber-400" },
  { value: "SUSTAINABLE", label: { en: "Sustainable", it: "Sostenibile" }, color: "bg-emerald-400" },
  { value: "RECYCLED", label: { en: "Recycled", it: "Riciclata" }, color: "bg-sky-400" },
  { value: "VEGAN", label: { en: "Vegan", it: "Vegana" }, color: "bg-lime-400" },
];

const COLORS = [
  { value: "Black", hex: "#1a1a1a" },
  { value: "Brown", hex: "#8B4513" },
  { value: "Tan", hex: "#D2B48C" },
  { value: "Cognac", hex: "#9A463D" },
  { value: "Navy", hex: "#1B2A4A" },
  { value: "Burgundy", hex: "#722F37" },
  { value: "Olive", hex: "#556B2F" },
  { value: "Natural", hex: "#F5DEB3" },
];

const FINISHES = [
  { value: "Matte", label: { en: "Matte", it: "Opaca" } },
  { value: "Glossy", label: { en: "Glossy", it: "Lucida" } },
  { value: "Nubuck", label: { en: "Nubuck", it: "Nubuck" } },
  { value: "Suede", label: { en: "Suede", it: "Scamosciata" } },
  { value: "Patent", label: { en: "Patent", it: "Verniciata" } },
  { value: "Distressed", label: { en: "Distressed", it: "Invecchiata" } },
];

const defaultFilters: CatalogFilters = {
  origins: [],
  colors: [],
  finishes: [],
  priceRange: [0, 500],
  search: "",
};

export function FilterSidebar({ locale = "en", onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    origin: true,
    color: true,
    finish: true,
    price: true,
  });

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayFilter = (
    key: "origins" | "colors" | "finishes",
    value: string
  ) => {
    const newFilters = {
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const activeCount =
    filters.origins.length + filters.colors.length + filters.finishes.length;

  return (
    <aside className="w-full space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
          {t("Filters", "Filtri")}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-accent hover:text-accent-dark font-medium transition-colors cursor-pointer"
          >
            {t("Clear all", "Cancella tutto")} ({activeCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="pb-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder={t("Search leathers...", "Cerca pelli...")}
            value={filters.search}
            onChange={(e) => {
              const newFilters = { ...filters, search: e.target.value };
              setFilters(newFilters);
              onFiltersChange?.(newFilters);
            }}
            className="w-full rounded-lg border border-stone-200 bg-white pl-9 pr-4 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
          />
        </div>
      </div>

      {/* Origin Filter */}
      <FilterSection
        title={t("Origin", "Origine")}
        isOpen={expandedSections.origin}
        onToggle={() => toggleSection("origin")}
      >
        <div className="space-y-1.5">
          {ORIGINS.map((origin) => (
            <label
              key={origin.value}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-stone-50 cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                checked={filters.origins.includes(origin.value)}
                onChange={() => toggleArrayFilter("origins", origin.value)}
                className="w-3.5 h-3.5 rounded border-stone-300 text-accent focus:ring-accent/30 cursor-pointer"
              />
              <span className={cn("w-2.5 h-2.5 rounded-full", origin.color)} />
              <span className="text-sm text-stone-600 group-hover:text-stone-800 transition-colors">
                {origin.label[locale as keyof typeof origin.label] || origin.label.en}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection
        title={t("Color", "Colore")}
        isOpen={expandedSections.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleArrayFilter("colors", color.value)}
              title={color.value}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer",
                "hover:scale-110",
                filters.colors.includes(color.value)
                  ? "border-accent ring-2 ring-accent/30 scale-110"
                  : "border-stone-200"
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Finish Filter */}
      <FilterSection
        title={t("Finish", "Finitura")}
        isOpen={expandedSections.finish}
        onToggle={() => toggleSection("finish")}
      >
        <div className="flex flex-wrap gap-1.5">
          {FINISHES.map((finish) => (
            <button
              key={finish.value}
              onClick={() => toggleArrayFilter("finishes", finish.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer",
                filters.finishes.includes(finish.value)
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              )}
            >
              {finish.label[locale as keyof typeof finish.label] || finish.label.en}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title={t("Price Range", "Fascia di Prezzo")}
        isOpen={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const newFilters = {
                ...filters,
                priceRange: [0, parseInt(e.target.value)] as [number, number],
              };
              setFilters(newFilters);
              onFiltersChange?.(newFilters);
            }}
            className="w-full accent-accent"
          />
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>$0</span>
            <span className="font-medium text-stone-700">
              {t("Up to", "Fino a")} ${filters.priceRange[1]}/sq ft
            </span>
            <span>$500</span>
          </div>
        </div>
      </FilterSection>

      {/* Apply Button (mobile) */}
      <div className="pt-4 lg:hidden">
        <Button variant="primary" fullWidth size="md">
          {t("Apply Filters", "Applica Filtri")}
          {activeCount > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded text-[10px]">
              {activeCount}
            </span>
          )}
        </Button>
      </div>
    </aside>
  );
}

// ── Collapsible Filter Section ────────────────────────────────

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-t border-stone-100 py-3">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left group cursor-pointer"
      >
        <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider group-hover:text-stone-800 transition-colors">
          {title}
        </span>
        <svg
          className={cn(
            "w-4 h-4 text-stone-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
