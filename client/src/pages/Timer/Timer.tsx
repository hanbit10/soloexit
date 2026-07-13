import { useState } from "react";

import { TimerSelector, TimerDisplay, TimerControls } from "../Timer/components/TimerComponents";

import { useTimer } from "@/hooks/useTimer";
import { Header } from "@/components/ui/Header";

export default function TimerPage() {
  const [minutes, setMinutes] = useState(8);

  const { seconds, running, setRunning, reset } = useTimer(minutes * 60);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <Header title="Timer" description="Focus. Track. Repeat." />
      <TimerSelector
        selected={minutes}
        onSelect={(value) => {
          setMinutes(value);
          reset();
        }}
        running={false}
        start={function (): void {
          throw new Error("Function not implemented.");
        }}
        reset={function (): void {
          throw new Error("Function not implemented.");
        }}
        seconds={0}
      />

      <TimerDisplay
        seconds={seconds}
        running={false}
        start={function (): void {
          throw new Error("Function not implemented.");
        }}
        reset={function (): void {
          throw new Error("Function not implemented.");
        }}
        selected={0}
        onSelect={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <TimerControls
        running={running}
        start={() => setRunning(!running)}
        reset={reset}
        seconds={0}
        selected={0}
        onSelect={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
