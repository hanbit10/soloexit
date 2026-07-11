/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          setRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setSeconds(initialSeconds);
    setRunning(false);
  };

  return {
    seconds,
    running,
    setRunning,
    reset,
  };
}
