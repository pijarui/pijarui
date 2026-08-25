import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

/**
 * Tombol — satu-satunya sumber gaya aksi di seluruh produk.
 *
 * `min-h-11` (44px) dipasang di kelas dasar, bukan per-ukuran, supaya tidak ada
 * varian yang bisa turun di bawah target sentuh minimum di HP.
 *
 * Pakai `asChild` untuk merender `<Link>` dengan gaya tombol tanpa menyalin
 * class-nya:
 *   <Button asChild><Link href="/signup">Get started</Link></Button>
 */
const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Satu aksi utama per layar. */
        primary:
          "bg-primary text-primary-foreground font-semibold hover:opacity-90",
        /** Aksi pendamping — punya isian, jadi tetap terbaca di layar gelap. */
        secondary: "bg-secondary text-secondary-foreground hover:bg-input",
        /** Aksi tersier di dalam kartu yang sudah punya isian sendiri. */
        outline:
          "border border-input bg-transparent text-foreground hover:bg-secondary",
        /** Aksi paling tenang: toolbar, ikon, item menu. */
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        /** Hapus, batalkan langganan, dan aksi merusak lain. */
        destructive:
          "bg-destructive text-destructive-foreground font-semibold hover:opacity-90",
        /** Tautan inline yang perlu perilaku tombol. */
        link: "text-muted-foreground underline underline-offset-4 hover:text-foreground",
      },
      size: {
        sm: "px-3 text-xs",
        md: "px-4 py-2",
        lg: "px-5 py-2.5",
        /** Persegi untuk tombol khusus ikon — sertakan aria-label. */
        icon: "w-11 p-0",
      },
      /** Form auth memakai tombol selebar penuh; toolbar tidak. */
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
