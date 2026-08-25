/**
 * Pijar UI — design system untuk permukaan produk dark-first.
 *
 * Titik masuk paket. Konsumen mengimpor semuanya dari sini:
 *   import { Button, Card, Field } from "pijarui";
 *
 * Token warna TIDAK ikut di bundle JS — impor terpisah sekali di root app:
 *   import "pijarui/styles.css";
 */

export { Badge, badgeVariants } from "./components/badge";
export { Button, buttonVariants } from "./components/button";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/card";
export { Field, FormError } from "./components/field";
export { Input } from "./components/input";
export { Label } from "./components/label";

/** Penggabung className — diekspor karena konsumen butuh untuk komponennya sendiri. */
export { cn } from "./lib/utils";
