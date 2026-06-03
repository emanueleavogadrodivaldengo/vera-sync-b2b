import { env } from "../config/env.js";

/**
 * WhatsApp Utility
 * Formats cart contents into a WhatsApp message and generates the click-to-chat URL.
 */

interface WhatsAppCartItem {
  leatherName: string;
  origin: string;
  quantity: number;
  notes?: string;
}

/**
 * Formats an array of cart items into a human-readable WhatsApp message.
 */
export function formatWhatsAppMessage(
  items: WhatsAppCartItem[],
  buyerCompany: string,
  buyerNote?: string
): string {
  const header = `🧵 *Vera Sync — Sample Request*\n\n📋 *From:* ${buyerCompany}\n`;

  const itemLines = items
    .map((item, index) => {
      let line = `\n${index + 1}. *${item.leatherName}* (${item.origin})`;
      line += `\n   Qty: ${item.quantity}`;
      if (item.notes) {
        line += `\n   Note: ${item.notes}`;
      }
      return line;
    })
    .join("\n");

  const footer = buyerNote ? `\n\n💬 *Additional Notes:* ${buyerNote}` : "";

  return `${header}${itemLines}${footer}\n\n---\nSent via Vera Sync`;
}

/**
 * Generates a WhatsApp click-to-chat URL with a pre-filled message.
 */
export function generateWhatsAppUrl(message: string): string {
  const phone = env.WHATSAPP_PHONE_NUMBER.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
