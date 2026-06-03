import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CartSummaryProps {
  locale: string;
}

export function CartSummary({ locale }: CartSummaryProps) {
  const { items, totalItems, totalPrice } = useCart();
  const t = (en: string, it: string) => (locale === "it" ? it : en);

  const handleWhatsAppCheckout = () => {
    // Generate WhatsApp message based on cart contents
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "1234567890"; // Dummy fallback
    
    let message = t(
      "Hello VeraSync! I would like to request samples for the following leathers:\n\n",
      "Ciao VeraSync! Vorrei richiedere campioni per le seguenti pelli:\n\n"
    );

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (by ${item.supplierName})\n`;
      message += `   Quantity: ${item.quantity} sq ft\n`;
      if (item.pricePerSqFt) {
        message += `   Est. Price: ${formatPrice(item.pricePerSqFt * item.quantity)}\n`;
      }
      message += "\n";
    });

    if (totalPrice > 0) {
      message += `*Total Estimate:* ${formatPrice(totalPrice)}\n\n`;
    }

    message += t(
      "Please let me know the availability and shipping details. Thank you!",
      "Fatemi sapere disponibilità e dettagli di spedizione. Grazie!"
    );

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
      <h3 className="font-heading font-semibold text-lg text-stone-900">
        {t("Order Summary", "Riepilogo Ordine")}
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>{t("Total Items", "Totale Articoli")}</span>
          <span className="font-medium text-stone-900">{totalItems}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>{t("Estimated Shipping", "Spedizione Stimata")}</span>
          <span className="italic text-stone-400">{t("TBD", "Da definire")}</span>
        </div>
        
        <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
          <span className="font-semibold text-stone-900">{t("Total Estimate", "Totale Stimato")}</span>
          <span className="text-xl font-heading font-bold text-accent">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Button
          fullWidth
          size="lg"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-sm"
          onClick={handleWhatsAppCheckout}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          {t("Request via WhatsApp", "Richiedi via WhatsApp")}
        </Button>
        <p className="text-center text-[11px] text-stone-400">
          {t("No payment required. You're just requesting samples/quotes.", "Nessun pagamento richiesto. Stai solo richiedendo campioni/preventivi.")}
        </p>
      </div>
    </div>
  );
}
