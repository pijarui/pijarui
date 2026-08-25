# Pijar UI

[![npm](https://img.shields.io/npm/v/pijarui?color=34d399)](https://www.npmjs.com/package/pijarui)
[![license](https://img.shields.io/npm/l/pijarui?color=34d399)](./LICENSE)

A dark-first React design system on Tailwind v4.

Most accessibility bugs are not decisions anyone argued about — they are things
someone forgot to type. A `htmlFor` that never got wired to an id. A focus ring
nobody wrote. A button that ended up 32px tall on a phone. Pijar moves those
from things you remember to things the component already does.

```bash
pnpm add pijarui
```

```css
/* your root stylesheet */
@import "tailwindcss";
@import "pijarui/styles.css";
```

```tsx
import { Button, Field, Input } from "pijarui";

export function SignIn() {
  return (
    <form className="space-y-4">
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" />
      </Field>
      <Button type="submit" block>
        Sign in
      </Button>
    </form>
  );
}
```

No provider, no wrapper, no config file to extend.

## What the components guarantee

| Guarantee | How it is enforced |
| --- | --- |
| 44px touch targets | `min-h-11` is in the Button and Input **base** class, not a size variant — no variant can drop below it |
| Focus states | `:focus-visible` is defined once in the token layer, so elements you add later still get a ring |
| Errors wired to fields | `Field` derives the label's `htmlFor` and the error's id from one prop |
| Colour is never the only signal | `Badge` always carries a dot plus text — survives colour blindness and greyscale |
| No forced zoom on iOS | Inputs render at 16px on mobile; below that Safari zooms the whole page |
| Measured contrast | Body 17.3:1, secondary 7.9:1, accent 9.9:1 — computed from the shipped tokens (WCAG AA needs 4.5:1) |

## Components

`Button` · `Input` · `Label` · `Card` · `Badge` · `Field` · `FormError` ·
`Logo` · `LogoLockup`

Plus `cn()`, the class merger, so your own components can accept a `className`
prop that reliably wins.

### Logo

The Pijar mark reads its colours from the tokens, so a themed product gets a
themed logo without shipping a new file:

```tsx
<Logo />                       {/* the mark alone */}
<Logo className="size-12" />   {/* any size */}
<LogoLockup />                 {/* mark + "Pijar UI" at the right spacing */}
<LogoLockup label="Acme" />    {/* mark + your own name */}
```

### Button

```tsx
<Button>Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Export</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Learn more</Button>

<Button size="sm" /> <Button size="md" /> <Button size="lg" />
<Button size="icon" aria-label="Settings"><GearIcon /></Button>

<Button block>Full width</Button>

{/* Render a link with button styling — no class copying */}
<Button asChild><Link href="/signup">Get started</Link></Button>
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary` `secondary` `outline` `ghost` `destructive` `link` | `primary` |
| `size` | `sm` `md` `lg` `icon` | `md` |
| `block` | `true` — full width | `false` |
| `asChild` | `true` — render the child as the element | `false` |

### Field

```tsx
<Field label="Email" htmlFor="email">
  <Input id="email" type="email" />
</Field>

<Field label="Workspace" htmlFor="ws" hint="Lowercase and hyphens only.">
  <Input id="ws" defaultValue="acme-inc" />
</Field>

<Field label="Password" htmlFor="pw" error="Must be at least 8 characters.">
  <Input id="pw" type="password" aria-invalid />
</Field>

{/* Form-level error, distinct from a per-field one */}
<FormError message="That email and password don't match." />
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Subscription</CardTitle>
    <CardDescription>Billed monthly.</CardDescription>
  </CardHeader>
  <CardContent className="pt-4">…</CardContent>
  <CardFooter><Button size="sm">Manage</Button></CardFooter>
</Card>
```

`Card` provides only the surface and border; the sections own their padding, so
a card can hold a full-bleed table or image without fighting its parent.

### Badge

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Past due</Badge>
<Badge variant="danger">Cancelled</Badge>
<Badge>Draft</Badge>
<Badge dot={false}>No dot</Badge>
```

## Theming

Every colour and radius is a CSS variable. Redefine them in your own `:root`
after the import — no component overrides, no `!important`:

```css
@import "tailwindcss";
@import "pijarui/styles.css";

:root {
  --background: #0a0a0a;
  --accent: #f97316;
  --radius: 1rem; /* the whole radius scale derives from this */
}
```

Token names follow the shadcn/ui convention, so `shadcn add dialog` components
land on the same palette without adjustment.

<details>
<summary>Full token list</summary>

| Token | Purpose |
| --- | --- |
| `--background` / `--foreground` | Page canvas and primary text |
| `--card` / `--card-foreground` | Panels, one step above the canvas |
| `--popover` / `--popover-foreground` | Floating menus and dialogs |
| `--muted` / `--muted-foreground` | Quiet fills and secondary text |
| `--primary` / `--primary-foreground` | The single main action |
| `--secondary` / `--secondary-foreground` | Companion actions |
| `--accent` / `--accent-foreground` | Success and live status |
| `--destructive` / `--destructive-foreground` | Errors and destructive actions |
| `--border` / `--input` / `--ring` | Dividers, field edges, focus ring |
| `--radius` | Base radius; `sm`/`md`/`lg`/`xl`/`2xl` derive from it |

</details>

## Light mode

Pijar ships dark-only on purpose: a locked palette means `prefers-color-scheme`
can never split a product into a dark landing page and a white dashboard.

To add light mode in your app:

```css
@custom-variant dark (&:where(.dark, .dark *));

:root { /* your light values */ }
.dark { /* the values from pijarui/styles.css */ }
```

No component changes are needed — they all read tokens, never literal colours.

## Requirements

React 18+, Tailwind CSS v4. React, React DOM, and Tailwind are peer
dependencies — Pijar never bundles its own copy.

## License

MIT. See [LICENSE](./LICENSE).

---

*Pijar* is Indonesian for the glow of an ember.
