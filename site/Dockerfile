# syntax=docker/dockerfile:1

# =============================================================================
# Dockerfile produksi untuk situs Pijar UI (monorepo pnpm).
#
# Bedanya dengan Dockerfile app biasa: situs ini mengonsumsi paket workspace
# `pijarui`, jadi build HARUS menyertakan packages/pijarui dan membangunnya
# lebih dulu. `next build` di sini menjalankan `pnpm --filter pijarui build`
# sebagai bagian dari script `build` situs.
#
# Build (dari root monorepo):
#   docker build -f site/Dockerfile -t pijarui-site .
# =============================================================================

FROM node:22-alpine AS base
# libc6-compat: binary native (esbuild, SWC, @tailwindcss/oxide) butuh shim glibc.
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /repo

# -----------------------------------------------------------------------------
# Stage 1 — deps
#
# pnpm-workspace.yaml WAJIB ikut: di situ ada `dangerouslyAllowAllBuilds` yang
# mengizinkan postinstall esbuild & @tailwindcss/oxide berjalan. Tanpa itu tsup
# gagal dan paket tidak pernah ter-build.
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/pijarui/package.json ./packages/pijarui/
COPY site/package.json ./site/
RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 2 — builder
# -----------------------------------------------------------------------------
FROM base AS builder
ENV NODE_ENV=production

COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/packages/pijarui/node_modules ./packages/pijarui/node_modules
COPY --from=deps /repo/site/node_modules ./site/node_modules
COPY . .

# Script `build` situs membangun paket lebih dulu (pnpm --filter pijarui build),
# lalu next build. Urutan itu tidak boleh dibalik: tanpa dist/styles.css,
# Tailwind gagal me-resolve `@import "pijarui/styles.css"`.
RUN pnpm --filter pijarui-site build

# -----------------------------------------------------------------------------
# Stage 3 — runner
#
# `outputFileTracingRoot` di next.config.ts membuat standalone berisi struktur
# monorepo: server.js ada di /repo/site/server.js, dan paket workspace ikut
# ter-trace ke node_modules di root standalone.
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /repo

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/site/.next/static ./site/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/site/public ./site/public

USER nextjs
EXPOSE 3000

# server.js ada di subdirektori site/, bukan di root — konsekuensi
# outputFileTracingRoot yang menunjuk ke root monorepo.
CMD ["node", "site/server.js"]
