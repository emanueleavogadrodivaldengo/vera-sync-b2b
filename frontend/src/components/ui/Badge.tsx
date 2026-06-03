import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "exotic"
  | "sustainable"
  | "recycled"
  | "vegan"
  | "success"
  | "warning"
  | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-stone-100 text-stone-600 border-stone-200",
  exotic: "bg-amber-50 text-amber-700 border-amber-200",
  sustainable: "bg-emerald-50 text-emerald-700 border-emerald-200",
  recycled: "bg-sky-50 text-sky-700 border-sky-200",
  vegan: "bg-lime-50 text-lime-700 border-lime-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
};

/**
 * Maps leather origin enum values to badge variants.
 */
export function originToBadgeVariant(
  origin: string
): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    EXOTIC: "exotic",
    SUSTAINABLE: "sustainable",
    RECYCLED: "recycled",
    VEGAN: "vegan",
  };
  return map[origin] || "default";
}

function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium uppercase tracking-wider",
        "rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
