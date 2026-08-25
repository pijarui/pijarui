# Publishing `pijarui` to npm

## Status

| Item | State |
| --- | --- |
| **`pijarui@0.1.0` published** | ✅ **live on npm** |
| Verified from the public registry | ✅ 9 checks, installed as an outside user |
| GitHub repo `pijarui/pijarui` | ✅ public, tagged `v0.1.0` |
| CI green on `main` | ✅ typecheck + build + artifact smoke test |
| Publish workflow (`publish.yml`) | ✅ committed |
| Trusted publisher registered | ⬜ **do this next — Phase 2** |
| Token access restricted | ⬜ Phase 3 |
| Bootstrap token revoked | ⬜ **do this — see below** |

The first release was bootstrapped with a granular token. That token must be
revoked: npmjs.com → **Access Tokens** → revoke. Phase 2 removes the need for
tokens permanently.

## Why the first publish needed a token

npm requires 2FA or a granular token for every publish, regardless of the
account's own 2FA setting (`npm profile get` reported
`two-factor auth: disabled` for this account, and the publish was still
refused with a 403).

**Trusted publishing could not cover 0.1.0.** The trusted publisher is
configured on the *package settings* page, and that page does not exist until
the package has been published at least once —
[npm/cli#8544](https://github.com/npm/cli/issues/8544). PyPI has "pending
publishers" for this case; npm does not yet.

That bootstrap is now done, once, and never again.

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
