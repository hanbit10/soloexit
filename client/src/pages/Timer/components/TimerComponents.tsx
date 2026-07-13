import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Props {
  running: boolean;
  start: () => void;
  reset: () => void;
}

export function TimerControls({ running, start, reset }: Props) {
  return (
    <div className="flex gap-4">
      <Button onClick={start} className="px-6 py-3 rounded-xl">
        {running ? <Pause className="w-2 h-2" /> : <Play className="w-2 h-2" />}
      </Button>

      <Button onClick={reset} variant="secondary" className="px-6 py-3 rounded-xl">
        <RotateCcw className="w-2xl h-2xl" />
      </Button>
    </div>
  );
}

interface Props {
  seconds: number;
}

export function TimerDisplay({ seconds }: Props) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div
      className="
flex
items-center
justify-center
h-64
w-64
rounded-full
border-8
"
    >
      <p className="text-5xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </p>
    </div>
  );
}

const times = [8, 10, 20, 30, 40, 50];

interface Props {
  selected: number;
  onSelect: (value: number) => void;
}

export function TimerSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3">
      {times.map((time) => (
        <Button
          key={time}
          variant="outline"
          onClick={() => onSelect(time)}
          className={` rounded-full px-5 py-3 ${selected === time ? "bg-primary" : "bg-secondary"}`}
        >
          {time} min
        </Button>
      ))}
    </div>
  );
}
