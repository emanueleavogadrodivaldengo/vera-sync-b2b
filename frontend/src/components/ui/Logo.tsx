import Image from "next/image";
import { cn } from "@/lib/utils";
import logoImg from "../../../public/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

const sizeConfig = {
  sm: { wrapper: "h-10 w-10", tagline: "text-[9px]" },
  md: { wrapper: "h-12 w-12", tagline: "text-[10px]" },
  lg: { wrapper: "h-20 w-20", tagline: "text-xs" },
};

export function Logo({
  size = "md",
  className,
  showTagline = false,
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("relative overflow-hidden rounded-xl", config.wrapper)}>
        <Image
          src={logoImg}
          alt="VeraSync Logo"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      {showTagline && (
        <span
          className={cn(
            "text-stone-400 uppercase tracking-[0.2em] mt-1.5 text-center font-medium",
            config.tagline
          )}
        >
          Leather Sourcing
        </span>
      )}
    </div>
  );
}
