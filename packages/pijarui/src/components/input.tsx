import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

/**
 * Field teks. `min-h-11` menjaga target sentuh 44px, dan `text-base` di mobile
 * mencegah iOS Safari melakukan zoom otomatis saat field difokus — di bawah
 * 16px browser menganggapnya terlalu kecil dan ikut memperbesar seluruh halaman.
 */
export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:outline-ring aria-invalid:border-destructive min-h-11 w-full rounded-lg border px-3 py-2 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
