import type { Product, RoutineTime } from "@/types/index";
import { ROUTINE_ORDER } from "@/constants/constants";

function isAllowedToday(product: Product, dayIndex: number) {
  if (!product.activeDays || product.activeDays.length === 0) return true;
  return product.activeDays.includes(dayIndex);
}

export function buildRoutine(products: Product[], time: RoutineTime, dayIndex: number) {
  const filtered = products.filter((p) => p[time.toLowerCase() as "am" | "pm"]);

  const valid = filtered.filter((p) => isAllowedToday(p, dayIndex));

  const sorted = [...valid].sort((a, b) => ROUTINE_ORDER.indexOf(a.category) - ROUTINE_ORDER.indexOf(b.category));

  // AM rule: sunscreen ALWAYS last
  if (time === "AM") {
    const sunscreen = sorted.filter((p) => p.category === "sunscreen");
    const rest = sorted.filter((p) => p.category !== "sunscreen");
    return [...rest, ...sunscreen];
  }

  return sorted;
}
