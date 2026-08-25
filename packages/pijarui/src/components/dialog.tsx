"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

import { cn } from "../lib/utils";
import { XIcon } from "./icons";

/**
 * Dialog modal.
 *
 * Dibangun di atas Radix karena perilaku yang benar di sini sulit dan mudah
 * salah: focus trap, mengembalikan fokus ke pemicu saat tertutup, Esc, klik
 * di luar, mengunci scroll body, dan `aria-modal` yang menyembunyikan sisa
 * halaman dari screen reader. Menulis ulang semua itu hanya menghasilkan
 * versi yang lebih buruk.
 *
 * DialogTitle WAJIB ada — Radix memakainya untuk `aria-labelledby`. Kalau
 * judulnya tidak boleh terlihat, bungkus dengan <VisuallyHidden>, jangan
 * dihilangkan.
 *
 *   <Dialog>
 *     <DialogTrigger asChild><Button>Delete</Button></DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Delete project?</DialogTitle>
 *         <DialogDescription>This cannot be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
 *         <Button variant="destructive">Delete</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground border-border fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border shadow-2xl",
          // Dialog yang lebih tinggi dari layar harus bisa di-scroll sendiri,
          // bukan terpotong — sering terjadi pada form panjang di HP.
          "max-h-[calc(100dvh-2rem)] overflow-y-auto",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "motion-reduce:animate-none",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-ring absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      // pr-14 memberi ruang untuk tombol tutup, supaya judul panjang tidak
      // menabraknya.
      className={cn("flex flex-col gap-1.5 p-6 pr-14 pb-0", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="dialog-body" className={cn("p-6", className)} {...props} />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      // Di HP tombol ditumpuk dengan aksi utama di ATAS: ibu jari paling
      // dekat ke bawah layar, jadi tombol batal yang di bawah lebih sulit
      // ditekan tidak sengaja.
      className={cn(
        "flex flex-col-reverse gap-3 p-6 pt-0 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
