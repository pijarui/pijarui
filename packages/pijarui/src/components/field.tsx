import type { ComponentProps, ReactNode } from "react";

import { Label } from "./label";
import { cn } from "../lib/utils";

/**
 * Field form: label + kontrol + pesan error, dirangkai sekali di sini.
 *
 * Alasannya bukan sekadar hemat baris. Menyambungkan `htmlFor`/`id` dan
 * `aria-describedby` secara manual di tiap form adalah tempat aksesibilitas
 * paling sering bocor. Dengan komponen ini, form baru tidak bisa lupa.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string | null;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("space-y-1.5", className)} data-slot="field">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-muted-foreground text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Error tingkat form (gagal login, webhook tolak) — beda dari error per-field.
 * `role="alert"` membuat screen reader mengumumkannya begitu muncul.
 */
export function FormError({
  message,
  className,
  ...props
}: ComponentProps<"p"> & { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={cn(
        "border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm",
        className,
      )}
      {...props}
    >
      {message}
    </p>
  );
}
