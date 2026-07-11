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
