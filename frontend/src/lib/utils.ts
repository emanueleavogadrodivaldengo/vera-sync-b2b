import { type ClassValue, clsx } from "clsx";

/**
 * Utility to conditionally join class names.
 * Lightweight alternative to clsx for Tailwind CSS usage.
 * Note: Install `clsx` package when implementing components.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a price value for display.
 */
export function formatPrice(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Truncate a string to the specified length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Generate a slug from a string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
