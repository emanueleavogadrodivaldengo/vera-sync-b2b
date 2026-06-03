"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = (en: string, it: string) => (locale === "it" ? it : en);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t("Email is required", "L'email è obbligatoria");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("Invalid email address", "Indirizzo email non valido");
    }

    if (!formData.password) {
      newErrors.password = t("Password is required", "La password è obbligatoria");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Integrate with NextAuth signIn()
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-accent-dark" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grain" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="0.8" fill="white" />
                <circle cx="45" cy="45" r="0.8" fill="white" />
                <circle cx="45" cy="15" r="0.5" fill="white" />
                <circle cx="15" cy="45" r="0.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain)" />
          </svg>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-white/70 font-medium tracking-wide">
                B2B Platform
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              {t(
                "Source the finest\nsustainable leathers.",
                "Trova le migliori\npelli sostenibili."
              )}
            </h1>
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              {t(
                "Connect with certified suppliers, discover exotic and eco-friendly materials, and request samples — all in one place.",
                "Connettiti con fornitori certificati, scopri materiali esotici ed ecologici, e richiedi campioni — tutto in un unico posto."
              )}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[
                "bg-amber-400",
                "bg-emerald-400",
                "bg-sky-400",
                "bg-rose-400",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-stone-900 flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-white/80 font-medium">200+</p>
              <p className="text-xs text-white/50">
                {t("Verified Suppliers", "Fornitori Verificati")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-cream-50">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="lg" showTagline />
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-heading font-bold text-stone-900">
              {t("Welcome back", "Bentornato")}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {t(
                "Sign in to access your leather sourcing dashboard.",
                "Accedi per raggiungere la tua dashboard."
              )}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t("Email Address", "Indirizzo Email")}
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              }
            />

            <Input
              label={t("Password", "Password")}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              }
            />

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-stone-300 text-accent focus:ring-accent/30 cursor-pointer"
                />
                <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
                  {t("Remember me", "Ricordami")}
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-accent hover:text-accent-dark font-medium transition-colors cursor-pointer"
              >
                {t("Forgot password?", "Password dimenticata?")}
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              {t("Sign In", "Accedi")}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-cream-50 px-4 text-xs text-stone-400 uppercase tracking-wider">
                {t("or", "oppure")}
              </span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-stone-500">
            {t("Don't have an account?", "Non hai un account?")}{" "}
            <Link
              href={`/${locale}/auth/register`}
              className="font-medium text-accent hover:text-accent-dark transition-colors"
            >
              {t("Create one", "Creane uno")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
