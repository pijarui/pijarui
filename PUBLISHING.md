# Publishing `pijarui` to npm

Everything is verified and staged. What remains needs credentials only you have.

## Status

| Item | State |
| --- | --- |
| Package builds (ESM + CJS + types) | ✅ verified |
| `npm pack` contents correct | ✅ 10 files, 12.5 kB |
| Installs and runs in a clean project | ✅ SSR-tested |
| Name `pijarui` free on npm | ✅ checked |
| GitHub org `pijarui` | ✅ exists |
| Repo `pijarui/pijarui` | ❌ **not created yet** (404) |
| npm login on this machine | ❌ **`ENEEDAUTH`** — no `~/.npmrc` |

## Step 1 — Log in to npm

This machine has never been authenticated. Run it yourself; an agent must not
handle npm credentials or 2FA codes.

```bash
npm login
```

Verify:

```bash
npm whoami        # should print your npm username
```

If your account has 2FA on publish (recommended), keep your authenticator open —
`npm publish` will prompt for a one-time password.

## Step 2 — Create the GitHub repo

`packages/pijarui/package.json` has no `repository` field yet, because the repo
does not exist. The npm page links to a repository, so create it first:

```bash
gh repo create pijarui/pijarui --public \
  --description "Dark-first React design system on Tailwind v4"
```

Then add the field to `packages/pijarui/package.json`:

```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/pijarui/pijarui.git"
  },
  "homepage": "https://pijarui.com",
  "bugs": { "url": "https://github.com/pijarui/pijarui/issues" },
```

And push:

```bash
cd ~/projects/pijarui
git add -A && git commit -m "feat: Pijar UI v0.1.0 — package + site"
git branch -M main
git remote add origin https://github.com/pijarui/pijarui.git
git push -u origin main
```

## Step 3 — Publish

```bash
cd ~/projects/pijarui/packages/pijarui

# Dry run first — prints exactly what would be uploaded, uploads nothing.
npm publish --dry-run

# Real thing. prepublishOnly rebuilds dist automatically.
npm publish
```

`publishConfig.access` is already `public`, so no `--access` flag is needed.

## Step 4 — Confirm it is really live

```bash
npm view pijarui version         # -> 0.1.0
cd /tmp && mkdir t && cd t
npm init -y >/dev/null
npm install pijarui react react-dom
node -e "console.log(Object.keys(require('pijarui')).length)"   # -> 15
```

## Important: publishing cannot be undone

- A published version number is **permanent**. `0.1.0` can never be reused,
  even after `npm unpublish`.
- Unpublishing is only allowed within 72 hours, and only if nothing depends on it.
- So: run `npm publish --dry-run` first, and read the file list.

## After publishing

The site currently reads `pijarui` from the workspace. To make the site prove
the *published* package instead of the local one, change
`site/package.json`:

```json
"pijarui": "^0.1.0"      // instead of "workspace:*"
```

Leaving it as `workspace:*` is also fine — it keeps the site testing whatever
is committed, which catches breakage before it reaches npm.

## Releasing later versions

```bash
cd ~/projects/pijarui/packages/pijarui
npm version patch     # or minor / major — commits and tags
npm publish
git push --follow-tags
```

Follow semver strictly once other people depend on it: renaming a prop or
changing a token's meaning is a **major**, not a patch.
