"use client";

import { useState, useEffect, useCallback } from "react";

export default function Timer() {
  const [timer, setTimer] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    if (timer > 0) {
      setInitialTime(timer);
      setIsTimerRunning(true);
    }
  };

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
    playTimerEndSound();
  }, []);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(initialTime);
  };

  const playTimerEndSound = () => {
    const audio = new Audio("/sounds/timer-end.mp3");
    audio.play();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            stopTimer();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer, stopTimer]);

  return (
    <section className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Timer</h2>
      <div className="space-y-2">
        <input
          type="number"
          value={timer || ""}
          onChange={(e) => {
            const value = e.target.value === "" ? 0 : parseInt(e.target.value);
            setTimer(isNaN(value) ? 0 : value);
          }}
          min="0"
          className="p-2 border border-gray-300 rounded mr-2 text-gray-900"
          disabled={isTimerRunning}
        />
        <div className="space-x-2">
          <button
            onClick={startTimer}
            disabled={timer === 0 || isTimerRunning}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isTimerRunning}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            disabled={timer === initialTime || isTimerRunning}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
        <div className="mt-2 text-lg font-semibold">
          Time remaining: {timer} seconds
        </div>
      </div>
    </section>
  );
}
