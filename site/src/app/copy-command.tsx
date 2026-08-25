"use client";

import { useState } from "react";

/**
 * Perintah install yang bisa disalin sekali klik.
 *
 * Tombolnya elemen <button> sungguhan, bukan div dengan onClick — supaya bisa
 * dijangkau keyboard dan diumumkan screen reader. Perubahan status disampaikan
 * lewat teks (`aria-live`), bukan hanya lewat warna atau ikon.
 */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bisa ditolak (konteks non-HTTPS, izin ditolak). Diamkan —
      // perintahnya tetap terlihat dan bisa diseleksi manual.
    }
  }

  return (
    <div className="border-border bg-muted flex items-center gap-3 rounded-xl border p-1 pl-4">
      <code className="text-foreground flex-1 truncate font-mono text-sm">
        <span className="text-muted-foreground select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-ring inline-flex h-11 shrink-0 cursor-pointer items-center rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `Copied ${command} to clipboard` : ""}
      </span>
    </div>
  );
}
