import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

/**
 * Tanda Pijar — huruf P dengan titik pijar di dalam mangkuknya.
 *
 * Sengaja monogram, bukan bentuk abstrak. Dua metafora abstrak (kursor teks,
 * bara) diuji dulu di piksel 16px sungguhan dan keduanya gagal: kursor
 * terbaca sebagai peniti, bara terbaca sebagai bulan sabit. Huruf tidak punya
 * masalah itu — ia selalu terbaca sebagai dirinya sendiri, di ukuran apa pun.
 *
 * Warna diambil dari token, jadi produk yang mengganti tema ikut mengganti
 * logonya tanpa menyediakan berkas baru.
 */
export function Logo({
  className,
  title = "Pijar UI",
  ...props
}: ComponentProps<"svg"> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      data-slot="logo"
      className={cn("size-8", className)}
      {...props}
    >
      <path
        d="M8.5 5.5h8.2a7.3 7.3 0 0 1 0 14.6h-4.4v6.4H8.5V5.5Z"
        className="fill-foreground"
      />
      <circle cx="16.4" cy="12.8" r="3.1" className="fill-accent" />
    </svg>
  );
}

/**
 * Logo + nama, dikunci pada jarak yang benar.
 *
 * Dipakai di header dan footer supaya jarak antara tanda dan nama tidak
 * ditebak ulang setiap kali.
 */
export function LogoLockup({
  className,
  label = "Pijar UI",
  ...props
}: ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="logo-lockup"
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <Logo className="size-7 shrink-0" title={label} />
      <span className="text-base font-semibold tracking-tight">{label}</span>
    </span>
  );
}
