import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FormError,
  Input,
  Logo,
  LogoLockup,
} from "pijarui";

import { CopyCommand } from "./copy-command";

/**
 * Landing pijarui.com — surface Decide.
 *
 * Setiap komponen di halaman ini diimpor dari paket `pijarui` yang ter-publish,
 * bukan disalin. Halaman ini SEKALIGUS uji integrasi: kalau paketnya rusak,
 * landing page-nya ikut rusak dan build gagal. Tidak ada demo yang bisa
 * diam-diam jadi basi.
 */
export default function HomePage() {
  return (
    <>
      <header className="border-border border-b">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <LogoLockup />
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <a href="#install">Install</a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a
                href="https://github.com/pijarui/pijarui"
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub
              </a>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ─────────────────────────────── Hero */}
        <section className="mx-auto w-full max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
          <div className="max-w-2xl">
            <Logo className="size-11" aria-hidden title="" />
            <div className="mt-6">
              <Badge variant="success">v0.1.1 · MIT</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Accessible by construction, not by discipline.
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-relaxed text-pretty">
              A dark-first React design system on Tailwind v4. Touch targets,
              contrast, and focus states are built into the components — so the
              accessible version is the only version you can ship.
            </p>

            <div className="mt-8 max-w-md">
              <CopyCommand command="pnpm add pijarui" />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#install">Get started</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#components">See components</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── Argumen utama */}
        <section className="border-border border-t">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Most accessibility bugs are things someone forgot to type.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Not decisions anyone argued about — just a{" "}
              <code className="text-foreground font-mono text-sm">htmlFor</code>{" "}
              that never got wired to an id, a focus ring nobody wrote, a button
              that ended up 32px tall on a phone. Pijar moves those from things
              you remember to things the component already does.
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              <Guarantee
                title="44px touch targets"
                detail="min-h-11 sits in the Button and Input base class, not in a size variant — so no variant can drop below it, however you compose it."
              />
              <Guarantee
                title="Focus states you cannot skip"
                detail=":focus-visible is defined once in the token layer. Every focusable element gets a ring, including ones you add later and forget to style."
              />
              <Guarantee
                title="Errors wired to their field"
                detail="Field derives the label's htmlFor and the error's id from one prop. A screen reader reads the message with the input — you cannot forget to connect them."
              />
              <Guarantee
                title="Colour is never the only signal"
                detail="Badge always carries a dot plus text. Status stays readable for colour-blind users and survives a black-and-white screenshot."
              />
              <Guarantee
                title="No forced zoom on iOS"
                detail="Inputs render at 16px on mobile. Below that, Safari zooms the whole page when a field takes focus — a layout bug that only shows up on a real phone."
              />
              <Guarantee
                title="Contrast that was measured"
                detail="Body text 17.3:1, secondary text 7.9:1, accent 9.9:1 against the background — computed from the shipped tokens, not estimated. WCAG AA needs 4.5:1."
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── Komponen hidup */}
        <section id="components" className="border-border border-t scroll-mt-4">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Live, from the published package
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Everything below is imported from{" "}
              <code className="text-foreground font-mono text-sm">pijarui</code>{" "}
              — the same build you install. This page is the integration test: if
              the package breaks, this page breaks with it.
            </p>
            <p className="text-muted-foreground/70 mt-2 font-mono text-xs">
              pijarui@0.1.1 · registry.npmjs.org
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>
                    Six variants. One rule: a single primary per screen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3 pt-4">
                  <Button>Save changes</Button>
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="outline">Export</Button>
                  <Button variant="ghost">Dismiss</Button>
                  <Button variant="destructive">Delete</Button>
                  <Button variant="link">Learn more</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fields</CardTitle>
                  <CardDescription>
                    Label, control, and message wired together in one component.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <Field label="Email" htmlFor="demo-email">
                    <Input
                      id="demo-email"
                      type="email"
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field
                    label="Password"
                    htmlFor="demo-password"
                    error="Must be at least 8 characters."
                  >
                    <Input
                      id="demo-password"
                      type="password"
                      defaultValue="abc"
                      aria-invalid
                    />
                  </Field>
                  <FormError message="That email and password don't match." />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>
                    Every badge carries a dot, so colour is never load-bearing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-4">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Past due</Badge>
                  <Badge variant="danger">Cancelled</Badge>
                  <Badge>Draft</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Composed</CardTitle>
                  <CardDescription>
                    Card sections handle their own padding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Badge variant="success">Active</Badge>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Renews 14 March 2026
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Manage plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── Pemasangan */}
        <section id="install" className="border-border border-t scroll-mt-4">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Three steps
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Requires React 18+ and Tailwind v4. Token names follow the
              shadcn/ui convention, so{" "}
              <code className="text-foreground font-mono text-sm">
                shadcn add
              </code>{" "}
              components drop in on the same palette.
            </p>

            <ol className="mt-10 space-y-8">
              <Step
                n={1}
                title="Install"
                body="React, React DOM, and Tailwind stay peer dependencies — Pijar never bundles its own copy."
              >
                <CopyCommand command="pnpm add pijarui" />
              </Step>
              <Step
                n={2}
                title="Import the tokens once"
                body="In your root stylesheet, after Tailwind. This is the only styling setup there is — no config file to extend."
              >
                <CodeBlock>{`@import "tailwindcss";
@import "pijarui/styles.css";`}</CodeBlock>
              </Step>
              <Step n={3} title="Use it" body="No provider, no wrapper.">
                <CodeBlock>{`import { Button, Field, Input } from "pijarui";

export function SignIn() {
  return (
    <form className="space-y-4">
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" />
      </Field>
      <Button type="submit" block>Sign in</Button>
    </form>
  );
}`}</CodeBlock>
              </Step>
            </ol>

            <Card className="mt-12">
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Changing the theme</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every colour and radius is a CSS variable. Redefine them in
                  your own{" "}
                  <code className="text-foreground font-mono text-xs">
                    :root
                  </code>{" "}
                  after the import and the whole system follows — no component
                  overrides, no{" "}
                  <code className="text-foreground font-mono text-xs">
                    !important
                  </code>
                  . The full radius scale derives from a single{" "}
                  <code className="text-foreground font-mono text-xs">
                    --radius
                  </code>{" "}
                  value.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─────────────────────────────── Penanda Pro */}
        <section className="border-border border-t">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Pijar Pro</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Everything on this page is MIT licensed and stays that way. A
                  paid tier is being planned for teams that need more than the
                  core set — details aren&apos;t settled yet.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary" size="sm">
                  <a href="/pro">Read more</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Pijar UI — MIT licensed.{" "}
            <span className="text-muted-foreground/70">
              &ldquo;Pijar&rdquo; is Indonesian for the glow of an ember.
            </span>
          </p>
          <a
            href="https://github.com/pijarui/pijarui"
            rel="noreferrer noopener"
            target="_blank"
            // inline-flex + min-h-11 + -mx-2 px-2: target sentuh 44px tanpa
            // menggeser posisi visualnya. Link teks polos di footer default-nya
            // hanya setinggi barisnya (20px) — terlalu kecil untuk ibu jari.
            className="hover:text-foreground -mx-2 inline-flex min-h-11 items-center px-2 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}

function Guarantee({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="border-border border-l pl-5">
      <h3 className="font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
        {detail}
      </p>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  children,
}: {
  n: number;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid gap-4 sm:grid-cols-[2rem_1fr]">
      <span
        aria-hidden
        className="border-border text-muted-foreground hidden size-8 items-center justify-center rounded-full border font-mono text-sm sm:flex"
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="font-medium">
          <span className="sm:hidden">{n}. </span>
          {title}
        </h3>
        <p className="text-muted-foreground mt-1 mb-3 text-sm leading-relaxed">
          {body}
        </p>
        {children}
      </div>
    </li>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="border-border bg-muted overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed">
      <code className="text-foreground font-mono">{children}</code>
    </pre>
  );
}
