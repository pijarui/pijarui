import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Gabungkan className dengan aman.
 *
 * `clsx` menangani nilai kondisional (`isActive && "..."`), `twMerge`
 * menghapus konflik Tailwind sehingga class dari luar selalu menang:
 * `cn("px-4", "px-6")` → `"px-6"`, bukan keduanya.
 *
 * Ini yang membuat setiap komponen di `components/ui/` bisa menerima prop
 * `className` tanpa perlu `!important` atau menebak urutan class.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
