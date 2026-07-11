import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/types/index";

export function RoutineHeader() {
  return (
    <div className="page-header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 dark:text-white">Routine</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your skinroutine</p>
        </div>
      </div>
    </div>
  );
}

export function RoutineToggle({ time, setTime }: { time: "AM" | "PM"; setTime: (t: "AM" | "PM") => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setTime("AM")} className={`px-4 py-2 rounded ${time === "AM" ? "bg-black text-white" : "bg-muted"}`}>
        Morning
      </button>

      <button onClick={() => setTime("PM")} className={`px-4 py-2 rounded ${time === "PM" ? "bg-black text-white" : "bg-muted"}`}>
        Evening
      </button>
    </div>
  );
}

export function RoutineProgress({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="h-2 w-full bg-muted rounded">
        <div className="h-2 bg-black rounded transition-all" style={{ width: `${value}%` }} />
      </div>

      <p className="text-sm text-muted-foreground mt-1">{value}% completed</p>
    </div>
  );
}

export function RoutineList({
  routine,
  checked,
  setChecked,
}: {
  routine: Product[];
  checked: Record<string, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <div className="space-y-3">
      {routine.map((item, index) => (
        <Card key={item.id} className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              {index + 1}. {item.category}
            </p>
            <p className="text-sm text-muted-foreground">{item.name}</p>
          </div>

          <Checkbox
            checked={!!checked[item.id]}
            onCheckedChange={(val) =>
              setChecked((prev) => ({
                ...prev,
                [item.id]: !!val,
              }))
            }
          />
        </Card>
      ))}
    </div>
  );
}
