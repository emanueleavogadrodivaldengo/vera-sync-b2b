import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  return (
    <footer className="border-t border-stone-200/60 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="sm" showTagline />
            <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
              {t(
                "Connecting buyers with premium sustainable and exotic leather suppliers worldwide.",
                "Colleghiamo acquirenti con fornitori premium di pelli sostenibili ed esotiche in tutto il mondo."
              )}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              {t("Platform", "Piattaforma")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/catalog`} className="text-sm text-stone-600 hover:text-accent transition-colors">
                  {t("Catalog", "Catalogo")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/auth/register`} className="text-sm text-stone-600 hover:text-accent transition-colors">
                  {t("Become a Supplier", "Diventa Fornitore")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/auth/register`} className="text-sm text-stone-600 hover:text-accent transition-colors">
                  {t("Buyer Registration", "Registrazione Acquirente")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              {t("Resources", "Risorse")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-stone-500">
                  {t("Leather Guide", "Guida alle Pelli")}
                </span>
              </li>
              <li>
                <span className="text-sm text-stone-500">
                  {t("Certifications", "Certificazioni")}
                </span>
              </li>
              <li>
                <span className="text-sm text-stone-500">
                  {t("Sustainability", "Sostenibilità")}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              {t("Contact", "Contatti")}
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-stone-500">info@verasync.com</li>
              <li className="text-sm text-stone-500">+39 02 1234 5678</li>
              <li className="text-sm text-stone-500">Milan, Italy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200/60 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400">
            © {currentYear} Vera Sync. {t("All rights reserved.", "Tutti i diritti riservati.")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer">
              {t("Privacy Policy", "Privacy Policy")}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer">
              {t("Terms of Service", "Termini di Servizio")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
