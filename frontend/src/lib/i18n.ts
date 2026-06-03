/**
 * Internationalization (i18n) Configuration
 * Vera Sync supports English (default) and Italian.
 */

export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Load translation file for a given locale and namespace.
 */
export async function getTranslations(
  locale: Locale,
  namespace: string = "common"
): Promise<Record<string, string>> {
  try {
    const translations = await import(
      `../../public/locales/${locale}/${namespace}.json`
    );
    return translations.default;
  } catch {
    console.warn(
      `Missing translations for locale "${locale}", namespace "${namespace}"`
    );
    return {};
  }
}

/**
 * Simple translation helper.
 * Usage: const t = createTranslator(translations);
 *        t("hero.title") → "Discover Premium Leathers"
 */
export function createTranslator(translations: Record<string, string>) {
  return (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };
}
