import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

const sizeConfig = {
  sm: { text: "text-lg", icon: "h-6 w-6", tagline: "text-[9px]" },
  md: { text: "text-xl", icon: "h-7 w-7", tagline: "text-[10px]" },
  lg: { text: "text-3xl", icon: "h-9 w-9", tagline: "text-xs" },
};

export function Logo({
  size = "md",
  className,
  showTagline = false,
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Mark — Abstract leather grain pattern */}
      <div
        className={cn(
          config.icon,
          "rounded-lg bg-gradient-to-br from-accent to-accent-dark",
          "flex items-center justify-center flex-shrink-0"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[60%] w-[60%]"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <path
            d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-heading font-bold tracking-tight text-stone-900 leading-none",
            config.text
          )}
        >
          Vera
          <span className="text-accent">Sync</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-stone-400 uppercase tracking-[0.2em] mt-0.5",
              config.tagline
            )}
          >
            Leather Sourcing
          </span>
        )}
      </div>
    </div>
  );
}
