// src/pages/routine/RoutinePage.tsx

import { useMemo, useState } from "react";
import { buildRoutine } from "@/lib/buildRoutine";
import type { Product } from "@/types/index";
import { RoutineToggle, RoutineProgress } from "../Routine/components/RoutineComponents";
import { RoutineHeader } from "../Routine/components/RoutineHeader";
import { RoutineChart } from "./components/RoutineChart";

// TEMP mock (later: Strapi)
const mockProducts: Product[] = [];

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
      <RoutineChart />
      <RoutineToggle time={time} setTime={setTime} />
      <RoutineProgress value={progress} />
    </div>
  );
}
