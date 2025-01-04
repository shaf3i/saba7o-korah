"use client";

import { useState } from "react";

interface TimerControlsProps {
  onStartTimer: (player: string, duration: number) => void;
  selectedPlayer: string;
}

export default function TimerControls({
  onStartTimer,
  selectedPlayer,
}: TimerControlsProps) {
  const [duration, setDuration] = useState(60);

  const handleStartTimer = () => {
    onStartTimer(selectedPlayer, duration);
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Timer Controls</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Timer Duration (seconds)
          </label>
          <input
            type="number"
            min="10"
            max="300"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 
                     rounded-md text-white focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDuration(30)}
            className="flex-1 px-3 py-1 bg-gray-700 text-white rounded 
                     hover:bg-gray-600 transition-colors"
          >
            30s
          </button>
          <button
            onClick={() => setDuration(60)}
            className="flex-1 px-3 py-1 bg-gray-700 text-white rounded 
                     hover:bg-gray-600 transition-colors"
          >
            1m
          </button>
          <button
            onClick={() => setDuration(120)}
            className="flex-1 px-3 py-1 bg-gray-700 text-white rounded 
                     hover:bg-gray-600 transition-colors"
          >
            2m
          </button>
        </div>
        <button
          onClick={handleStartTimer}
          disabled={!selectedPlayer}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded 
                   hover:bg-blue-700 transition-colors disabled:bg-blue-300 
                   disabled:cursor-not-allowed"
        >
          Start Timer
        </button>
      </div>
    </div>
  );
}
