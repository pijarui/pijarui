import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const here = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Paket workspace dikirim sebagai JS ter-build, tapi transpile eksplisit
  // menjaga source map tetap terbaca saat pengembangan lokal.
  transpilePackages: ["pijarui"],

  // Image mandiri untuk Docker: server.js + subset node_modules, tanpa pnpm.
  output: "standalone",

  // WAJIB di monorepo pnpm. Tanpa ini Next menebak root dari lokasi lockfile
  // dan `packages/pijarui` tidak ikut ter-trace, sehingga container gagal
  // start dengan "Cannot find module 'pijarui'".
  outputFileTracingRoot: path.join(here, ".."),
};

export default nextConfig;
