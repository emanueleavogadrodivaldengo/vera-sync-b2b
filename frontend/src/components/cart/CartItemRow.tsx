import Image from "next/image";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CartItemRowProps {
  item: CartItem;
  locale: string;
}

export function CartItemRow({ item, locale }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const t = (en: string, it: string) => (locale === "it" ? it : en);

  const gradientMap: Record<string, string> = {
    EXOTIC: "from-amber-800 to-yellow-900",
    SUSTAINABLE: "from-emerald-800 to-teal-900",
    RECYCLED: "from-sky-800 to-blue-900",
    VEGAN: "from-lime-800 to-green-900",
  };

  const bgClass = gradientMap[item.origin] || "from-stone-700 to-stone-800";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-stone-100 last:border-0 group">
      {/* Image / Placeholder */}
      <div className="w-full sm:w-24 h-24 rounded-lg bg-gradient-to-br flex-shrink-0 relative overflow-hidden shadow-sm flex items-center justify-center text-white/30 text-2xl font-heading font-bold"
           className={`w-full sm:w-24 h-24 rounded-lg bg-gradient-to-br flex-shrink-0 relative overflow-hidden shadow-sm flex items-center justify-center text-white/30 text-2xl font-heading font-bold ${bgClass}`}
      >
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        ) : (
          item.name.charAt(0)
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="text-base font-semibold text-stone-900 truncate">
          {item.name}
        </h4>
        <p className="text-xs text-stone-500">
          {t("by", "di")} {item.supplierName}
        </p>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200">
            {item.origin}
          </span>
          {item.color && <span>{item.color}</span>}
          {item.finish && <span>{item.finish}</span>}
        </div>
      </div>

      {/* Price & Quantity Controls */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 mt-4 sm:mt-0">
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-sm font-semibold text-stone-900">
            {item.pricePerSqFt ? formatPrice(item.pricePerSqFt * item.quantity) : t("Request quote", "Richiedi prev.")}
          </span>
          {item.pricePerSqFt && (
            <span className="text-xs text-stone-400">
              {formatPrice(item.pricePerSqFt)} / sq ft
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-stone-200 rounded-lg bg-white">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-medium text-stone-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-stone-400 hover:text-error transition-colors rounded-lg hover:bg-error/10 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
