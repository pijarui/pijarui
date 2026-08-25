import type { ComponentProps } from "react";

/**
 * Ikon internal, bukan bagian dari API publik.
 *
 * Sengaja SVG inline, bukan `lucide-react`: paket ikon memaksa konsumen
 * memasang seluruh pustaka demi tiga bentuk. Ini menjaga daftar dependency
 * Pijar tetap pendek dan bundle-nya kecil.
 *
 * Semuanya `aria-hidden` — ikon di sini dekoratif, maknanya selalu dibawa
 * teks di sebelahnya atau `aria-label` pada kontrolnya.
 */

type IconProps = ComponentProps<"svg">;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
