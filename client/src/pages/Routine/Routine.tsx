// src/pages/routine/RoutinePage.tsx

import { useMemo, useState } from "react";
import { buildRoutine } from "@/lib/buildRoutine";
import type { Product } from "@/types/index";
import { RoutineToggle, RoutineProgress } from "../Routine/components/RoutineComponents";
import { RoutineHeader } from "../Routine/components/RoutineHeader";
import { RoutineChart } from "./components/RoutineChart";
import { RoutineList } from "./components/RoutineList";

// TEMP mock (later: Strapi)
const mockProducts: Product[] = [
  {
    id: "cleanser-001",
    name: "Gentle Foaming Cleanser",
    category: "cleanser",
    frequencyPerWeek: 7,
    activeDays: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "toner-001",
    name: "Hydrating Essence Toner",
    category: "toner",
    frequencyPerWeek: 7,
    activeDays: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "serum-001",
    name: "Niacinamide 10% Serum",
    category: "serum",
    frequencyPerWeek: 5,
    activeDays: [1, 2, 3, 4, 5],
  },
  {
    id: "active-001",
    name: "Retinol 0.3% Night Serum",
    category: "serum",
    frequencyPerWeek: 2,
    activeDays: [2, 5],
  },
  {
    id: "active-002",
    name: "AHA BHA Exfoliating Treatment",
    category: "serum",
    frequencyPerWeek: 1,
    activeDays: [6],
  },
  {
    id: "moisturizer-001",
    name: "Ceramide Barrier Moisturizer",
    category: "moisturizer",
    frequencyPerWeek: 7,
    activeDays: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "sunscreen-001",
    name: "SPF 50 Daily Sunscreen",
    category: "sunscreen",
    frequencyPerWeek: 7,
    activeDays: [1, 2, 3, 4, 5, 6, 7],
  },
];

export default function RoutinePage() {
  const [time, setTime] = useState<"AM" | "PM">("AM");
  const [checked] = useState<Record<string, boolean>>({});

  const dayIndex = new Date().getDay();

  const routine = useMemo(() => {
    return buildRoutine(mockProducts, time, dayIndex);
  }, [time, dayIndex]);

  const progress = useMemo(() => {
    if (routine.length === 0) return 0;
    const done = Object.values(checked).filter(Boolean).length;
    return Math.round((done / routine.length) * 100);
  }, [checked, routine]);

  return (
    <div className="page-container">
      <RoutineHeader />
      <RoutineList products={mockProducts} />
      <RoutineChart />

      <RoutineToggle time={time} setTime={setTime} />
      <RoutineProgress value={progress} />
    </div>
  );
}
