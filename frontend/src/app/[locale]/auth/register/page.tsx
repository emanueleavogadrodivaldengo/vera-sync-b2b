"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type UserRole = "BUYER" | "SUPPLIER";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  contactName: string;
  role: UserRole | "";
  phone: string;
  country: string;
}

export default function RegisterPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    contactName: "",
    role: "",
    phone: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.role) {
      newErrors.role = t("Please select a role", "Seleziona un ruolo");
    }
    if (!formData.email) {
      newErrors.email = t("Email is required", "L'email è obbligatoria");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("Invalid email address", "Indirizzo email non valido");
    }
    if (!formData.password) {
      newErrors.password = t("Password is required", "La password è obbligatoria");
    } else if (formData.password.length < 8) {
      newErrors.password = t("Minimum 8 characters", "Minimo 8 caratteri");
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("Passwords don't match", "Le password non corrispondono");
    }
    if (!formData.companyName) {
      newErrors.companyName = t("Company name is required", "Il nome dell'azienda è obbligatorio");
    }
    if (!formData.contactName) {
      newErrors.contactName = t("Contact name is required", "Il nome del referente è obbligatorio");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Integrate with API registration endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const roles: { value: UserRole; icon: React.ReactNode; title: string; desc: string }[] = [
    {
      value: "BUYER",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      ),
      title: t("Buyer", "Acquirente"),
      desc: t("Browse and request leather samples", "Sfoglia e richiedi campioni di pelle"),
    },
    {
      value: "SUPPLIER",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
      title: t("Supplier", "Fornitore"),
      desc: t("List your leathers and manage orders", "Elenca le tue pelli e gestisci gli ordini"),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-accent-dark" />

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="reg-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#reg-pattern)" />
          </svg>
        </div>

        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <span className="text-xs text-white/70 font-medium tracking-wide">
                {t("Join the Platform", "Unisciti alla Piattaforma")}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight text-balance">
              {t(
                "Start sourcing premium leathers today.",
                "Inizia a trovare pelli premium oggi."
              )}
            </h1>
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              {t(
                "Whether you're a buyer looking for unique materials or a supplier showcasing your collection — Vera Sync brings you together.",
                "Che tu sia un acquirente alla ricerca di materiali unici o un fornitore che mostra la propria collezione — Vera Sync vi unisce."
              )}
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              t("Verified suppliers worldwide", "Fornitori verificati in tutto il mondo"),
              t("AI-powered leather recommendations", "Raccomandazioni di pelli basate sull'IA"),
              t("Seamless WhatsApp checkout", "Checkout semplice via WhatsApp"),
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-cream-50 overflow-y-auto">
        <div className="w-full max-w-lg animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Logo size="lg" showTagline />
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl font-heading font-bold text-stone-900">
              {t("Create your account", "Crea il tuo account")}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {t(
                "Join the leading B2B leather sourcing platform.",
                "Unisciti alla piattaforma leader per il sourcing di pelli B2B."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">
                {t("I am a...", "Sono un...")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => updateField("role", role.value)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                      formData.role === role.value
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
                    )}
                  >
                    {/* Selected indicator */}
                    {formData.role === role.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center animate-scale-in">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                    )}

                    <div className={cn(
                      "transition-colors",
                      formData.role === role.value ? "text-accent" : "text-stone-400"
                    )}>
                      {role.icon}
                    </div>
                    <span className={cn(
                      "text-sm font-semibold transition-colors",
                      formData.role === role.value ? "text-accent-dark" : "text-stone-700"
                    )}>
                      {role.title}
                    </span>
                    <span className="text-[11px] text-stone-400 text-center leading-tight">
                      {role.desc}
                    </span>
                  </button>
                ))}
              </div>
              {errors.role && (
                <p className="text-xs text-error flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {errors.role}
                </p>
              )}
            </div>

            {/* Company & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t("Company Name", "Nome Azienda")}
                placeholder={t("Acme Leathers Ltd.", "Pelli Acme S.r.l.")}
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                error={errors.companyName}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.75 3.75m0 0-.75 3.75M17.25 7.5l-.75 3.75" />
                  </svg>
                }
              />
              <Input
                label={t("Contact Name", "Nome Referente")}
                placeholder={t("John Smith", "Mario Rossi")}
                value={formData.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                error={errors.contactName}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                }
              />
            </div>

            {/* Email */}
            <Input
              label={t("Email Address", "Indirizzo Email")}
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              error={errors.email}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              }
            />

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t("Password", "Password")}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                error={errors.password}
                hint={!errors.password ? t("Min. 8 characters", "Min. 8 caratteri") : undefined}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                }
              />
              <Input
                label={t("Confirm Password", "Conferma Password")}
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                }
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t("Phone (optional)", "Telefono (opzionale)")}
                type="tel"
                placeholder="+39 02 1234 5678"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                }
              />
              <Input
                label={t("Country (optional)", "Paese (opzionale)")}
                placeholder={t("Italy", "Italia")}
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                }
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-stone-300 text-accent focus:ring-accent/30 cursor-pointer"
              />
              <span className="text-xs text-stone-500 leading-relaxed">
                {t(
                  "By creating an account, you agree to our Terms of Service and Privacy Policy.",
                  "Creando un account, accetti i nostri Termini di Servizio e la nostra Privacy Policy."
                )}
              </span>
            </label>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              {t("Create Account", "Crea Account")}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-stone-500 mt-6 pb-8">
            {t("Already have an account?", "Hai già un account?")}{" "}
            <Link
              href={`/${locale}/auth/login`}
              className="font-medium text-accent hover:text-accent-dark transition-colors"
            >
              {t("Sign in", "Accedi")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
