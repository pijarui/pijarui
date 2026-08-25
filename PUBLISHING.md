# Publishing `pijarui` to npm

## Status

| Item | State |
| --- | --- |
| Package builds (ESM + CJS + types) | ✅ verified |
| `npm pack` contents correct | ✅ 10 files, 12.6 kB |
| Installs and runs in a clean project | ✅ SSR-tested |
| GitHub repo `pijarui/pijarui` | ✅ public, pushed |
| CI green on `main` | ✅ typecheck + build + artifact smoke test |
| `npm whoami` | ✅ `gusman` |
| `repository.url` matches the repo | ✅ required by OIDC |
| Publish workflow (`publish.yml`) | ✅ committed, waiting on the trusted publisher |
| **Version 0.1.0 published** | ❌ **blocked — see below** |

## Why the first publish is blocked

```
npm error code E403
npm error 403 Forbidden - PUT https://registry.npmjs.org/pijarui -
Two-factor authentication or granular access token with bypass 2fa
enabled is required to publish packages.
```

npm now requires 2FA or a granular token for every publish, regardless of the
account's own 2FA setting (`npm profile get` reports `two-factor auth: disabled`
for this account, and the publish is still refused).

**Trusted publishing cannot solve this for version 0.1.0.** The trusted
publisher is configured on the *package settings* page, and that page does not
exist until the package has been published at least once. npm acknowledges the
limitation in [npm/cli#8544](https://github.com/npm/cli/issues/8544) — PyPI has
"pending publishers" for this, npm does not yet.

So the sequence is: **bootstrap once by hand, then automate forever.**

## Phase 1 — Bootstrap: the first release

Pick either route. Both need a human; neither can be delegated to an agent.

### Route A — enable 2FA (recommended)

1. npmjs.com → your avatar → **Account** → **Two-Factor Authentication** → enable
   (authenticator app).
2. Publish with the one-time code:

```bash
cd ~/projects/pijarui/packages/pijarui
npm publish --otp=123456      # code from your authenticator
```

Leaves the account permanently stronger, and is the prerequisite for the
"disallow tokens" hardening in Phase 3.

### Route B — short-lived granular token

If you would rather not enable 2FA right now:

1. npmjs.com → **Access Tokens** → **Generate New Token** → **Granular Access Token**
   - Permissions: **Read and write**
   - **Bypass two-factor authentication**: ✅ ticked (otherwise it still 403s)
   - Expiration: **1 day** — this token exists only to bootstrap
2. Publish:

```bash
cd ~/projects/pijarui/packages/pijarui
NPM_CONFIG_TOKEN=npm_xxxxxxxx npm publish
```

3. **Revoke the token immediately afterwards.** It is not needed again — Phase 2
   removes the need for tokens entirely.

## Phase 2 — Wire up trusted publishing

Once `pijarui@0.1.0` exists on the registry:

npmjs.com → **Packages** → **pijarui** → **Settings** → **Trusted Publisher** →
**GitHub Actions**

| Field | Value |
| --- | --- |
| Organization or user | `pijarui` |
| Repository | `pijarui` |
| Workflow filename | `publish.yml` |
| Environment name | *(leave blank)* |
| Allowed actions | `npm publish` |

Every field is case-sensitive, and npm does **not** validate them on save — a
typo only surfaces as a failed publish later.

`.github/workflows/publish.yml` already grants `id-token: write`, which is the
permission that makes OIDC work. Without it npm returns a 403 whose wording
looks like a 2FA problem.

## Phase 3 — Harden (recommended)

After a release has gone through OIDC successfully:

npmjs.com → **pijarui** → **Settings** → **Publishing access** →
**"Require two-factor authentication and disallow tokens"**

From then on the package can only be published by the GitHub workflow or by you
interactively with 2FA. A leaked token cannot publish it. Trusted publishing
keeps working — the setting only blocks *traditional* tokens.

## Releasing after the bootstrap

```bash
cd ~/projects/pijarui/packages/pijarui
npm version patch          # or minor / major — commits and tags
git push --follow-tags
gh release create v0.1.1 --generate-notes
```

Creating the GitHub release triggers `publish.yml`. No token, nothing to rotate,
and npm records **provenance** automatically: the package page shows the exact
commit and workflow that built the tarball, so anyone can verify it came from
this repository.

(Provenance requires a public repo — `pijarui/pijarui` is public, so this works.
It is not available from private repositories even for public packages.)

The workflow refuses to publish a version that already exists on npm, so a
forgotten `npm version` fails loudly instead of erroring out mid-publish.

## Verify a release is really live

```bash
npm view pijarui version
cd /tmp && rm -rf t && mkdir t && cd t
npm init -y >/dev/null
npm install pijarui react react-dom
node -e "console.log(Object.keys(require('pijarui')).length)"   # -> 15
```

## Publishing cannot be undone

- A published version number is **permanent**. `0.1.0` can never be reused, even
  after `npm unpublish`.
- Unpublishing is only allowed within 72 hours, and only if nothing depends on it.
- Run `npm publish --dry-run` first and read the file list.
