import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

/**
 * Badge status. Setiap varian membawa titik warna, bukan hanya teks berwarna —
 * warna tidak boleh jadi satu-satunya pembawa makna (WCAG 1.4.1), dan titik
 * tetap terbaca oleh pengguna buta warna.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-secondary text-secondary-foreground",
        success: "bg-accent/15 text-accent",
        warning: "bg-amber-400/15 text-amber-300",
        danger: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const dotColors = {
  neutral: "bg-muted-foreground",
  success: "bg-accent",
  warning: "bg-amber-300",
  danger: "bg-destructive",
} as const;

export function Badge({
  className,
  variant = "neutral",
  dot = true,
  children,
  ...props
}: ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { dot?: boolean }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            dotColors[variant ?? "neutral"],
          )}
        />
      )}
      {children}
    </span>
  );
}

export { badgeVariants };
