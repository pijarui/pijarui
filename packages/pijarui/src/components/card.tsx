import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

/**
 * Kartu — permukaan default untuk mengelompokkan konten.
 *
 * `Card` hanya menyediakan permukaan dan tepi; bagian dalam (`CardHeader`,
 * `CardContent`) yang mengatur padding, supaya kartu bisa memuat elemen
 * selebar penuh seperti tabel atau gambar tanpa melawan padding induknya.
 */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground border-border rounded-2xl border",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 p-5 pb-0", className)}
      {...props}
    />
  );
}

/**
 * Judul kartu di UI produk sengaja kecil dan uppercase: ia melabeli isi kartu,
 * bukan bersaing dengan judul halaman. Untuk kartu marketing yang butuh judul
 * besar, timpa lewat `className`.
 */
export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-muted-foreground text-xs font-medium tracking-wide uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-5", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "border-border flex items-center gap-3 border-t p-5",
        className,
      )}
      {...props}
    />
  );
}
