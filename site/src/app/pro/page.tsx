import { Button, Card, CardContent, CardHeader, CardTitle } from "pijarui";

export const metadata = {
  title: "Pro",
  description:
    "A paid tier for Pijar UI is being planned. The core system stays MIT licensed.",
};

/**
 * PENANDA — sengaja kosong soal harga dan fitur.
 *
 * Halaman ini ada agar tautan dari landing tidak mati. Isinya menunggu
 * keputusan bisnis: harga, batas fitur, lisensi Pro. TIDAK ADA angka, janji,
 * atau tanggal yang boleh ditulis di sini sampai keputusan itu dibuat —
 * halaman pricing yang mengarang isi lebih merugikan daripada halaman yang
 * jujur mengaku belum siap.
 */
export default function ProPage() {
  return (
    <>
      <header className="border-border border-b">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" className="text-base font-semibold tracking-tight">
            Pijar UI
          </a>
          <Button asChild variant="ghost" size="sm">
            <a href="/">← Back</a>
          </Button>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pijar Pro
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
          A paid tier is being planned for teams that need more than the core
          set. What goes in it, and what it costs, isn&apos;t decided yet.
        </p>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle>What is already settled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-3 text-sm leading-relaxed">
            <p className="text-muted-foreground">
              The components on the home page — Button, Input, Label, Card,
              Badge, Field — are MIT licensed and stay that way. A paid tier
              will not close anything that is open today.
            </p>
            <p className="text-muted-foreground">
              The accessibility guarantees are part of the core, not a paid
              add-on. Contrast, touch targets, and focus handling are not
              features to upsell.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>What is not decided</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 text-sm leading-relaxed">
            <p className="text-muted-foreground">
              Pricing, the feature line, and the launch date. Rather than put
              placeholder numbers on this page, it stays empty until there is
              something true to write here.
            </p>
          </CardContent>
        </Card>

        <div className="mt-10">
          <Button asChild variant="outline">
            <a href="/">Back to the free system</a>
          </Button>
        </div>
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto w-full max-w-5xl px-4 py-8 text-sm sm:px-6">
          Pijar UI — MIT licensed.
        </div>
      </footer>
    </>
  );
}
