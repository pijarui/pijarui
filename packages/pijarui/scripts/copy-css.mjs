import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * tsup hanya mengurus JS/TS. Token CSS disalin apa adanya ke dist agar
 * `pijarui/styles.css` bisa diimpor konsumen.
 */
const root = dirname(dirname(fileURLToPath(import.meta.url)));
mkdirSync(join(root, "dist"), { recursive: true });
copyFileSync(join(root, "src/styles.css"), join(root, "dist/styles.css"));
console.log("[pijarui] src/styles.css → dist/styles.css");
