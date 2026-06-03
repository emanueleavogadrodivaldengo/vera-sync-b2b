"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const { items, clearCart } = useCart();
  const t = (en: string, it: string) => (locale === "it" ? it : en);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-stone-900">
            {t("Sample Request Cart", "Carrello Richiesta Campioni")}
          </h1>
          <p className="mt-2 text-stone-500">
            {t(
              "Review your selected leathers before sending your request to suppliers.",
              "Rivedi le pelli selezionate prima di inviare la richiesta ai fornitori."
            )}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cart Items List */}
            <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <h2 className="text-lg font-semibold text-stone-800">
                    {t("Selected Items", "Articoli Selezionati")}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-stone-400 hover:text-stone-600 font-medium transition-colors cursor-pointer"
                  >
                    {t("Clear Cart", "Svuota Carrello")}
                  </button>
                </div>
                
                <div className="flex flex-col">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} locale={locale} />
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0 sticky top-24">
              <CartSummary locale={locale} />
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-heading font-semibold text-stone-800 mb-2">
              {t("Your cart is empty", "Il tuo carrello è vuoto")}
            </h2>
            <p className="text-stone-500 max-w-sm mx-auto mb-8">
              {t(
                "Looks like you haven't added any leather samples to your cart yet.",
                "Sembra che tu non abbia ancora aggiunto alcun campione di pelle al tuo carrello."
              )}
            </p>
            <Link href={`/${locale}/catalog`}>
              <Button size="lg" variant="primary">
                {t("Browse Catalog", "Sfoglia il Catalogo")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
