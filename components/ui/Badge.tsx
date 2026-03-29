"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "satilik" | "kiralik" | "ticari" | "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full whitespace-nowrap";

    const variants = {
      satilik: "bg-success text-white",
      kiralik: "bg-accent text-primary",
      ticari: "bg-primary text-white",
      default: "bg-surface text-text-light",
      success: "bg-success text-white",
      warning: "bg-[#f59e0b] text-white",
      error: "bg-error text-white",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
