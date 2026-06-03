"use client";

import Image from "next/image";
import { Badge, originToBadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { LeatherOrigin } from "@/types";

interface LeatherCardProps {
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
  imageUrl?: string;
  supplierName?: string;
  locale?: string;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

/**
 * Generates a deterministic gradient based on the leather origin for placeholder images.
 */
function getPlaceholderGradient(origin: LeatherOrigin, name: string): string {
  const gradients: Record<LeatherOrigin, string> = {
    EXOTIC: "from-amber-800 via-amber-700 to-yellow-900",
    SUSTAINABLE: "from-emerald-800 via-emerald-700 to-teal-900",
    RECYCLED: "from-sky-800 via-sky-700 to-blue-900",
    VEGAN: "from-lime-800 via-lime-700 to-green-900",
  };
  return gradients[origin] || "from-stone-700 via-stone-600 to-stone-800";
}

export function LeatherCard({
  id,
  name,
  description,
  origin,
  animalSource,
  thickness,
  pricePerSqFt,
  color,
  finish,
  certifications,
  imageUrl,
  supplierName,
  locale = "en",
  onAddToCart,
  onViewDetails,
}: LeatherCardProps) {
  const t = (en: string, it: string) => (locale === "it" ? it : en);

  return (
    <div className="group relative rounded-xl bg-white border border-stone-100 shadow-card overflow-hidden transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-0.5">
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br",
              getPlaceholderGradient(origin, name),
              "flex items-center justify-center"
            )}
          >
            {/* Leather texture pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`tex-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white" opacity="0.5" />
                    <circle cx="0" cy="0" r="0.5" fill="white" opacity="0.3" />
                    <circle cx="20" cy="20" r="0.5" fill="white" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#tex-${id})`} />
              </svg>
            </div>
            <span className="text-white/30 text-4xl font-heading font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Origin Badge — top left */}
        <div className="absolute top-3 left-3">
          <Badge variant={originToBadgeVariant(origin)} size="sm">
            {origin}
          </Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails?.(id)}
            className="w-full bg-white/95 text-stone-900 hover:bg-white"
          >
            {t("View Details", "Vedi Dettagli")}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <h3 className="font-heading text-base font-semibold text-stone-900 leading-tight group-hover:text-accent transition-colors duration-200">
            {name}
          </h3>
          {supplierName && (
            <p className="text-xs text-stone-400 mt-0.5">
              {t("by", "di")} {supplierName}
            </p>
          )}
        </div>

        {/* Specs Row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
          {animalSource && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              {animalSource}
            </span>
          )}
          {thickness && (
            <span>{thickness}mm</span>
          )}
          {finish && (
            <span>{finish}</span>
          )}
          {color && (
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-stone-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
              {color}
            </span>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-1.5 py-0.5 text-[10px] bg-stone-50 text-stone-500 rounded border border-stone-100 font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Footer — Price + Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-50">
          <div>
            {pricePerSqFt ? (
              <>
                <span className="text-lg font-heading font-bold text-stone-900">
                  {formatPrice(pricePerSqFt)}
                </span>
                <span className="text-xs text-stone-400 ml-1">
                  /sq ft
                </span>
              </>
            ) : (
              <span className="text-sm text-stone-400 italic">
                {t("Price on request", "Prezzo su richiesta")}
              </span>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddToCart?.(id)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t("Add", "Aggiungi")}
          </Button>
        </div>
      </div>
    </div>
  );
}
