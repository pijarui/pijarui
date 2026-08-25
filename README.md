# Pijar UI

A dark-first React design system on Tailwind v4.

Most accessibility bugs are not decisions anyone argued about — they are things
someone forgot to type. A `htmlFor` that never got wired to an id. A focus ring
nobody wrote. A button that ended up 32px tall on a phone. Pijar moves those
from things you remember to things the component already does.

```bash
pnpm add pijarui
```

Full package documentation: **[packages/pijarui/README.md](./packages/pijarui/README.md)**

## Repository layout

```
packages/pijarui/     the npm package — components, tokens, build
site/                 pijarui.com — landing page, consumes the package
PUBLISHING.md         how to release a new version
```

The site depends on the package through `workspace:*`, so the components on the
landing page are the ones the package actually ships. If the package breaks, the
site fails to build — the demo cannot silently go stale.

## Development

```bash
pnpm install
pnpm dev              # site on :3000, builds the package first
pnpm build            # package, then site
pnpm typecheck        # both workspaces
```

`pnpm dev` and `pnpm build:site` run `pnpm --filter pijarui build` first. That
order is load-bearing: without `dist/styles.css`, Tailwind cannot resolve
`@import "pijarui/styles.css"` and the site fails with a CSS syntax error.

## Releasing

See [PUBLISHING.md](./PUBLISHING.md).

## License

MIT — see [LICENSE](./packages/pijarui/LICENSE).

---

*Pijar* is Indonesian for the glow of an ember.
